import { getAllPosts } from "@/lib/blog";

export const runtime = "nodejs";
export const revalidate = 3600;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://85.215.197.199";

const AUTHOR = "Mateusz Łagocki";
const EMAIL = "lagockimateusz6@gmail.com";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(s: string) {
  return `<![CDATA[${s.replace(/\]\]>/g, "]]]]><![CDATA[>")}]]>`;
}

export async function GET() {
  const posts = await getAllPosts();
  const now = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toUTCString();
      const tags = (post.tags || [])
        .map((t) => `<category>${escapeXml(t)}</category>`)
        .join("");
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${cdata(post.excerpt)}</description>
      <author>${EMAIL} (${AUTHOR})</author>
      ${tags}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(AUTHOR)} — Blog</title>
    <link>${BASE_URL}/blog</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Notatki o programowaniu, projektach i tym, czego się uczę.</description>
    <language>pl-PL</language>
    <lastBuildDate>${now}</lastBuildDate>
    <managingEditor>${EMAIL} (${AUTHOR})</managingEditor>
    <webMaster>${EMAIL} (${AUTHOR})</webMaster>
    <generator>Next.js</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
