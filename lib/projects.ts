// Kategorie = zakładki na stronie /projekty. Kolejność tu = kolejność zakładek.
export const categories = [
  "Strony www",
  "Sklepy www",
  "Aplikacje internetowe",
  "Aplikacje mobilne",
  "Sterowniki",
  "Rozwiązania",
  "Hackatony",
  "Rekrutacja",
] as const;

export type Category = (typeof categories)[number];

export type RepoLink = { label: string; href: string };

export type Project = {
  title: string;
  description: string;
  category: Category; // do której zakładki trafia projekt
  tags: string[];
  href?: string; // link na żywo (demo / sklep)
  hrefLabel?: string; // etykieta przycisku href (domyślnie „Zobacz na żywo")
  repo?: string; // pojedyncze repo (skrót — pokaże się jako „Kod")
  repos?: RepoLink[]; // wiele repo z etykietami (np. Linux / Windows)
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
  {
    title: "Sterownik drukarki P15",
    description:
      "Sterownik do drukarki P15 działający na Linuksie i Windowsie — obsługa urządzenia napisana w .NET (C#).",
    category: "Sterowniki",
    tags: [".NET", "C#", "Windows / Linux"],
    repos: [
      {
        label: "Kod (Linux)",
        href: "https://github.com/Mateuszl28/Printer_P15-Linux",
      },
      {
        label: "Kod (Windows)",
        href: "https://github.com/Mateuszl28/Printer_P15-Windows",
      },
    ],
    year: "2026",
    featured: true,
  },
  {
    title: "Lepszy dzień",
    description:
      "Autorska aplikacja mobilna wspierająca lepsze nawyki i dobre samopoczucie — drobne, codzienne kroki ku lepszemu dniu.",
    category: "Aplikacje mobilne",
    tags: ["Android", "Wellbeing", "Aplikacja mobilna"],
    href: "https://play.google.com/store/apps/details?id=com.lepszy_dzien",
    hrefLabel: "Google Play",
    year: "2026",
    featured: true,
  },
  {
    title: "Enova Cleaner",
    description:
      "Narzędzie konsolowe automatyzujące archiwizację i retencję kopii zapasowych baz danych w Azure Blob Storage — przenosi miesięczne kopie do archiwum i usuwa starsze kopie dzienne. Opakowuje AzCopy.",
    category: "Rozwiązania",
    tags: ["C#", ".NET", "Azure"],
    repo: "https://github.com/Mateuszl28/Enova_cleaner",
    year: "2026",
    featured: true,
  },
];
