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
    title: "Sentra AI",
    description:
      "Projekt z obszaru AI — interfejs i integracja warstwy frontendowej.",
    tags: ["Next.js", "TypeScript", "AI"],
    year: "2025",
    featured: true,
  },
  {
    title: "Rapidsoc",
    description:
      "Aplikacja webowa zbudowana w nowoczesnym stacku z naciskiem na wydajność.",
    tags: ["React", "Tailwind"],
    year: "2024",
    featured: true,
  },
  {
    title: "Praca inżynierska",
    description:
      "Projekt dyplomowy — pełny cykl od pomysłu, przez implementację, po wdrożenie.",
    tags: ["Frontend", "UX"],
    year: "2024",
    featured: true,
  },
];
