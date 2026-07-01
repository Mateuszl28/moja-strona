import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { posts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notatki z budowania — Next.js, wdrożenia, frontend. Praktyczne wpisy Mateusza Łagockiego.",
  alternates: { canonical: "/blog" },
};

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function BlogPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Blog
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Notatki z budowania
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Praktyczne wpisy o&nbsp;tym, jak buduję i&nbsp;wdrażam — Next.js,
            serwery, frontend bez lania wody.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        {sorted.length === 0 ? (
          <Reveal>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center text-[var(--ink-soft)]">
              Pierwsze wpisy już w drodze.
            </div>
          </Reveal>
        ) : (
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {sorted.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-2 py-7 transition-colors"
                >
                  <span className="font-mono text-xs text-[var(--ink-soft)]">
                    {formatDate(post.date)}
                  </span>
                  <h2 className="flex items-start justify-between gap-4 text-xl font-medium transition-colors group-hover:text-accent">
                    {post.title}
                    <ArrowUpRight
                      size={20}
                      className="mt-1 shrink-0 text-[var(--ink-soft)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
                    {post.excerpt}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-[var(--paper-soft)] px-2 py-1 font-mono text-xs text-[var(--ink-soft)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
