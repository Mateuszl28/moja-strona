// Gotowe rozwiązania do kupienia (panel /sklep).
//
// ⚠️ PONIŻSZE PRODUKTY SĄ PRZYKŁADOWE — podmień na swoje realne oferty i ceny.
//
// Płatność:
//  • buyUrl ustawiony (np. Stripe Payment Link / Gumroad / Paddle) → przycisk
//    „Kup teraz" prowadzi wprost do płatności (bez backendu).
//  • buyUrl pusty → przycisk „Zamawiam" prefilluje formularz zamówieniem
//    (zamówienie trafia do Ciebie mailem, bez pobierania płatności).

export type Solution = {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  badge?: string; // np. „Bestseller"
  buyUrl?: string; // zewnętrzny link płatności; brak → zamówienie przez formularz
};

export const solutions: Solution[] = [
  {
    id: "landing",
    name: "Landing na start",
    description:
      "Gotowy, jednostronicowy landing pod firmę lub produkt. Konfigurowalny, responsywny, z formularzem kontaktowym.",
    price: 490,
    badge: "Bestseller",
    features: [
      "Gotowy one-page",
      "Sekcje: hero, oferta, kontakt",
      "Formularz kontaktowy",
      "Responsywny (RWD)",
      "Wdrożenie w cenie",
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio Pro",
    description:
      "Szablon portfolio (jak ten serwis) do szybkiej personalizacji — projekty, blog i wycena w jednym.",
    price: 690,
    features: [
      "Ciemny motyw z akcentem",
      "Sekcja projektów z kategoriami",
      "Blog gotowy do pisania",
      "Kalkulator wyceny",
      "Gotowy do wdrożenia",
    ],
  },
  {
    id: "sklep-starter",
    name: "Sklep Starter",
    description:
      "Gotowy motyw sklepu internetowego do szybkiego startu sprzedaży online.",
    price: 1490,
    features: [
      "Katalog i koszyk",
      "Integracja płatności",
      "Panel treści (CMS)",
      "Responsywny (RWD)",
      "Wdrożenie na serwer",
    ],
  },
];
