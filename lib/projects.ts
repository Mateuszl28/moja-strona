export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string; // link na żywo (demo)
  repo?: string; // link do repozytorium
  year: string;
  featured?: boolean;
};

// Edytuj tę listę, żeby dodać/zmienić projekty.
// featured: true => pokaże się też na stronie głównej.
export const projects: Project[] = [
  {
    title: "Vibe — sklep streetwear",
    description:
      "Sklep internetowy ze streetwearem premium (bluzy, koszulki). Katalog produktów, koszyk i pełny proces zakupowy.",
    tags: ["JavaScript", "HTML & CSS", "E-commerce"],
    href: "https://www.vibeleszno.com",
    repo: "https://github.com/Mateuszl28/Vibe",
    year: "2026",
    featured: true,
  },
  {
    title: "Sentra AI — wykrywanie phishingu",
    description:
      "Wklejasz podejrzanego maila, a Sentra analizuje nagłówki, linki i treść heurystykami, po czym Gemini wyjaśnia zagrożenie prostym językiem i pozwala dopytać.",
    tags: ["Next.js", "TypeScript", "Gemini AI"],
    href: "https://sentra-ai-peach.vercel.app",
    repo: "https://github.com/Mateuszl28/Sentra_AI",
    year: "2026",
    featured: true,
  },
  {
    title: "Piece na zawsze",
    description:
      "Strona firmowa zbudowana na WordPressie — prezentacja oferty, treści i formularz kontaktowy.",
    tags: ["WordPress", "Strona firmowa"],
    href: "https://www.piecenazawsze.pl",
    year: "2025",
    featured: true,
  },
  {
    title: "Rapidsoc",
    description:
      "Aplikacja webowa zbudowana w nowoczesnym stacku z naciskiem na wydajność.",
    tags: ["React", "Tailwind"],
    year: "2026",
    featured: true,
  },
  {
    title: "Praca inżynierska",
    description:
      "Projekt dyplomowy — pełny cykl od pomysłu, przez implementację, po wdrożenie.",
    tags: ["Frontend", "UX"],
    year: "2026",
    featured: true,
  },
];
