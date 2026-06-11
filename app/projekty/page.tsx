import type { Metadata } from "next";
import ProjectsGrid from "@/components/ProjectsGrid";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projekty",
  description:
    "Wybrane projekty Mateusza Łagockiego — frontend: React, Next.js, TypeScript.",
  alternates: { canonical: "/projekty" },
};

export default function ProjektyPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Projekty
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Co zbudowałem
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Wybór projektów — od eksperymentów po prace na zaliczenie i&nbsp;dla
            klientów. Każdy uczył mnie czegoś nowego.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-8">
        <ProjectsGrid items={projects} />
      </section>

      <CTA />
    </main>
  );
}
