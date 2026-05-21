import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Marked, Renderer } from "marked";
import { createHighlighter, type Highlighter } from "shiki";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
  html: string;
  readingTime: number;
};

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    return false;
  }
  return true;
}

let highlighterInstance: Highlighter | null = null;

async function getHighlighter() {
  if (highlighterInstance) return highlighterInstance;
  highlighterInstance = await createHighlighter({
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
      "python",
      "sql",
    ],
  });
  return highlighterInstance;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function buildHtml(content: string): Promise<string> {
  const highlighter = await getHighlighter();
  const supportedLangs = highlighter.getLoadedLanguages() as string[];

  const renderer = new Renderer();
  const originalCode = renderer.code.bind(renderer);
  renderer.code = ({ text, lang }) => {
    const langKey = (lang || "").toLowerCase();
    if (langKey && supportedLangs.includes(langKey)) {
      try {
        const html = highlighter.codeToHtml(text, {
          lang: langKey,
          theme: "github-dark-default",
        });
        return `<div class="code-block" data-lang="${langKey}">${html}</div>`;
      } catch {}
    }
    return `<pre><code>${escapeHtml(text)}</code></pre>`;
  };

  const marked = new Marked({ renderer, async: false });
  return marked.parse(content) as string;
}

export function getAllSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!ensureDir()) return null;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const html = await buildHtml(content);
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString().split("T")[0],
    excerpt: data.excerpt || "",
    tags: data.tags || [],
    content,
    html,
    readingTime,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));
  return posts
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
