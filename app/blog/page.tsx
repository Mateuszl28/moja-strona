import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ArrowRight } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Mateusz Łagocki",
  description:
    "Notatki o programowaniu, projektach, narzędziach i tym, czego się aktualnie uczę.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

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

        <header className="mb-16">
          <p className="font-mono text-sm text-purple-400 mb-2">/blog</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Notatki</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Co jakiś czas spisuję sobie tutaj rzeczy, których się nauczyłem.
            Krótkie notatki, dłuższe przemyślenia, czasem dev journal.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-slate-400 mb-2">Jeszcze nic tu nie ma.</p>
            <p className="text-sm text-slate-500">
              Pierwszy post wleci wkrótce.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block glass glass-hover rounded-2xl p-6 transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-2 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readingTime} min
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-gradient">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 text-sm text-purple-400">
                    Czytaj <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
