"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FolderOpen } from "lucide-react";
import SectionNumber from "./SectionNumber";

const projects = [
  {
    slug: "praca-inzynierska",
    title: "Praca inżynierska",
    description:
      "Mój projekt inżynierski — aplikacja webowa wdrożona na własnym serwerze.",
    tech: ["Full-stack", "Self-hosted"],
    gradient: "from-purple-600 to-pink-600",
    emoji: "🎓",
  },
  {
    slug: "rapidsoc",
    title: "Rapidsoc",
    description:
      "Projekt zrealizowany w ramach zawodów programistycznych.",
    tech: ["Next.js", "Vercel"],
    gradient: "from-blue-600 to-cyan-500",
    emoji: "⚡",
  },
  {
    slug: "sentra-ai",
    title: "Sentra AI",
    description:
      "AI Phishing Sentinel — narzędzie do wykrywania phishingu z integracją Gemini. Z konkursu Hack the Tech 2026.",
    tech: ["TypeScript", "Gemini AI"],
    gradient: "from-orange-500 to-pink-500",
    emoji: "🛡️",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="03" position="right" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-purple-400 mb-2">{"// 03."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Moje <span className="text-gradient">projekty</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Wybrane projekty z case studies — kliknij, żeby zobaczyć decyzje
            techniczne i lessons learned.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative glass rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 block h-full"
              >
                <div
                  className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                    {project.emoji}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <ArrowRight
                      size={18}
                      className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0 mt-1"
                    />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-purple-400 font-medium whitespace-nowrap">
                      Case study →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass glass-hover text-sm font-medium transition-all"
          >
            <FolderOpen size={16} />
            Wszystkie projekty
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
