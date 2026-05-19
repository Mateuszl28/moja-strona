import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

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

export function getAllSlugs(): string[] {
  if (!ensureDir()) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post | null {
  if (!ensureDir()) return null;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const html = marked.parse(content, { async: false }) as string;
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

export function getAllPosts(): Post[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
