"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "Strona, którą właśnie oglądasz. Zbudowana z Next.js 14, TypeScript i Tailwind CSS. Z animacjami Framer Motion, glassmorphism i mnóstwem gradientów.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    gradient: "from-purple-600 to-pink-600",
    emoji: "✨",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Task Manager App",
    description:
      "Aplikacja do zarządzania zadaniami z drag & drop, kategoriami i lokalnym storage. Mój pierwszy poważny projekt w React.",
    tech: ["React", "TypeScript", "LocalStorage"],
    gradient: "from-blue-600 to-cyan-500",
    emoji: "📝",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "Dashboard pogodowy korzystający z OpenWeather API. Pokazuje aktualną pogodę i prognozę dla wybranego miasta.",
    tech: ["React", "API", "CSS Modules"],
    gradient: "from-orange-500 to-pink-500",
    emoji: "🌤️",
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    title: "Quiz App",
    description:
      "Interaktywna aplikacja quizowa z timerami, kategoriami i systemem punktów. Wspierane przez Open Trivia DB.",
    tech: ["JavaScript", "HTML", "CSS"],
    gradient: "from-green-500 to-emerald-600",
    emoji: "🎯",
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    title: "Markdown Notes",
    description:
      "Edytor notatek z podglądem markdown w czasie rzeczywistym, zapisem do pliku i opcjami eksportu.",
    tech: ["React", "Marked.js"],
    gradient: "from-indigo-600 to-purple-600",
    emoji: "📓",
    github: "#",
    demo: "#",
    featured: false,
  },
  {
    title: "Pomodoro Timer",
    description:
      "Klasyczny timer Pomodoro z konfigurowalnymi sesjami, dźwiękami i statystykami produktywności.",
    tech: ["React", "Tailwind"],
    gradient: "from-red-500 to-orange-500",
    emoji: "🍅",
    github: "#",
    demo: "#",
    featured: false,
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
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
            Wybrane projekty, nad którymi pracowałem. Każdy z nich nauczył mnie
            czegoś nowego.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative glass rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-7xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                  {project.emoji}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      aria-label="GitHub"
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.demo}
                      aria-label="Demo"
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>
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
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {other.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group glass glass-hover rounded-2xl p-5 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center text-xl`}
                >
                  {project.emoji}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={project.github}
                    aria-label="GitHub"
                    className="text-slate-500 hover:text-white"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={project.demo}
                    aria-label="Demo"
                    className="text-slate-500 hover:text-white"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{project.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
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
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass glass-hover text-sm font-medium transition-all"
          >
            <Folder size={16} />
            Zobacz wszystkie projekty na GitHubie
          </a>
        </motion.div>
      </div>
    </section>
  );
}
