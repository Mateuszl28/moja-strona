import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projekty",
  description:
    "Wszystkie projekty Mateusza Łagockiego — case studies, opisy techniczne, decyzje architektoniczne.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />

      <div className="relative max-w-5xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Wróć na stronę główną
        </Link>

        <header className="mb-16">
          <p className="font-mono text-sm text-purple-400 mb-2">/projects</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Moje <span className="text-gradient">projekty</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Case studies — od problemu, przez decyzje techniczne, po lessons
            learned. Kliknij w projekt, żeby zobaczyć głębszą analizę.
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-slate-400">Wkrótce dodam tu projekty.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block glass glass-hover rounded-3xl overflow-hidden transition-all hover:-translate-y-1"
              >
                <div
                  className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                    {project.emoji}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  {project.category && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-white">
                      {project.category}
                    </span>
                  )}
                  {project.status && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-mono">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          project.status === "live"
                            ? "bg-green-400"
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

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h2 className="text-xl font-bold">{project.title}</h2>
                      {project.subtitle && (
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {project.subtitle}
                        </p>
                      )}
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-1"
                    />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {project.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-purple-400 font-medium">
                      Case study →
                    </span>
                    {project.links?.demo && (
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <ExternalLink size={11} /> demo
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
