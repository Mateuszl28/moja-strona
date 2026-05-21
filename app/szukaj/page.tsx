import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import SearchClient from "@/components/SearchClient";
import { buildSearchIndex } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Szukaj",
  description: "Przeszukaj posty bloga, case studies, zasoby i inne strony.",
};

export default async function SearchPage() {
  const docs = await buildSearchIndex();

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
          <p className="font-mono text-sm text-purple-400 mb-2">/szukaj</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Szukaj</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Pełnotekstowe wyszukiwanie po blogu, projektach, zasobach i całej
            stronie.
          </p>
        </header>

        <SearchClient
          docs={docs.map((d) => ({
            id: d.id,
            title: d.title,
            subtitle: d.subtitle,
            excerpt: d.excerpt,
            body: d.body.slice(0, 2000),
            url: d.url,
            category: d.category,
            tags: d.tags,
            date: d.date,
          }))}
        />
      </div>
    </main>
  );
}
