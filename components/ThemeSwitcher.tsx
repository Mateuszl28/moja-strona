"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useTheme, type Theme } from "./ThemeProvider";

const themes: { id: Theme; name: string; preview: string; description: string }[] = [
  {
    id: "default",
    name: "Default",
    preview: "linear-gradient(135deg, #a855f7, #ec4899, #f97316)",
    description: "Fioletowo-różowy, dark mode",
  },
  {
    id: "synthwave",
    name: "Synthwave",
    preview: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
    description: "Lata 80, neon vibes",
  },
  {
    id: "terminal",
    name: "Terminal",
    preview: "linear-gradient(135deg, #00ff41, #008f11)",
    description: "Zielony na czarnym, hacker style",
  },
  {
    id: "paper",
    name: "Paper",
    preview: "linear-gradient(135deg, #f3e8d8, #cbd5e1)",
    description: "Jasne tło, klasycznie",
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Zmień motyw"
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full glass glass-hover text-xs transition-all"
      >
        <Palette size={12} />
        <span className="hidden sm:inline font-mono text-[11px]">
          {themes.find((t) => t.id === theme)?.name}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-40 w-64 rounded-2xl border border-white/10 bg-[#13131a]/95 backdrop-blur-xl shadow-2xl p-2"
            >
              <p className="px-3 py-2 text-[10px] uppercase tracking-wider font-mono text-slate-500">
                Motyw
              </p>
              {themes.map((t) => {
                const active = t.id === theme;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                      active ? "bg-white/5" : "hover:bg-white/5"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg shrink-0"
                      style={{ background: t.preview }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium ${active ? "text-white" : "text-slate-300"}`}
                      >
                        {t.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {t.description}
                      </p>
                    </div>
                    {active && (
                      <Check size={14} className="text-purple-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
