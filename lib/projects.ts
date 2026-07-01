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
export const projects: Project[] = [];
