import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { posts, formatDate, readingTime } from "@/lib/posts";

const latest = [...posts]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export default function BlogTeaser() {
  if (latest.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <SectionHead
        label="Blog"
        title="Z notatnika"
        aside={
          <Link href="/blog" className="link-underline shrink-0 text-sm font-medium">
            Wszystkie wpisy
          </Link>
        }
      />

      <ul className="mt-12 md:ml-[calc(13rem+2rem)]">
        {latest.map((post, i) => (
          <li key={post.slug} className="border-b border-[var(--line)] first:border-t">
            <Reveal delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div>
                  <h3 className="text-xl transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)]">
                    {post.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-start gap-1 whitespace-nowrap text-sm text-[var(--ink-soft)] tabular-nums">
                  {formatDate(post.date)} · {readingTime(post)} min
                  <ArrowUpRight
                    size={15}
                    className="mt-0.5 transition-colors group-hover:text-accent"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
