"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Code, Sparkles, Loader2, Gamepad2 } from "lucide-react";
import SnakeGame from "./SnakeGame";
import TetrisGame from "./TetrisGame";

type Demo = {
  id: string;
  title: string;
  description: string;
  code?: string;
  Render: () => JSX.Element;
  isGame?: boolean;
};

function GradientButton() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5"
    >
      Kliknij mnie ({count})
    </button>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-sm">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      Online
    </span>
  );
}

function AnimatedSparkle() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className="inline-block"
    >
      <Sparkles size={32} className="text-purple-400" />
    </motion.div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-300">
      <Loader2 size={18} className="animate-spin text-purple-400" />
      Ładowanie...
    </div>
  );
}

const demos: Demo[] = [
  {
    id: "gradient-button",
    title: "Gradient Button",
    description: "Przycisk z gradientem i licznikiem kliknięć.",
    code: `function GradientButton() {
  const [count, setCount] = useState(0);
  return (
    <button
      onClick={() => setCount(c => c + 1)}
      className="px-6 py-3 rounded-full
        bg-gradient-to-r from-purple-600 to-pink-600
        hover:-translate-y-0.5 transition-all"
    >
      Kliknij mnie ({count})
    </button>
  );
}`,
    Render: GradientButton,
  },
  {
    id: "pulse-dot",
    title: "Live indicator",
    description: "Pulsujący wskaźnik statusu - klasyk z dashboardów.",
    code: `<span className="relative inline-flex items-center gap-2">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute h-full w-full
      rounded-full bg-green-400 opacity-75" />
    <span className="relative h-2 w-2 rounded-full
      bg-green-500" />
  </span>
  Online
</span>`,
    Render: PulseDot,
  },
  {
    id: "sparkle",
    title: "Spinning sparkle",
    description: "Framer Motion - obrót w nieskończonej pętli.",
    code: `<motion.div
  animate={{ rotate: 360 }}
  transition={{
    duration: 4,
    repeat: Infinity,
    ease: "linear"
  }}
>
  <Sparkles size={32} />
</motion.div>`,
    Render: AnimatedSparkle,
  },
  {
    id: "spinner",
    title: "Loading state",
    description: "Lucide ikona z animate-spin z Tailwinda.",
    code: `<div className="flex items-center gap-2">
  <Loader2 size={18}
    className="animate-spin text-purple-400" />
  Ładowanie...
</div>`,
    Render: LoadingSpinner,
  },
  {
    id: "snake",
    title: "🐍 Snake",
    description: "Klasyczna gra Snake w canvas. Steruj strzałkami. Rekord zapisuje się w localStorage.",
    Render: SnakeGame,
    isGame: true,
  },
  {
    id: "tetris",
    title: "🟦 Tetris",
    description: "Mini Tetris w canvas. Ruchy: ← → ↓, rotacja: ↑ lub spacja.",
    Render: TetrisGame,
    isGame: true,
  },
];

export default function Playground() {
  const [activeId, setActiveId] = useState(demos[0].id);
  const [showCode, setShowCode] = useState(false);
  const active = demos.find((d) => d.id === activeId) ?? demos[0];
  const ActiveRender = active.Render;

  return (
    <section
      id="playground"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-purple-400 mb-2">
            {"// playground"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mini <span className="text-gradient">playground</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Pokaż mi komponent, a pokażę Ci kod. Wybierz demo i kliknij{" "}
            <span className="text-white">&quot;Pokaż kod&quot;</span>.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {demos.map((d) => (
            <button
              key={d.id}
              onClick={() => {
                setActiveId(d.id);
                setShowCode(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-all ${
                activeId === d.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "glass glass-hover text-slate-400 hover:text-white"
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        <div className="glass rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 text-xs font-mono text-slate-500">
                {active.id}.tsx
              </span>
            </div>
            {active.isGame ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-400">
                <Gamepad2 size={12} className="text-purple-400" />
                Mini gra
              </span>
            ) : (
              <button
                onClick={() => setShowCode((s) => !s)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
              >
                {showCode ? (
                  <>
                    <Play size={12} /> Pokaż render
                  </>
                ) : (
                  <>
                    <Code size={12} /> Pokaż kod
                  </>
                )}
              </button>
            )}
          </div>

          <div className="p-8 min-h-[200px] flex flex-col items-center justify-center">
            <p className="text-sm text-slate-400 mb-6 text-center">
              {active.description}
            </p>

            {showCode && active.code ? (
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full overflow-x-auto rounded-xl bg-black/40 p-5 font-mono text-[13px] text-slate-300 leading-relaxed"
              >
                <code>{active.code}</code>
              </motion.pre>
            ) : (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center w-full"
              >
                <ActiveRender />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
