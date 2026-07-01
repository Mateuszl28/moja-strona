import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/projects";

// Kilka wyróżnionych realizacji na stronie głównej (reszta na /projekty).
const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function FeaturedProjects() {
  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Realizacje
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Wybrane projekty
            </h2>
          </div>
          <Link
            href="/projekty"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-[var(--ink)] transition-colors hover:text-accent sm:inline-flex"
          >
            Wszystkie
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <Link
          href="/projekty"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] transition-colors hover:text-accent sm:hidden"
        >
          Zobacz wszystkie projekty
          <ArrowUpRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}
