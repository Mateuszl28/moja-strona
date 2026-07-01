import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Mateusz Łagocki — websites, online stores, web and mobile apps.",
  alternates: {
    canonical: "/en/projects",
    languages: { "pl-PL": "/projekty", en: "/en/projects" },
  },
};

export default function EnProjectsPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Projects
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            What I&apos;ve built
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            A selection of projects — from experiments to client work. Each one
            taught me something new.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05} className="h-full">
              <ProjectCard project={p} en />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-[var(--paper-soft)] px-8 py-14 text-center">
            <div className="glow-warm absolute inset-x-0 -top-10 h-60 opacity-90" />
            <h2 className="relative mx-auto max-w-xl text-balance text-2xl font-semibold leading-snug sm:text-3xl">
              Like what you see?
              <span className="text-accent"> Let&apos;s build yours.</span>
            </h2>
            <div className="relative mt-8">
              <Link
                href="/en/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
              >
                Get in touch
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
