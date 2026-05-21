import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/lib/search-index";

export const revalidate = 3600;

export async function GET() {
  try {
    const docs = await buildSearchIndex();
    const lite = docs.map((d) => ({
      id: d.id,
      title: d.title,
      subtitle: d.subtitle,
      excerpt: d.excerpt,
      body: d.body.slice(0, 2000),
      url: d.url,
      category: d.category,
      tags: d.tags,
      date: d.date,
    }));
    return NextResponse.json({ docs: lite });
  } catch (err) {
    console.error("Search index error:", err);
    return NextResponse.json({ docs: [] }, { status: 500 });
  }
}
