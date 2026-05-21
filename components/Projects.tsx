"use client";

import { motion } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import SectionNumber from "./SectionNumber";

const projects = [
  {
    title: "Praca inżynierska",
    description:
      "Mój projekt inżynierski — aplikacja webowa wdrożona na własnym serwerze.",
    tech: [],
    gradient: "from-purple-600 to-pink-600",
    emoji: "🎓",
    demo: "http://212.132.124.0/",
  },
  {
    title: "Rapidsoc",
    description:
      "Projekt zrealizowany w ramach zawodów programistycznych.",
    tech: [],
    gradient: "from-blue-600 to-cyan-500",
    emoji: "⚡",
    demo: "https://rapidsoc1-nc0o6orro-mateuszl28s-projects.vercel.app/",
  },
  {
    title: "Sentra AI",
    description:
      "AI Phishing Sentinel — narzędzie do wykrywania phishingu z analizą emaili przez Gemini 2.5 Flash. Drugi projekt z zawodów (Hack the Tech 2026, kategoria Cybersecurity).",
    tech: ["TypeScript", "Gemini AI"],
    gradient: "from-orange-500 to-pink-500",
    emoji: "🛡️",
    demo: "https://sentra-ai-peach.vercel.app/",
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
            Wybrane projekty, nad którymi pracowałem.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative glass rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300 block"
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
                  <ExternalLink
                    size={18}
                    className="text-slate-500 group-hover:text-white transition-colors shrink-0 mt-1"
                  />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                {project.tech.length > 0 && (
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
                )}
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Mateuszl28"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass glass-hover text-sm font-medium transition-all"
          >
            <Folder size={16} />
            Więcej projektów na GitHubie
          </a>
        </motion.div>
      </div>
    </section>
  );
}
