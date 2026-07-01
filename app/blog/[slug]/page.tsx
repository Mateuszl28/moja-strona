import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PostBody from "@/components/PostBody";
import { posts, getPost, formatDate } from "@/lib/posts";

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: "Mateusz Łagocki" },
  };

  return (
    <main className="pt-28">
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
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
          <span>{post.tags.join(" · ")}</span>
        </div>

        <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-10">
          <PostBody blocks={post.content} />
        </div>
      </article>
    </main>
  );
}
