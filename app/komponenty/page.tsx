"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Copy,
  Sparkles,
  Loader2,
  Bell,
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  Code,
} from "lucide-react";
import BackgroundBlobs from "@/components/BackgroundBlobs";

type ComponentItem = {
  id: string;
  title: string;
  description: string;
  code: string;
  render: () => React.ReactNode;
};

const components: { category: string; items: ComponentItem[] }[] = [
  {
    category: "Buttons",
    items: [
      {
        id: "btn-primary",
        title: "Primary gradient button",
        description: "Główne CTA z gradientem, hover effect, podniesienie",
        code: `<button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5">
  Kliknij mnie
</button>`,
        render: () => (
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5">
            Kliknij mnie
          </button>
        ),
      },
      {
        id: "btn-glass",
        title: "Glass button",
        description: "Subtelny, glass effect, do akcji secondary",
        code: `<button className="px-6 py-3 rounded-full glass glass-hover font-medium transition-all">
  Secondary
</button>`,
        render: () => (
          <button className="px-6 py-3 rounded-full glass glass-hover font-medium transition-all">
            Secondary
          </button>
        ),
      },
      {
        id: "btn-icon",
        title: "Icon button (round)",
        description: "Mały, okrągły, do social linków lub akcji",
        code: `<button className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center">
  <Sparkles size={16} />
</button>`,
        render: () => (
          <button className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center">
            <Sparkles size={16} className="text-purple-400" />
          </button>
        ),
      },
    ],
  },
  {
    category: "Badges & Pills",
    items: [
      {
        id: "badge-live",
        title: "Live status badge",
        description: "Pulsująca kropka + tekst — używam dla statusów online",
        code: `<span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
  </span>
  Live
</span>`,
        render: () => (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Live
          </span>
        ),
      },
      {
        id: "badge-tech",
        title: "Tech tag",
        description: "Monospace badge dla technologii / tagów",
        code: `<span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400">
  TypeScript
</span>`,
        render: () => (
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400">
              TypeScript
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400">
              React
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-slate-400">
              Next.js
            </span>
          </div>
        ),
      },
    ],
  },
  {
    category: "Alerts & feedback",
    items: [
      {
        id: "alert-success",
        title: "Success alert",
        description: "Pozytywne potwierdzenie akcji",
        code: `<div className="flex gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-300">
  <CheckCircle2 size={18} />
  <span>Wszystko OK!</span>
</div>`,
        render: () => (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-sm text-green-300">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            <span>Wiadomość wysłana!</span>
          </div>
        ),
      },
      {
        id: "alert-error",
        title: "Error alert",
        description: "Komunikat o błędzie",
        code: `<div className="flex gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300">
  <AlertCircle size={18} />
  <span>Coś poszło nie tak.</span>
</div>`,
        render: () => (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>Coś poszło nie tak.</span>
          </div>
        ),
      },
      {
        id: "alert-info",
        title: "Info banner",
        description: "Informacja kontekstowa",
        code: `<div className="flex gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-200">
  <Info size={18} />
  <span>Heads up — to jest info.</span>
</div>`,
        render: () => (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-200">
            <Info size={16} className="shrink-0 mt-0.5" />
            <span>Heads up — to jest info.</span>
          </div>
        ),
      },
    ],
  },
  {
    category: "Loading states",
    items: [
      {
        id: "loading-spinner",
        title: "Loading spinner",
        description: "Klasyczny spinner z Lucide + tailwind animate-spin",
        code: `<div className="flex items-center gap-2 text-sm text-slate-300">
  <Loader2 size={18} className="animate-spin text-purple-400" />
  Ładowanie...
</div>`,
        render: () => (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Loader2 size={18} className="animate-spin text-purple-400" />
            Ładowanie...
          </div>
        ),
      },
      {
        id: "loading-dots",
        title: "Bouncing dots",
        description: "3 kropki podskakujące - bardzo subtelne",
        code: `<div className="flex items-center gap-1.5">
  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
  <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:-0.15s]" />
  <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" />
</div>`,
        render: () => (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" />
          </div>
        ),
      },
    ],
  },
  {
    category: "Cards",
    items: [
      {
        id: "card-glass",
        title: "Glass card",
        description: "Bazowa karta z glass effect, glass-hover dla interaktywności",
        code: `<div className="glass glass-hover rounded-2xl p-6 max-w-sm">
  <h3 className="font-bold mb-2">Tytuł karty</h3>
  <p className="text-sm text-slate-400">Krótka treść.</p>
</div>`,
        render: () => (
          <div className="glass glass-hover rounded-2xl p-6 max-w-sm">
            <h3 className="font-bold mb-2">Tytuł karty</h3>
            <p className="text-sm text-slate-400">
              Glass effect, hover daje subtelne podniesienie.
            </p>
          </div>
        ),
      },
      {
        id: "card-gradient-header",
        title: "Card with gradient header",
        description: "Karta z gradientowym headerem - używam w projektach",
        code: `<div className="glass rounded-2xl overflow-hidden max-w-sm">
  <div className="h-24 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl">
    ✨
  </div>
  <div className="p-5">
    <h3 className="font-bold">Card</h3>
  </div>
</div>`,
        render: () => (
          <div className="glass rounded-2xl overflow-hidden max-w-sm">
            <div className="h-24 bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl">
              ✨
            </div>
            <div className="p-5">
              <h3 className="font-bold mb-1">Card with header</h3>
              <p className="text-xs text-slate-400">
                Hero image / kolor / emoji w nagłówku.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    category: "Form elements",
    items: [
      {
        id: "input-text",
        title: "Text input",
        description: "Standardowy input z focus ring",
        code: `<input
  type="text"
  placeholder="Wpisz coś..."
  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm"
/>`,
        render: () => (
          <input
            type="text"
            placeholder="Wpisz coś..."
            className="w-full max-w-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm"
          />
        ),
      },
      {
        id: "toggle",
        title: "Toggle group",
        description: "Toggle dla 2-3 opcji (np. theme, view)",
        code: `<div className="inline-flex items-center gap-1 rounded-full bg-white/5 p-0.5">
  <button className="px-3 py-1.5 rounded-full text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white">
    Active
  </button>
  <button className="px-3 py-1.5 rounded-full text-xs text-slate-400">
    Other
  </button>
</div>`,
        render: () => (
          <div className="inline-flex items-center gap-1 rounded-full bg-white/5 p-0.5">
            <button className="px-3 py-1.5 rounded-full text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              Active
            </button>
            <button className="px-3 py-1.5 rounded-full text-xs text-slate-400">
              Other
            </button>
          </div>
        ),
      },
    ],
  },
];

function CodeBlock({
  code,
  id,
}: {
  code: string;
  id: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-xl bg-black/40 p-4 pr-12 font-mono text-[12px] text-slate-300 leading-relaxed">
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        aria-label="Kopiuj kod"
        className="absolute top-3 right-3 p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
}

export default function ComponentsPage() {
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
          <p className="font-mono text-sm text-purple-400 mb-2">/komponenty</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Moje <span className="text-gradient">komponenty</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            Reusable UI pieces z tego portfolio. Kliknij ikonę kopiowania przy
            kodzie, wklej do swojego projektu, używaj. Wszystko Tailwind +
            Lucide.
          </p>
        </header>

        <div className="space-y-16">
          {components.map((section) => (
            <section key={section.category}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <h2 className="text-2xl font-bold">{section.category}</h2>
              </div>

              <div className="space-y-8">
                {section.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="glass rounded-2xl overflow-hidden"
                  >
                    <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                      <Code size={14} className="text-purple-400 shrink-0" />
                    </div>

                    <div className="p-8 border-b border-white/5 flex items-center justify-center min-h-[120px] bg-black/20">
                      {item.render()}
                    </div>

                    <div className="p-4">
                      <CodeBlock code={item.code} id={item.id} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 glass rounded-2xl p-6 text-center">
          <p className="text-sm text-slate-400">
            Kod tego portfolio jest{" "}
            <a
              href="https://github.com/Mateuszl28/moja-strona"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:underline"
            >
              w pełni open source na GitHubie
            </a>
            . Kopiuj śmiało.
          </p>
        </div>
      </div>
    </main>
  );
}
