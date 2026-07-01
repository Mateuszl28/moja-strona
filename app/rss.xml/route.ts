import { posts } from "@/lib/posts";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function GET() {
  const items = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((p) => {
      const url = `${BASE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(p.date + "T00:00:00").toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog — Mateusz Łagocki</title>
    <link>${BASE_URL}/blog</link>
    <description>Notatki z budowania — Next.js, wdrożenia, frontend.</description>
    <language>pl-PL</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
