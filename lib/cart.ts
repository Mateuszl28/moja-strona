// ─────────────────────────────────────────────────────────────────────────
//  KOSZYK — czyste typy i kalkulacje (bez bazy, bez React). Używane przez
//  stan koszyka po stronie klienta oraz przez akcję checkout na serwerze.
//  `price` w CartItem to cena KATALOGOWA (przed rabatem); rabat nalicza się
//  w kalkulacji, żeby promocja zawsze była liczona z jednego źródła.
// ─────────────────────────────────────────────────────────────────────────

import { applyPromo } from "./promo";

export type CartItem = {
  slug: string;
  name: string;
  price: number; // cena katalogowa za sztukę
  qty: number;
};

export type CartLine = CartItem & {
  unitFinal: number; // cena za sztukę po rabacie
  lineOriginal: number; // qty * price
  lineFinal: number; // qty * unitFinal
};

export type CartTotals = {
  lines: CartLine[];
  count: number; // łączna liczba sztuk
  subtotal: number; // suma cen katalogowych
  discount: number; // łączna oszczędność
  total: number; // do zapłaty
};

export const CART_MAX_QTY = 99;

function clampQty(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(CART_MAX_QTY, Math.max(1, Math.floor(n)));
}

export function cartTotals(items: CartItem[]): CartTotals {
  const lines = items.map((it): CartLine => {
    const qty = clampQty(it.qty);
    const unitFinal = applyPromo(it.price).final;
    return {
      ...it,
      qty,
      unitFinal,
      lineOriginal: it.price * qty,
      lineFinal: unitFinal * qty,
    };
  });
  const subtotal = lines.reduce((a, l) => a + l.lineOriginal, 0);
  const total = lines.reduce((a, l) => a + l.lineFinal, 0);
  return {
    lines,
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal,
    discount: subtotal - total,
    total,
  };
}

// Bezpieczne odczytanie koszyka z niezaufanego źródła (localStorage / POST).
export function parseCart(raw: unknown): CartItem[] {
  let arr: unknown = raw;
  if (typeof raw === "string") {
    try {
      arr = JSON.parse(raw);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(arr)) return [];
  const out: CartItem[] = [];
  for (const v of arr) {
    if (!v || typeof v !== "object") continue;
    const o = v as Record<string, unknown>;
    const slug = typeof o.slug === "string" ? o.slug : "";
    const name = typeof o.name === "string" ? o.name : "";
    const price = Number(o.price);
    const qty = clampQty(Number(o.qty));
    if (!slug || !Number.isFinite(price)) continue;
    out.push({ slug, name, price, qty });
  }
  return out;
}
