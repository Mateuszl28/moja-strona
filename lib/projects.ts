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
export const projects: Project[] = [];
