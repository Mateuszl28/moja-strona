"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionNumber from "./SectionNumber";

const projects = [
  {
    slug: "praca-inzynierska",
    title: "Praca inżynierska",
    year: "2025",
    description:
      "Mój pierwszy duży projekt od zera — aplikacja webowa, którą sam wdrożyłem na własnym serwerze. Tu wszystko, czego się uczyłem, musiało zacząć działać razem.",
    tech: ["Full-stack", "Self-hosted"],
  },
  {
    slug: "sentra-ai",
    title: "Sentra AI",
    year: "2026",
    description:
      "AI Phishing Sentinel — narzędzie do wykrywania phishingu z integracją Gemini. Powstało na konkurs Hack the Tech 2026. Pierwsza poważna praca z LLM.",
    tech: ["TypeScript", "Gemini AI"],
  },
  {
    slug: "rapidsoc",
    title: "Rapidsoc",
    year: "2026",
    description:
      "Projekt zrealizowany w ramach zawodów programistycznych — z prawdziwym deadlinem i pracą pod presją czasu.",
    tech: ["Next.js", "Vercel"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="03" position="right" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-accent-400 mb-2">{"// 03."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Moje <span className="text-gradient">projekty</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kilka rzeczy, które naprawdę zbudowałem. Każdy ma swoją historię —
            kliknij, żeby poczytać o decyzjach i potknięciach.
          </p>
        </motion.div>

        <div className="space-y-4 mb-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group block glass glass-hover rounded-xl p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-xl font-semibold group-hover:text-accent-300 transition-colors">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-slate-500">
                      {project.year}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-slate-600 group-hover:text-accent-400 transition-colors shrink-0"
                  />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-mono text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            Wszystkie projekty
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
