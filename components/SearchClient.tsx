"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import {
  Search,
  FileText,
  FolderGit2,
  Globe,
  ArrowRight,
} from "lucide-react";

type Doc = {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  body: string;
  url: string;
  category: "blog" | "project" | "page";
  tags?: string[];
  date?: string;
};

type Props = { docs: Doc[] };

const categoryIcons = {
  blog: FileText,
  project: FolderGit2,
  page: Globe,
};

const categoryLabels = {
  blog: "Post",
  project: "Projekt",
  page: "Strona",
};

function highlight(text: string, q: string): React.ReactNode {
  if (!q.trim()) return text;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(re);
  return parts.map((p, i) =>
    re.test(p) ? (
      <mark
        key={i}
        className="bg-purple-500/30 text-white rounded px-0.5"
      >
        {p}
      </mark>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

export default function SearchClient({ docs }: Props) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Doc["category"] | "all">("all");

  const fuse = useMemo(
    () =>
      new Fuse(docs, {
        keys: [
          { name: "title", weight: 3 },
          { name: "subtitle", weight: 2 },
          { name: "excerpt", weight: 2 },
          { name: "tags", weight: 1.5 },
          { name: "body", weight: 1 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [docs]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const found = fuse.search(query).map((r) => r.item);
    if (activeCat === "all") return found;
    return found.filter((d) => d.category === activeCat);
  }, [query, fuse, activeCat]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        const input = document.getElementById("search-input");
        input?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const cats: { id: Doc["category"] | "all"; label: string }[] = [
    { id: "all", label: "Wszystkie" },
    { id: "blog", label: "Blog" },
    { id: "project", label: "Projekty" },
    { id: "page", label: "Strony" },
  ];

  return (
    <div>
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          id="search-input"
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Wpisz fraza, słowo kluczowe..."
          className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-base"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-500">
          /
        </kbd>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
              activeCat === c.id
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {!query.trim() ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-slate-400 mb-2">Zacznij pisać.</p>
          <p className="text-xs text-slate-500 font-mono">
            Tip: gdziekolwiek na stronie wciśnij <kbd className="px-1.5 py-0.5 rounded bg-white/10">/</kbd> żeby tu wrócić
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-slate-400">
            Nic nie pasuje do &quot;{query}&quot;.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-xs font-mono text-slate-500 mb-4">
            {results.length}{" "}
            {results.length === 1
              ? "wynik"
              : results.length < 5
                ? "wyniki"
                : "wyników"}
          </p>
          <div className="space-y-3">
            {results.map((doc) => {
              const Icon = categoryIcons[doc.category];
              const snippet = doc.body
                .substring(0, 200)
                .replace(/[\n\r#`*_]/g, " ")
                .trim();
              return (
                <Link
                  key={doc.id}
                  href={doc.url}
                  className="block glass glass-hover rounded-2xl p-5 transition-all hover:-translate-y-0.5 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-wider font-mono text-purple-400">
                          {categoryLabels[doc.category]}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-[10px] font-mono text-slate-500 truncate">
                          {doc.url}
                        </span>
                      </div>
                      <h2 className="font-bold mb-1 group-hover:text-gradient transition-colors">
                        {highlight(doc.title, query)}
                      </h2>
                      {doc.subtitle && (
                        <p className="text-xs text-slate-500 mb-1.5 italic">
                          {doc.subtitle}
                        </p>
                      )}
                      <p className="text-sm text-slate-400 leading-relaxed mb-2 line-clamp-2">
                        {highlight(doc.excerpt || snippet, query)}
                      </p>
                      {doc.tags && doc.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {doc.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-slate-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-2"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
