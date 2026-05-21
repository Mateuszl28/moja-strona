import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notatki o programowaniu, projektach, narzędziach i tym, czego się aktualnie uczę.",
};

export default function BlogPage() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    readingTime: p.readingTime,
    tags: p.tags ?? [],
  }));

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Wróć na stronę główną
        </Link>

        <header className="mb-12">
          <p className="font-mono text-sm text-purple-400 mb-2">/blog</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Notatki</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Co jakiś czas spisuję sobie tutaj rzeczy, których się nauczyłem.
            Krótkie notatki, dłuższe przemyślenia, czasem dev journal.
          </p>
        </header>

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
