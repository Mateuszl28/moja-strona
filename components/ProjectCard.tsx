import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";
import { categoryEn, projectSlug } from "@/lib/projects";
import Link from "next/link";
import ProjectShots from "./ProjectShots";

export default function ProjectCard({
  project: p,
  en = false,
}: {
  project: Project;
  en?: boolean;
}) {
  const codeLabel = en ? "Code" : "Kod";
  // Normalizacja: wiele repo (p.repos) albo skrót p.repo → jednolita lista linków.
  const repoLinks = p.repos ?? (p.repo ? [{ label: codeLabel, href: p.repo }] : []);
  const description = en ? p.descriptionEn ?? p.description : p.description;
  const category = en ? categoryEn[p.category] : p.category;
  const liveLabel = p.hrefLabel ?? (en ? "Live" : "Zobacz na żywo");

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors hover:border-ink/40">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-sm text-[var(--ink-soft)]">{category}</span>
        <span className="text-sm tabular-nums text-[var(--ink-soft)]">{p.year}</span>
      </div>

      <h3 className="text-xl leading-snug">
        {p.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-[var(--ink-soft)]">{description}</p>

      {p.shots && p.shots.length > 0 && (
        <ProjectShots shots={p.shots} title={p.title} en={en} />
      )}

      <p className="mt-5 text-sm text-[var(--ink-soft)]">{p.tags.join(" · ")}</p>

      {(p.href || repoLinks.length > 0 || (p.caseStudy && !en)) && (
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[var(--line)] pt-4 text-sm">
          {p.caseStudy && !en && (
            <Link
              href={`/projekty/${projectSlug(p)}`}
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-[var(--ink)]"
            >
              Case study
              <ArrowUpRight size={15} />
            </Link>
          )}
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-[var(--ink)] transition-colors hover:text-accent"
            >
              {liveLabel}
              <ArrowUpRight size={15} />
            </a>
          )}
          {repoLinks.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              <Github size={15} />
              {r.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
