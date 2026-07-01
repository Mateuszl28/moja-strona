// Kategorie = zakładki na stronie /projekty. Kolejność tu = kolejność zakładek.
export const categories = [
  "Strony www",
  "Sklepy www",
  "Aplikacje internetowe",
  "Aplikacje mobilne",
  "Sterowniki",
  "Rozwiązania",
] as const;

export type Category = (typeof categories)[number];

export type Project = {
  title: string;
  description: string;
  category: Category; // do której zakładki trafia projekt
  tags: string[];
  href?: string; // link na żywo (demo)
  repo?: string; // link do repozytorium
  year: string;
  featured?: boolean;
};

// Edytuj tę listę, żeby dodać/zmienić projekty.
// Każdy projekt musi mieć `category` z listy powyżej. featured: true => też na stronie głównej.
export const projects: Project[] = [
  {
    title: "Vibe — sklep streetwear",
    description:
      "Sklep ze streetwearem premium (bluzy, koszulki z bawełny). Katalog z filtrowaniem, koszyk, płatności BLIK/Przelewy24 i pełny proces zakupowy.",
    category: "Sklepy www",
    tags: ["JavaScript", "HTML & CSS", "E-commerce"],
    href: "https://www.vibeleszno.com",
    year: "2026",
    featured: true,
  },
  {
    title: "Nawia — biżuteria",
    description:
      "Sklep marki biżuterii inspirowanej księżycem — ręcznie robione naszyjniki ze stali chirurgicznej i naturalnych kamieni. Koszyk, ulubione i konto użytkownika.",
    category: "Sklepy www",
    tags: ["Next.js", "React", "E-commerce"],
    href: "https://nawiabizuteria.pl",
    year: "2026",
    featured: true,
  },
];
