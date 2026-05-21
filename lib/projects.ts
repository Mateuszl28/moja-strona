import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked, Renderer } from "marked";
import { createHighlighter, type Highlighter } from "shiki";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectFrontmatter = {
  title: string;
  subtitle?: string;
  date: string;
  excerpt: string;
  tech: string[];
  category?: string;
  status?: "live" | "wip" | "archived";
  links?: {
    demo?: string;
    github?: string;
    case?: string;
  };
  gradient?: string;
  emoji?: string;
  order?: number;
};

export type Project = ProjectFrontmatter & {
  slug: string;
  content: string;
  html: string;
  readingTime: number;
};

function ensureDir() {
  return fs.existsSync(PROJECTS_DIR);
}

let highlighter: Highlighter | null = null;

async function getHighlighter() {
  if (highlighter) return highlighter;
  highlighter = await createHighlighter({
    themes: ["github-dark-default"],
    langs: [
      "typescript",
      "tsx",
      "javascript",
      "jsx",
      "css",
      "html",
      "json",
      "bash",
      "shell",
      "markdown",
    ],
  });
  return highlighter;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function buildHtml(content: string): Promise<string> {
  const hl = await getHighlighter();
  const langs = hl.getLoadedLanguages() as string[];
  const renderer = new Renderer();
  renderer.code = ({ text, lang }) => {
    const k = (lang || "").toLowerCase();
    if (k && langs.includes(k)) {
      try {
        const h = hl.codeToHtml(text, { lang: k, theme: "github-dark-default" });
        return `<div class="code-block" data-lang="${k}">${h}</div>`;
      } catch {}
    }
    return `<pre><code>${escapeHtml(text)}</code></pre>`;
  };
  const marked = new Marked({ renderer, async: false });
  return marked.parse(content) as string;
}

export function getAllProjectSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!ensureDir()) return null;
  const fp = path.join(PROJECTS_DIR, `${slug}.md`);
  if (!fs.existsSync(fp)) return null;

  const raw = fs.readFileSync(fp, "utf8");
  const { data, content } = matter(raw);

  const html = await buildHtml(content);
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return {
    slug,
    title: data.title || slug,
    subtitle: data.subtitle,
    date: data.date || new Date().toISOString().split("T")[0],
    excerpt: data.excerpt || "",
    tech: data.tech || [],
    category: data.category,
    status: data.status,
    links: data.links,
    gradient: data.gradient || "from-purple-600 to-pink-600",
    emoji: data.emoji || "✨",
    order: data.order,
    content,
    html,
    readingTime,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = getAllProjectSlugs();
  const projects = await Promise.all(slugs.map((s) => getProjectBySlug(s)));
  return projects
    .filter((p): p is Project => p !== null)
    .sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      return a.date < b.date ? 1 : -1;
    });
}
