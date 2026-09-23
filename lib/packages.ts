// Gotowe pakiety — jedno źródło dla /wycena (komponent Packages) i stron usług.
// Ceny „od" trzymaj spójne z cennikiem (lib/pricing).
export type Pack = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  tagline: string;
  taglineEn: string;
  features: string[];
  featuresEn: string[];
  highlighted?: boolean;
};

export const packages: Pack[] = [
  {
    id: "start",
    name: "Start",
    nameEn: "Starter",
    price: 450,
    tagline: "Prosta, szybka wizytówka.",
    taglineEn: "A simple, fast landing.",
    features: [
      "Strona one-page",
      "Formularz kontaktowy",
      "Responsywność (RWD)",
      "Podstawowe SEO",
      "Wdrożenie na serwer",
    ],
    featuresEn: [
      "One-page site",
      "Contact form",
      "Responsive (RWD)",
      "Basic SEO",
      "Deployment",
    ],
  },
  {
    id: "firmowy",
    name: "Firmowy",
    nameEn: "Business",
    price: 900,
    tagline: "Rozbudowana strona z treściami.",
    taglineEn: "A richer site with content.",
    highlighted: true,
    features: [
      "Kilka podstron",
      "System CMS (edycja treści)",
      "Blog / aktualności",
      "Formularz + SEO",
      "Animacje i detale",
      "Wdrożenie na serwer",
    ],
    featuresEn: [
      "Several pages",
      "CMS (edit content)",
      "Blog / news",
      "Form + SEO",
      "Animations & polish",
      "Deployment",
    ],
  },
  {
    id: "sklep",
    name: "Sklep",
    nameEn: "Store",
    price: 1500,
    tagline: "Sprzedawaj online.",
    taglineEn: "Sell online.",
    features: [
      "Katalog i koszyk",
      "Integracja płatności",
      "Konta użytkowników",
      "System CMS",
      "Wdrożenie na serwer",
    ],
    featuresEn: [
      "Catalog & cart",
      "Payment integration",
      "User accounts",
      "CMS",
      "Deployment",
    ],
  },
];
