"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Filter } from "lucide-react";

type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  tags: string[];
};

type Props = {
  posts: PostMeta[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogList({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag) {
      result = result.filter((p) => p.tags.includes(activeTag));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [posts, query, activeTag]);

  if (posts.length === 0) {
    return (
      <div className="glass rounded-2xl p-12 text-center">
        <p className="text-slate-400 mb-2">Jeszcze nic tu nie ma.</p>
        <p className="text-sm text-slate-500">Pierwszy post wleci wkrótce.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj w postach..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-mono mr-1">
              <Filter size={12} />
              tagi:
            </span>
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                activeTag === null
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "bg-white/5 text-slate-400 hover:text-white"
              }`}
            >
              wszystkie
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveTag((t) => (t === tag ? null : tag))
                }
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                  activeTag === tag
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "bg-white/5 text-slate-400 hover:text-white"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs font-mono text-slate-500 mb-4">
        {filtered.length} {filtered.length === 1 ? "post" : "postów"}
      </p>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-slate-400">Nic nie pasuje do filtra.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block glass glass-hover rounded-2xl p-6 transition-all hover:-translate-y-0.5 group"
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
                <h2 className="text-xl font-bold mb-2 group-hover:text-gradient transition-colors">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  {post.tags.length > 0 && (
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
