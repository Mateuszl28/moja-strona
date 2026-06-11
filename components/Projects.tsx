import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  year: string;
};

// Edytuj tę listę, żeby dodać/zmienić projekty.
const projects: Project[] = [
  {
    title: "Sentra AI",
    description:
      "Projekt z obszaru AI — interfejs i integracja warstwy frontendowej.",
    tags: ["Next.js", "TypeScript", "AI"],
    year: "2025",
  },
  {
    title: "Rapidsoc",
    description:
      "Aplikacja webowa zbudowana w nowoczesnym stacku z naciskiem na wydajność.",
    tags: ["React", "Tailwind"],
    year: "2024",
  },
  {
    title: "Praca inżynierska",
    description:
      "Projekt dyplomowy — pełny cykl od pomysłu, przez implementację, po wdrożenie.",
    tags: ["Frontend", "UX"],
    year: "2024",
  },
];

export default function Projects() {
  return (
    <section id="projekty" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <p className="mb-10 font-mono text-sm text-[var(--ink-soft)]">
          02 — Projekty
        </p>
      </Reveal>

      <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <article className="group grid gap-3 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8">
              <span className="font-mono text-sm text-[var(--ink-soft)]">
                {p.year}
              </span>

              <div>
                <h3 className="flex items-center gap-1.5 text-xl font-medium">
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline inline-flex items-center gap-1"
                    >
                      {p.title}
                      <ArrowUpRight
                        size={16}
                        className="text-accent opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="mt-1.5 max-w-xl text-[var(--ink-soft)]">
                  {p.description}
                </p>
              </div>

              <ul className="flex flex-wrap gap-2 md:justify-end">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-xs text-[var(--ink-soft)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
