import {
  db,
  type OrderRow,
  type OrderStatus,
  type MessageRow,
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
}): number {
  const now = new Date().toISOString();
  const info = db
    .prepare(
      `INSERT INTO orders (user_id, title, details, budget, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'new', ?, ?)`
    )
    .run(
      input.userId,
      input.title,
      input.details ?? "",
      input.budget ?? null,
      now,
      now
    );
  return Number(info.lastInsertRowid);
}

export function listOrdersByUser(userId: number): OrderRow[] {
  return db
    .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC")
    .all(userId) as OrderRow[];
}

export function listAllOrders(): OrderWithUser[] {
  return db
    .prepare(
      `SELECT o.*, u.name AS user_name, u.email AS user_email
       FROM orders o JOIN users u ON u.id = o.user_id
       ORDER BY o.created_at DESC`
    )
    .all() as OrderWithUser[];
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
