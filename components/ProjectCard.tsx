import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[var(--line)] bg-white/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(28,27,25,0.07)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-[var(--ink-soft)]">{p.year}</span>
      </div>

      <h3 className="text-lg font-medium">{p.title}</h3>
      <p className="mt-2 flex-1 text-sm text-[var(--ink-soft)]">{p.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {p.tags.map((t) => (
          <li
            key={t}
            className="rounded-md bg-[var(--paper-soft)] px-2 py-1 font-mono text-xs text-[var(--ink-soft)]"
          >
            {t}
          </li>
        ))}
      </ul>

      {(p.href || p.repo) && (
        <div className="mt-5 flex items-center gap-4 border-t border-[var(--line)] pt-4 text-sm">
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[var(--ink)] transition-colors hover:text-accent"
            >
              Zobacz na żywo
              <ArrowUpRight size={15} />
            </a>
          )}
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              <Github size={15} />
              Kod
            </a>
          )}
        </div>
      )}
    </article>
  );
}
