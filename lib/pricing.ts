// ─────────────────────────────────────────────────────────────────────────
//  KONFIGURACJA CEN — edytuj TYLKO tutaj. Wszystkie kwoty w PLN.
//  Używane przez kalkulator (/wycena) i sekcję „Usługi" na stronie głównej,
//  więc ceny nigdy się nie rozjadą. Wycena orientacyjna (widełki).
// ─────────────────────────────────────────────────────────────────────────

export const projectTypes = [
  {
    id: "strona",
    label: "Strona www",
    desc: "Wizytówka lub strona firmowa",
    base: 450,
    weeks: 2,
  },
  {
    id: "sklep",
    label: "Sklep internetowy",
    desc: "E-commerce z koszykiem i płatnościami",
    base: 1500,
    weeks: 5,
  },
  {
    id: "webapp",
    label: "Aplikacja internetowa",
    desc: "Panel, SaaS, narzędzie na zamówienie",
    base: 900,
    weeks: 7,
  },
  {
    id: "mobile",
    label: "Aplikacja mobilna",
    desc: "iOS / Android",
    base: 800,
    weeks: 8,
  },
  {
    id: "inne",
    label: "Inne / na zamówienie",
    desc: "Nietypowy projekt lub integracja",
    base: 500,
    weeks: 3,
  },
] as const;

export const PAGE_PRICE = 80; // za każdą podstronę ponad pierwszą
export const INCLUDED_PAGES = 1;

// tbd:true => „do ustalenia" — nie dolicza kwoty, wycena zależy od zakresu.
export type Feature = { id: string; label: string; price: number; tbd?: boolean };
export const featuresList: readonly Feature[] = [
  { id: "form", label: "Formularz kontaktowy", price: 50 },
  { id: "cms", label: "System CMS (samodzielna edycja treści)", price: 150 },
  { id: "blog", label: "Blog / aktualności", price: 100 },
  { id: "i18n", label: "Wielojęzyczność", price: 120 },
  { id: "payments", label: "Integracja płatności", price: 200 },
  { id: "auth", label: "Konta użytkowników / logowanie", price: 250 },
  { id: "seo", label: "Optymalizacja SEO", price: 0, tbd: true },
  { id: "anim", label: "Zaawansowane animacje", price: 80 },
  { id: "content", label: "Przygotowanie treści i grafik", price: 120 },
];

export const designOptions = [
  { id: "have", label: "Mam gotowy projekt graficzny", price: 0 },
  { id: "template", label: "Na bazie szablonu / propozycji", price: 150 },
  { id: "custom", label: "Projekt graficzny od zera", price: 400 },
] as const;

export const timelineOptions = [
  { id: "standard", label: "Standardowy", mult: 1 },
  { id: "rush", label: "Ekspres (priorytet)", mult: 1.3 },
] as const;

// Formatowanie kwot: „6 000 zł"
export const zl = (n: number) =>
  new Intl.NumberFormat("pl-PL").format(Math.round(n)) + " zł";
