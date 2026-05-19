import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Code2, Sparkles, Target } from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Teraz — Mateusz Łagocki",
  description:
    "Co aktualnie robię, czego się uczę, nad czym pracuję. Inspirowane stroną /now Dereka Siversa.",
};

const lastUpdated = "maj 2026";

const sections = [
  {
    icon: Code2,
    title: "Nad czym pracuję",
    items: [
      "Rozwijam to portfolio (Next.js 14, TypeScript, Tailwind)",
      "Eksperymenty z integracją AI (Gemini, OpenAI) w aplikacjach webowych",
      "Doszlifowywanie projektów konkursowych",
    ],
  },
  {
    icon: Sparkles,
    title: "Czego się uczę",
    items: [
      "Głębszego TypeScripta - generyki, utility types, type narrowing",
      "Server Components i React 19",
      "Podstaw testowania (Vitest, Playwright)",
    ],
  },
  {
    icon: BookOpen,
    title: "Co czytam / oglądam",
    items: [
      "Dokumentacja Next.js (znowu, bo jest dobra)",
      "Theo - t3.gg na YouTube",
      "Artykuły z Smashing Magazine i CSS-Tricks",
    ],
  },
  {
    icon: Target,
    title: "Cele na najbliższe miesiące",
    items: [
      "Zbudować 2 projekty open-source warte pokazania",
      "Wejść głębiej w backend (Node.js + Postgres + Prisma)",
      "Znaleźć pierwszą pracę / staż jako developer",
    ],
  },
];

export default function NowPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Wróć na stronę główną
        </Link>

        <header className="mb-16">
          <p className="font-mono text-sm text-purple-400 mb-2">/teraz</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Teraz <span className="text-gradient">aktualnie</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Migawka tego, co teraz zajmuje moją głowę. Inspirowane stroną{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
            >
              /now
            </a>{" "}
            Dereka Siversa.
          </p>
          <p className="text-xs text-slate-500 mt-3 font-mono">
            Ostatnia aktualizacja: {lastUpdated}
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <section.icon size={18} className="text-purple-400" />
                </div>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-2 text-slate-300">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-purple-400 font-mono shrink-0">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-16 p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5">
          <p className="text-sm text-slate-300 leading-relaxed">
            Ta strona zmienia się co kilka tygodni. Jeśli czytasz to po jakimś
            czasie — być może już skupiam się na czymś innym. To OK. Idea{" "}
            <span className="text-white">/now</span> polega na pokazywaniu
            aktualnego stanu, nie historii.
          </p>
        </div>
      </div>
    </main>
  );
}
