// Gotowe rozwiązania do kupienia (panel /sklep, /en/shop).
//
// ⚠️ PONIŻSZE PRODUKTY SĄ PRZYKŁADOWE — podmień na swoje realne oferty i ceny.
//
// Płatność:
//  • buyUrl ustawiony (np. Stripe Payment Link / Gumroad / Paddle) → przycisk
//    „Kup teraz" prowadzi wprost do płatności (bez backendu).
//  • buyUrl pusty → przycisk „Zamawiam" prefilluje formularz zamówieniem
//    (zamówienie trafia do Ciebie mailem, bez pobierania płatności).
//
// Pola *En = wersja angielska (dla /en/shop).

export type Solution = {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  features: string[];
  featuresEn?: string[];
  badge?: string; // np. „Bestseller"
  buyUrl?: string; // zewnętrzny link płatności; brak → zamówienie przez formularz
};

export const solutions: Solution[] = [
  {
    id: "landing",
    name: "Landing na start",
    nameEn: "Landing Starter",
    description:
      "Gotowy, jednostronicowy landing pod firmę lub produkt. Konfigurowalny, responsywny, z formularzem kontaktowym.",
    descriptionEn:
      "A ready one-page landing for a company or product. Configurable, responsive, with a contact form.",
    price: 490,
    badge: "Bestseller",
    features: [
      "Gotowy one-page",
      "Sekcje: hero, oferta, kontakt",
      "Formularz kontaktowy",
      "Responsywny (RWD)",
      "Wdrożenie w cenie",
    ],
    featuresEn: [
      "Ready one-page site",
      "Sections: hero, offer, contact",
      "Contact form",
      "Responsive (RWD)",
      "Deployment included",
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio Pro",
    nameEn: "Portfolio Pro",
    description:
      "Szablon portfolio (jak ten serwis) do szybkiej personalizacji — projekty, blog i wycena w jednym.",
    descriptionEn:
      "A portfolio template (like this site) for quick personalization — projects, blog and quote in one.",
    price: 690,
    features: [
      "Ciemny motyw z akcentem",
      "Sekcja projektów z kategoriami",
      "Blog gotowy do pisania",
      "Kalkulator wyceny",
      "Gotowy do wdrożenia",
    ],
    featuresEn: [
      "Dark theme with accent",
      "Projects with categories",
      "Blog ready to write",
      "Quote calculator",
      "Ready to deploy",
    ],
  },
  {
    id: "sklep-starter",
    name: "Sklep Starter",
    nameEn: "Store Starter",
    description:
      "Gotowy motyw sklepu internetowego do szybkiego startu sprzedaży online.",
    descriptionEn:
      "A ready online-store theme for a fast start selling online.",
    price: 1490,
    features: [
      "Katalog i koszyk",
      "Integracja płatności",
      "Panel treści (CMS)",
      "Responsywny (RWD)",
      "Wdrożenie na serwer",
    ],
    featuresEn: [
      "Catalog & cart",
      "Payment integration",
      "CMS content panel",
      "Responsive (RWD)",
      "Deployment",
    ],
  },
];
