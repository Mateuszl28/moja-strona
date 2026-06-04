"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Rocket,
  Trophy,
  GraduationCap,
  Compass,
} from "lucide-react";
import SectionNumber from "./SectionNumber";

type Item = {
  year: string;
  icon: typeof Code2;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  gradient: string;
};

const items: Item[] = [
  {
    year: "2024",
    icon: Sparkles,
    title: "Pierwsze linijki kodu",
    subtitle: "Początki",
    description:
      "Zaczęło się od ciekawości, jak działają strony internetowe. Pierwsze HTML, CSS, podstawy JavaScriptu. Małe projekty do szuflady, żeby zobaczyć co się da.",
    highlights: ["HTML5", "CSS3", "JavaScript", "Podstawy Gita"],
    gradient: "from-purple-600 to-blue-600",
  },
  {
    year: "2025",
    icon: Code2,
    title: "Wchodzę głębiej",
    subtitle: "Frameworki i narzędzia",
    description:
      "Odkryłem React i okazało się, że frontend może być prawdziwym rzemiosłem. Doszły Tailwind, kontrola wersji w GitHubie i pierwsze projekty z prawdziwym buildem.",
    highlights: ["React", "Tailwind CSS", "GitHub", "Praca z API"],
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    year: "2025",
    icon: GraduationCap,
    title: "Praca inżynierska",
    subtitle: "Projekt dyplomowy",
    description:
      "Mój pierwszy duży projekt od zera — aplikacja webowa wdrożona na własnym serwerze. Wszystko, czego nauczyłem się wcześniej, musiało nagle zacząć działać razem.",
    highlights: ["Pełen stack aplikacji", "Wdrożenie na serwerze", "Dokumentacja"],
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    year: "2026",
    icon: Trophy,
    title: "Projekty konkursowe",
    subtitle: "Hack the Tech 2026 + Rapidsoc",
    description:
      "Wziąłem udział w dwóch konkursach programistycznych. Sentra AI — narzędzie do wykrywania phishingu z integracją Gemini. Drugi projekt: Rapidsoc. Pierwsza praca z LLM i prawdziwy deadline.",
    highlights: ["TypeScript", "Gemini AI", "Vercel", "Cybersecurity"],
    gradient: "from-orange-500 to-pink-600",
  },
  {
    year: "2026",
    icon: Rocket,
    title: "Teraz",
    subtitle: "Next.js, własne portfolio, szukanie pracy",
    description:
      "Buduję to portfolio (Next.js 14 + TypeScript + Tailwind), polerując projekty i szukając pierwszej pracy jako developer. Stale uczę się głębszego TypeScripta i Server Components.",
    highlights: ["Next.js 14", "TypeScript", "App Router", "Framer Motion"],
    gradient: "from-pink-600 to-purple-600",
  },
  {
    year: "Dalej",
    icon: Compass,
    title: "Cel: backend + pierwsza praca",
    subtitle: "Plany na najbliższe miesiące",
    description:
      "Chcę domknąć temat backendu (Node.js + PostgreSQL + Prisma), zbudować jeszcze 1-2 projekty open-source warte pokazania i znaleźć zespół, w którym będę mógł się dalej uczyć.",
    highlights: ["Node.js", "PostgreSQL", "Prisma", "Testing"],
    gradient: "from-purple-600 to-indigo-600",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="04" position="left" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-accent-400 mb-2">{"// 04."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Moja <span className="text-gradient">droga</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Krótka chronologia tego, jak się tu znalazłem.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-12">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex flex-col md:flex-row items-start gap-6 ${
                    isLeft ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 rounded-full bg-accent-400 ring-4 ring-[#0d0d10] md:-translate-x-1/2 mt-7" />

                  <div className="pl-12 md:pl-0 md:w-1/2 md:px-8">
                    <div className="glass glass-hover rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent-400/10 flex items-center justify-center shrink-0">
                          <Icon size={18} className="text-accent-400" />
                        </div>
                        <div>
                          <p className="font-mono text-xs text-accent-400">
                            {item.year}
                          </p>
                          <h3 className="font-bold">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-mono mb-3">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-2.5 py-1 rounded-full bg-white/5 text-[11px] font-mono text-slate-400"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
