"use client";

import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  Github,
  Globe,
  MapPin,
  Sparkles,
} from "lucide-react";
import ShareQR from "@/components/ShareQR";

const PERSONAL = {
  name: "Mateusz Łagocki",
  role: "Junior Frontend Developer",
  email: "lagockimateusz6@gmail.com",
  location: "Polska / Remote",
  github: "github.com/Mateuszl28",
  website: "85.215.197.199",
};

const SUMMARY = `Junior frontend developer z pasją do budowania rzeczy w internecie. Zbudowałem od zera własne portfolio (Next.js 14, TypeScript, Tailwind) hostowane na własnym VPS, a w konkursie Hack the Tech 2026 stworzyłem Sentra AI - narzędzie do wykrywania phishingu z Gemini. Otwarty na pierwszą pracę / staż.`;

const SKILLS = {
  Frontend: ["React", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "JavaScript ES6+"],
  Backend: ["Node.js (basic)", "REST API", "PostgreSQL (basic)"],
  AI: ["Gemini API", "Prompt engineering", "LLM integration"],
  Tools: ["Git", "GitHub", "VS Code", "Vercel", "PM2", "Nginx"],
  Soft: ["Self-learner", "Documentation", "Problem solving"],
};

const PROJECTS = [
  {
    name: "Sentra AI - AI Phishing Sentinel",
    period: "2026",
    url: "sentra-ai-peach.vercel.app",
    description:
      "Narzędzie edukacyjne do wykrywania phishingu z analizą emaili przez Gemini 2.0 Flash. Trzy warstwy: deterministic checks, AI analysis, edukacyjne wyjaśnienia.",
    tech: ["TypeScript", "Next.js", "Gemini AI", "Vercel"],
    context: "Hack the Tech 2026, kategoria Cybersecurity & Privacy",
  },
  {
    name: "Portfolio (ta strona)",
    period: "2026",
    url: "85.215.197.199",
    description:
      "Pełen stack od zera: Next.js 14 z App Router, TypeScript, Tailwind, integracja Gemini (AI chatbot), Resend (email), Shiki (syntax highlighting). Wdrożone na własnym VPS z nginx + PM2.",
    tech: ["Next.js 14", "TypeScript", "Tailwind", "Gemini AI", "Resend"],
  },
  {
    name: "Rapidsoc",
    period: "2026",
    url: "rapidsoc.vercel.app",
    description: "Drugi projekt z konkursu programistycznego.",
    tech: ["Next.js", "TypeScript"],
  },
  {
    name: "Praca inżynierska",
    period: "2025",
    url: "212.132.124.0",
    description:
      "Aplikacja webowa wdrożona na własnym serwerze - mój pierwszy duży projekt end-to-end. Pełen stack: frontend, backend, baza danych, deployment.",
    tech: ["Full-stack"],
  },
];

const EXPERIENCE_TIMELINE = [
  { year: "2024", text: "Początki: HTML, CSS, JavaScript - małe projekty do szuflady" },
  { year: "2025", text: "Wchodzę głębiej: React, Tailwind, Git, GitHub. Praca inżynierska na własnym serwerze." },
  { year: "2026", text: "Konkursy programistyczne (Hack the Tech), integracje z AI (Gemini), Next.js 14, własne portfolio." },
];

export default function CVPage() {
  useEffect(() => {
    document.documentElement.classList.add("cv-page");
    return () => document.documentElement.classList.remove("cv-page");
  }, []);

  return (
    <main className="relative min-h-screen bg-white text-slate-900 print:bg-white">
      <div className="max-w-4xl mx-auto p-8 md:p-12 print:p-6">
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Wróć na stronę
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            <Download size={14} />
            Pobierz jako PDF
          </button>
        </div>

        <header className="mb-8 pb-6 border-b-2 border-slate-200 print:border-slate-300">
          <h1 className="text-4xl md:text-5xl font-bold mb-1 print:text-3xl">
            {PERSONAL.name}
          </h1>
          <p className="text-xl text-purple-600 font-medium mb-4 print:text-lg">
            {PERSONAL.role}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <Mail size={14} className="text-slate-400" />
              {PERSONAL.email}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Github size={14} className="text-slate-400" />
              {PERSONAL.github}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe size={14} className="text-slate-400" />
              {PERSONAL.website}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />
              {PERSONAL.location}
            </span>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-3 flex items-center gap-2">
            <Sparkles size={14} />
            Profil
          </h2>
          <p className="text-slate-700 leading-relaxed">{SUMMARY}</p>
        </section>

        <section className="mb-8 grid md:grid-cols-2 gap-x-8 gap-y-4">
          <div className="md:col-span-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-3">
              Umiejętności
            </h2>
          </div>
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <p className="font-semibold text-slate-900 mb-1.5">{category}</p>
              <p className="text-sm text-slate-600">{items.join(" · ")}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-4">
            Projekty
          </h2>
          <div className="space-y-5">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="pb-5 border-b border-slate-100 last:border-b-0 print:break-inside-avoid"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 className="font-bold text-slate-900">{p.name}</h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {p.period}
                  </span>
                </div>
                {p.context && (
                  <p className="text-xs text-purple-600 italic mb-1">
                    {p.context}
                  </p>
                )}
                <p className="text-sm text-slate-700 leading-relaxed mb-2">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 items-center">
                  <span className="text-xs text-slate-500 font-mono">
                    {p.tech.join(" · ")}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 font-mono">
                    {p.url}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8 print:break-inside-avoid">
          <h2 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-4">
            Doświadczenie
          </h2>
          <div className="space-y-3">
            {EXPERIENCE_TIMELINE.map((item) => (
              <div key={item.year} className="flex gap-4">
                <span className="font-bold text-slate-900 shrink-0 w-12">
                  {item.year}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-3">
            Co teraz
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Aktywnie szukam pierwszej pracy lub stażu jako frontend developer.
            Uczę się głębszego TypeScripta, Server Components w React 19 oraz
            backendu w Node.js + PostgreSQL. Otwarty na różne formy współpracy
            (UoP, B2B, umowa zlecenie).
          </p>
        </section>

        <div className="mt-10 print:hidden">
          <ShareQR />
        </div>

        <footer className="mt-12 pt-6 border-t border-slate-200 text-center text-xs text-slate-400 print:text-slate-500">
          <p>
            Wygenerowane z {PERSONAL.website} ·{" "}
            <span className="font-mono">
              {new Date().toLocaleDateString("pl-PL")}
            </span>
          </p>
        </footer>
      </div>
    </main>
  );
}
