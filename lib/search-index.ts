import { getAllPosts } from "./blog";
import { getAllProjects } from "./projects";

export type SearchDoc = {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  body: string;
  url: string;
  category: "blog" | "project" | "page";
  tags?: string[];
  date?: string;
};

const STATIC_DOCS: SearchDoc[] = [
  {
    id: "home",
    title: "Strona główna",
    excerpt: "Hero, projekty, kontakt — wszystko na jednej stronie.",
    body: "Mateusz Łagocki junior frontend developer React Next.js TypeScript",
    url: "/",
    category: "page",
  },
  {
    id: "teraz",
    title: "Teraz",
    excerpt: "Co aktualnie robię, czego się uczę.",
    body: "Now page derek sivers status learning current focus",
    url: "/teraz",
    category: "page",
  },
  {
    id: "projects",
    title: "Wszystkie projekty",
    excerpt: "Lista projektów z case studies.",
    body: "Sentra AI Rapidsoc praca inżynierska portfolio case study",
    url: "/projects",
    category: "page",
  },
  {
    id: "zasoby",
    title: "Zasoby — biblioteka linków",
    excerpt: "Kursy, książki, narzędzia, kanały YouTube.",
    body: "freeCodeCamp Frontend Masters Theo Fireship books resources",
    url: "/zasoby",
    category: "page",
  },
  {
    id: "cv",
    title: "CV — do pobrania",
    excerpt: "Resume w formacie do druku / PDF.",
    body: "curriculum vitae resume download PDF print",
    url: "/cv",
    category: "page",
  },
  {
    id: "blog",
    title: "Blog",
    excerpt: "Notatki o programowaniu i nauce.",
    body: "blog posts articles notes programming learning",
    url: "/blog",
    category: "page",
  },
];

export async function buildSearchIndex(): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [...STATIC_DOCS];

  const posts = await getAllPosts();
  for (const post of posts) {
    docs.push({
      id: `blog-${post.slug}`,
      title: post.title,
      excerpt: post.excerpt,
      body: post.content,
      url: `/blog/${post.slug}`,
      category: "blog",
      tags: post.tags,
      date: post.date,
    });
  }

  const projects = await getAllProjects();
  for (const project of projects) {
    docs.push({
      id: `project-${project.slug}`,
      title: project.title,
      subtitle: project.subtitle,
      excerpt: project.excerpt,
      body: project.content,
      url: `/projects/${project.slug}`,
      category: "project",
      tags: project.tech,
      date: project.date,
    });
  }

  return docs;
}
