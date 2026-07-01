import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PostBody from "@/components/PostBody";
import { posts, getPost, formatDate, readingTime } from "@/lib/posts";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  const newer = idx > 0 ? sorted[idx - 1] : null;
  const older = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: "Mateusz Łagocki" },
    url: `${BASE_URL}/blog/${post.slug}`,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <main className="pt-28">
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
        />

        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Wszystkie wpisy
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[var(--ink-soft)]">
          <span>{formatDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--ink-soft)]/40" />
          <span>{readingTime(post)} min czytania</span>
          <span className="h-1 w-1 rounded-full bg-[var(--ink-soft)]/40" />
          <span>{post.tags.join(" · ")}</span>
        </div>

        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-10">
          <PostBody blocks={post.content} />
        </div>

        {(older || newer) && (
          <nav className="mt-14 grid gap-3 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-accent/30"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-soft)]">
                  <ArrowLeft size={14} /> Starszy wpis
                </span>
                <span className="mt-2 block font-medium transition-colors group-hover:text-accent">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="group rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 text-right transition-colors hover:border-accent/30"
              >
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--ink-soft)]">
                  Nowszy wpis <ArrowRight size={14} />
                </span>
                <span className="mt-2 block font-medium transition-colors group-hover:text-accent">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </main>
  );
}
