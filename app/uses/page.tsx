import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Cpu,
  Monitor,
  Keyboard,
  Code2,
  Palette,
  Terminal,
  Music,
  Cloud,
  Star,
  ExternalLink,
} from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";

export const metadata: Metadata = {
  title: "Uses — czym pracuję",
  description:
    "Mój stack — sprzęt, software, narzędzia. Co używam na co dzień jako junior frontend developer.",
};

type Item = {
  name: string;
  detail: string;
  url?: string;
  recommended?: boolean;
};

type Section = {
  icon: typeof Cpu;
  title: string;
  color: string;
  items: Item[];
};

const sections: Section[] = [
  {
    icon: Cpu,
    title: "Sprzęt",
    color: "from-purple-600 to-pink-600",
    items: [
      {
        name: "Laptop",
        detail: "Dell / własny — średniak. Wystarczy do Next.js, Figmy, paru zakładek.",
      },
      {
        name: "Monitor",
        detail: "Drugi ekran 24'' — bez niego nie wyobrażam sobie pracy.",
      },
      {
        name: "Klawiatura",
        detail: "Standardowa mechaniczna, brown switche. Cisza, ale dobra reakcja.",
      },
      {
        name: "Mysz",
        detail: "Logitech bezprzewodowa. Nic fancy, działa.",
      },
      {
        name: "Słuchawki",
        detail: "Nauszne ANC. Codzienność jest głośna, kod wymaga ciszy.",
      },
      {
        name: "Phone",
        detail: "Android — do testów mobile responsywności (i Spotify).",
      },
    ],
  },
  {
    icon: Code2,
    title: "Edytor / IDE",
    color: "from-blue-600 to-cyan-500",
    items: [
      {
        name: "VS Code",
        detail: "Mój dom. Z motywem Tokyo Night.",
        url: "https://code.visualstudio.com/",
        recommended: true,
      },
      {
        name: "Font",
        detail: "JetBrains Mono — ligatury są bardzo satysfakcjonujące.",
        url: "https://www.jetbrains.com/lp/mono/",
        recommended: true,
      },
      {
        name: "Extensions essentials",
        detail: "Prettier, ESLint, GitLens, Error Lens, Tailwind IntelliSense, Path Intellisense.",
      },
      {
        name: "AI Assistant",
        detail: "Claude przez API + GitHub Copilot. Używam mądrze (nie do generowania całego kodu).",
      },
    ],
  },
  {
    icon: Terminal,
    title: "Terminal / shell",
    color: "from-green-500 to-emerald-600",
    items: [
      {
        name: "Windows Terminal + WSL2",
        detail: "Ubuntu pod WSL. Najlepsze połączenie Windows UX + Linux CLI.",
        recommended: true,
      },
      {
        name: "Shell",
        detail: "Bash, czasem zsh. Aliasy dla git i npm.",
      },
      {
        name: "Git",
        detail: "Bezpośrednio w CLI. UI tylko w VS Code dla diff'ów.",
      },
    ],
  },
  {
    icon: Cloud,
    title: "Hosting / chmura",
    color: "from-orange-500 to-red-500",
    items: [
      {
        name: "Własny VPS Ubuntu",
        detail: "Tę stronę hostuję sam — nginx + PM2 + Node.js 20.",
        recommended: true,
      },
      {
        name: "Vercel",
        detail: "Dla szybkich projektów i prototypów (Sentra AI, Rapidsoc).",
        url: "https://vercel.com/",
      },
      {
        name: "GitHub",
        detail: "Cały kod, prywatne i publiczne projekty.",
        url: "https://github.com/Mateuszl28",
      },
      {
        name: "Domena",
        detail: "Wciąż na IP — domena na liście TODO.",
      },
    ],
  },
  {
    icon: Palette,
    title: "Design / projektowanie",
    color: "from-pink-600 to-rose-500",
    items: [
      {
        name: "Figma",
        detail: "Do projektowania interfejsów + odczytywania od designerów.",
        url: "https://figma.com/",
        recommended: true,
      },
      {
        name: "Excalidraw",
        detail: "Diagramy architektury, szkice. Ręcznie rysowany vibe.",
        url: "https://excalidraw.com/",
      },
      {
        name: "Color palette",
        detail: "Coolors.co + Tailwind defaults. Dla portfolio: purple + pink + orange.",
      },
    ],
  },
  {
    icon: Monitor,
    title: "Narzędzia produktywności",
    color: "from-cyan-500 to-blue-600",
    items: [
      {
        name: "Notion",
        detail: "Notatki, plan dnia, projekty side.",
      },
      {
        name: "Spotify",
        detail: "Lofi do kodowania, electro do gry, polish dla nostalgii.",
        url: "https://spotify.com/",
      },
      {
        name: "Bruno",
        detail: "Testowanie API. Lepsze niż Postman bo offline-first.",
        url: "https://www.usebruno.com/",
      },
    ],
  },
];

export default function UsesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundBlobs />

      <div className="relative max-w-4xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={16} />
          Wróć na stronę główną
        </Link>

        <header className="mb-16">
          <p className="font-mono text-sm text-purple-400 mb-2">/uses</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Czym <span className="text-gradient">pracuję</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Trend rozpoczęty przez{" "}
            <a
              href="https://uses.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              uses.tech
            </a>{" "}
            — moja konfiguracja sprzętu i softu. Aktualizowane co jakiś czas.
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}
                >
                  <section.icon size={18} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>

              <div className="space-y-3">
                {section.items.map((item) => {
                  const Wrapper = item.url
                    ? ({ children }: { children: React.ReactNode }) => (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block glass glass-hover rounded-xl p-4 transition-all hover:-translate-y-0.5 group"
                        >
                          {children}
                        </a>
                      )
                    : ({ children }: { children: React.ReactNode }) => (
                        <div className="glass rounded-xl p-4">{children}</div>
                      );

                  return (
                    <Wrapper key={item.name}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-white">
                              {item.name}
                            </h3>
                            {item.recommended && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-purple-500/20 text-[9px] font-mono text-purple-300">
                                <Star size={8} fill="currentColor" />
                                top
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                        {item.url && (
                          <ExternalLink
                            size={14}
                            className="text-slate-500 group-hover:text-white transition-colors shrink-0 mt-1"
                          />
                        )}
                      </div>
                    </Wrapper>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 glass rounded-2xl p-6 text-center">
          <p className="text-sm text-slate-400">
            Lista się zmienia. Jak coś nowego wleci do mojego workflow —{" "}
            <Link
              href="/blog"
              className="text-purple-400 hover:underline"
            >
              napiszę o tym
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
