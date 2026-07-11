// ─────────────────────────────────────────────────────────────────────────
//  PROMOCJA — jedno źródło prawdy. Steruje paskiem (PromoBar), cenami w
//  sklepie oraz kwotą zamówienia produktu. Wyłączenie: active = false.
//  Czysty moduł (bez bazy) — bezpieczny w komponentach klienta i serwera.
// ─────────────────────────────────────────────────────────────────────────

export const PROMO = {
  active: true,
  percent: 15,
} as const;

export function isPromoActive(): boolean {
  return PROMO.active && PROMO.percent > 0;
}

export type PricedPromo = {
  active: boolean; // czy rabat realnie się nalicza dla tej ceny
  percent: number;
  original: number;
  final: number;
  saved: number;
};

// Nalicza rabat. Rabat dotyczy tylko dodatnich cen (produkty „Wkrótce"
// z ceną 0 albo bez ceny zostają bez zmian).
export function applyPromo(price: number): PricedPromo {
  const active = isPromoActive() && price > 0;
  const final = active
    ? Math.round(price * (1 - PROMO.percent / 100))
    : price;
  return { active, percent: PROMO.percent, original: price, final, saved: price - final };
}

// Treść paska/etykiet — spójna między PromoBar a sklepem.
export function promoText(en: boolean): { message: string; note: string } {
  return en
    ? { message: `−${PROMO.percent}% on everything`, note: "Limited-time offer" }
    : { message: `−${PROMO.percent}% na wszystko`, note: "Promocja ograniczona czasowo" };
}
