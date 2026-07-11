import {
  db,
  type OrderRow,
  type OrderStatus,
  type MessageRow,
  type OrderItemRow,
} from "./db";

export const ORDER_STATUSES: OrderStatus[] = [
  "new",
  "in_progress",
  "done",
  "cancelled",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Nowe",
  in_progress: "W toku",
  done: "Zamknięte",
  cancelled: "Anulowane",
};

export const STATUS_LABEL_EN: Record<OrderStatus, string> = {
  new: "New",
  in_progress: "In progress",
  done: "Done",
  cancelled: "Cancelled",
};

export type OrderWithUser = OrderRow & {
  user_name: string;
  user_email: string;
};

export function createOrder(input: {
  userId: number;
  title: string;
  details?: string;
  budget?: number | null;
  productId?: number | null;
  productName?: string | null;
  amount?: number | null;
}): number {
  const now = new Date().toISOString();
  const info = db
    .prepare(
      `INSERT INTO orders
         (user_id, title, details, budget, product_id, product_name, amount, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'new', ?, ?)`
    )
    .run(
      input.userId,
      input.title,
      input.details ?? "",
      input.budget ?? null,
      input.productId ?? null,
      input.productName ?? null,
      input.amount ?? null,
      now,
      now
    );
  return Number(info.lastInsertRowid);
}

// Zamówienie koszykowe: jedno zamówienie + pozycje (order_items), w transakcji.
export function createOrderWithItems(input: {
  userId: number;
  title: string;
  details?: string;
  productName?: string | null; // etykieta zbiorcza (listy)
  amount: number; // suma po rabacie
  items: {
    productId?: number | null;
    name: string;
    unitPrice: number;
    qty: number;
  }[];
}): number {
  const now = new Date().toISOString();
  const tx = db.transaction(() => {
    const info = db
      .prepare(
        `INSERT INTO orders
           (user_id, title, details, budget, product_id, product_name, amount, status, created_at, updated_at)
         VALUES (?, ?, ?, NULL, NULL, ?, ?, 'new', ?, ?)`
      )
      .run(
        input.userId,
        input.title,
        input.details ?? "",
        input.productName ?? null,
        input.amount,
        now,
        now
      );
    const orderId = Number(info.lastInsertRowid);
    const insItem = db.prepare(
      `INSERT INTO order_items (order_id, product_id, name, unit_price, qty, line_total)
       VALUES (?, ?, ?, ?, ?, ?)`
    );
    for (const it of input.items) {
      insItem.run(
        orderId,
        it.productId ?? null,
        it.name,
        it.unitPrice,
        it.qty,
        it.unitPrice * it.qty
      );
    }
    return orderId;
  });
  return tx();
}

export function listOrderItems(orderId: number): OrderItemRow[] {
  return db
    .prepare("SELECT * FROM order_items WHERE order_id = ? ORDER BY id")
    .all(orderId) as OrderItemRow[];
}

export function listOrdersByUser(userId: number): OrderRow[] {
  return db
    .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId) as OrderRow[];
}

export function listAllOrders(status?: OrderStatus): OrderWithUser[] {
  const base = `SELECT o.*, u.name AS user_name, u.email AS user_email
                FROM orders o JOIN users u ON u.id = o.user_id`;
  if (status) {
    return db
      .prepare(`${base} WHERE o.status = ? ORDER BY o.created_at DESC`)
      .all(status) as OrderWithUser[];
  }
  return db.prepare(`${base} ORDER BY o.created_at DESC`).all() as OrderWithUser[];
}

export function getOrder(id: number): OrderRow | undefined {
  return db.prepare("SELECT * FROM orders WHERE id = ?").get(id) as
    | OrderRow
    | undefined;
}

export function updateOrderStatus(id: number, status: OrderStatus): void {
  db.prepare("UPDATE orders SET status = ?, updated_at = ? WHERE id = ?").run(
    status,
    new Date().toISOString(),
    id
  );
}

export function countOrdersByStatus(): Record<string, number> {
  const rows = db
    .prepare("SELECT status, COUNT(*) AS n FROM orders GROUP BY status")
    .all() as { status: string; n: number }[];
  return Object.fromEntries(rows.map((r) => [r.status, r.n]));
}

export type OrderStats = {
  totalOrders: number;
  productOrders: number; // zamówienia z kwotą (ze sklepu)
  revenue: number; // suma kwot, bez anulowanych
  avgOrder: number; // średnia wartość płatnego zamówienia
  byStatus: Record<OrderStatus, number>;
};

// Statystyki na pulpit admina. Przychód liczony z zamówień produktów
// (amount ≠ null), z pominięciem anulowanych.
export function getOrderStats(): OrderStats {
  const totalOrders = (
    db.prepare("SELECT COUNT(*) AS n FROM orders").get() as { n: number }
  ).n;

  const productOrders = (
    db
      .prepare("SELECT COUNT(*) AS n FROM orders WHERE amount IS NOT NULL")
      .get() as { n: number }
  ).n;

  const paid = db
    .prepare(
      `SELECT COUNT(*) AS n, COALESCE(SUM(amount), 0) AS rev
       FROM orders
       WHERE amount IS NOT NULL AND status != 'cancelled'`
    )
    .get() as { n: number; rev: number };

  const byStatusRaw = countOrdersByStatus();
  const byStatus = Object.fromEntries(
    ORDER_STATUSES.map((s) => [s, byStatusRaw[s] ?? 0])
  ) as Record<OrderStatus, number>;

  return {
    totalOrders,
    productOrders,
    revenue: paid.rev,
    avgOrder: paid.n ? Math.round(paid.rev / paid.n) : 0,
    byStatus,
  };
}

// --- Wiadomości (wątek na zamówieniu) ---

export type MessageWithAuthor = MessageRow & {
  author_name: string;
  author_role: string;
};

export function listMessages(orderId: number): MessageWithAuthor[] {
  return db
    .prepare(
      `SELECT m.*, u.name AS author_name, u.role AS author_role
       FROM messages m JOIN users u ON u.id = m.user_id
       WHERE m.order_id = ? ORDER BY m.created_at`
    )
    .all(orderId) as MessageWithAuthor[];
}

export function addMessage(input: {
  orderId: number;
  userId: number;
  body: string;
}): void {
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO messages (order_id, user_id, body, created_at) VALUES (?, ?, ?, ?)"
  ).run(input.orderId, input.userId, input.body, now);
  db.prepare("UPDATE orders SET updated_at = ? WHERE id = ?").run(
    now,
    input.orderId
  );
}
