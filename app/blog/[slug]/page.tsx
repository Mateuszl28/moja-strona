import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post nie znaleziony" };
  return {
    title: `${post.title} — Mateusz Łagocki`,
    description: post.excerpt,
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />

      <article className="relative max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Wszystkie posty
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readingTime} min czytania
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </main>
  );
}
