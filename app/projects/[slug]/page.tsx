import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import ReadingProgress from "@/components/ReadingProgress";
import AudioNarration from "@/components/AudioNarration";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Projekt nie znaleziony" };
  return {
    title: `${project.title} — Case study`,
    description: project.excerpt,
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ReadingProgress />
      <BackgroundBlobs />

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Wszystkie projekty
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            {project.category && (
              <span className="px-3 py-1 rounded-full glass text-xs font-mono uppercase tracking-wider text-purple-400">
                {project.category}
              </span>
            )}
            {project.status && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass text-xs font-mono">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === "live"
                      ? "bg-green-400 animate-pulse"
                      : project.status === "wip"
                        ? "bg-orange-400"
                        : "bg-slate-500"
                  }`}
                />
                {project.status === "live"
                  ? "Live"
                  : project.status === "wip"
                    ? "In Progress"
                    : "Archived"}
              </span>
            )}
          </div>

          <div className="flex items-start gap-4 mb-4">
            <div
              className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-4xl md:text-5xl shrink-0`}
            >
              {project.emoji}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {project.title}
              </h1>
              {project.subtitle && (
                <p className="text-lg text-slate-400 mt-1">
                  {project.subtitle}
                </p>
              )}
            </div>
          </div>

          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            {project.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formatDate(project.date)}
            </span>
            <span>{project.readingTime} min czytania</span>
          </div>

          {(project.links?.demo || project.links?.github) && (
            <div className="flex flex-wrap gap-3 mb-6">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target={
                    project.links.demo.startsWith("http") ? "_blank" : undefined
                  }
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  <ExternalLink size={14} />
                  Live demo
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-hover text-sm font-medium transition-all"
                >
                  <Github size={14} />
                  GitHub
                </a>
              )}
            </div>
          )}

          {project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <AudioNarration
            text={`${project.title}. ${project.excerpt}. ${project.content}`}
          />
        </header>

        <div
          className="prose-blog"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </div>
    </main>
  );
}
