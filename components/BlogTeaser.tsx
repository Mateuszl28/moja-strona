import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { posts, formatDate, readingTime } from "@/lib/posts";

const latest = [...posts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 2);

export default function BlogTeaser() {
  if (latest.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Blog
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Z notatnika
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--ink)] transition-colors hover:text-accent sm:inline-flex"
          >
            Wszystkie wpisy
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.06} className="h-full">
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:bg-[var(--surface-hover)]"
            >
              <span className="font-mono text-xs text-[var(--ink-soft)]">
                {formatDate(post.date)} · {readingTime(post)} min
              </span>
              <h3 className="mt-3 text-lg font-medium transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                {post.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Czytaj
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
