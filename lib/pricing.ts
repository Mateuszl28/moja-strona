// ─────────────────────────────────────────────────────────────────────────
//  KONFIGURACJA CEN — edytuj TYLKO tutaj. Wszystkie kwoty w PLN.
//  Używane przez kalkulator (/wycena, /en/quote) i sekcję „Usługi".
//  labelEn/descEn = etykiety dla wersji angielskiej.
// ─────────────────────────────────────────────────────────────────────────

export const projectTypes = [
  {
    id: "strona",
    label: "Strona www",
    labelEn: "Website",
    desc: "Wizytówka lub strona firmowa",
    descEn: "Landing page or company site",
    base: 450,
    weeks: 2,
  },
  {
    id: "sklep",
    label: "Sklep internetowy",
    labelEn: "Online store",
    desc: "E-commerce z koszykiem i płatnościami",
    descEn: "E-commerce with cart and payments",
    base: 1500,
    weeks: 5,
  },
  {
    id: "webapp",
    label: "Aplikacja internetowa",
    labelEn: "Web app",
    desc: "Panel, SaaS, narzędzie na zamówienie",
    descEn: "Dashboard, SaaS, custom tool",
    base: 900,
    weeks: 7,
  },
  {
    id: "mobile",
    label: "Aplikacja mobilna",
    labelEn: "Mobile app",
    desc: "iOS / Android",
    descEn: "iOS / Android",
    base: 800,
    weeks: 8,
  },
  {
    id: "inne",
    label: "Inne / na zamówienie",
    labelEn: "Other / custom",
    desc: "Nietypowy projekt lub integracja",
    descEn: "Non-standard project or integration",
    base: 500,
    weeks: 3,
  },
] as const;

export const PAGE_PRICE = 80; // za każdą podstronę ponad pierwszą
export const INCLUDED_PAGES = 1;

// tbd:true => „do ustalenia" — nie dolicza kwoty, wycena zależy od zakresu.
export type Feature = {
  id: string;
  label: string;
  labelEn?: string;
  price: number;
  tbd?: boolean;
};
export const featuresList: readonly Feature[] = [
  { id: "form", label: "Formularz kontaktowy", labelEn: "Contact form", price: 50 },
  { id: "cms", label: "System CMS (samodzielna edycja treści)", labelEn: "CMS (edit content yourself)", price: 150 },
  { id: "blog", label: "Blog / aktualności", labelEn: "Blog / news", price: 100 },
  { id: "i18n", label: "Wielojęzyczność", labelEn: "Multi-language", price: 120 },
  { id: "payments", label: "Integracja płatności", labelEn: "Payment integration", price: 200 },
  { id: "auth", label: "Konta użytkowników / logowanie", labelEn: "User accounts / login", price: 250 },
  { id: "seo", label: "Optymalizacja SEO", labelEn: "SEO optimization", price: 0, tbd: true },
  { id: "anim", label: "Zaawansowane animacje", labelEn: "Advanced animations", price: 80 },
  { id: "content", label: "Przygotowanie treści i grafik", labelEn: "Content & graphics prep", price: 120 },
];

export const designOptions = [
  { id: "have", label: "Mam gotowy projekt graficzny", labelEn: "I already have a design", price: 0 },
  { id: "template", label: "Na bazie szablonu / propozycji", labelEn: "Based on a template", price: 150 },
  { id: "custom", label: "Projekt graficzny od zera", labelEn: "Custom design from scratch", price: 400 },
] as const;

export const timelineOptions = [
  { id: "standard", label: "Standardowy", labelEn: "Standard", mult: 1 },
  { id: "rush", label: "Ekspres (priorytet)", labelEn: "Express (priority)", mult: 1.3 },
] as const;

// Formatowanie kwot: „6 000 zł"
export const zl = (n: number) =>
  new Intl.NumberFormat("pl-PL").format(Math.round(n)) + " zł";
