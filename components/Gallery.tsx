"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";

type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  gradient: string;
  emoji: string;
  date?: string;
};

const items: GalleryItem[] = [
  {
    id: "hack-the-tech",
    title: "Hack the Tech 2026",
    caption: "Demo day Sentra AI — pierwszy raz na scenie z własnym projektem.",
    gradient: "from-orange-500 to-pink-600",
    emoji: "🏆",
    date: "Kwiecień 2026",
  },
  {
    id: "setup",
    title: "Mój setup",
    caption: "Tu się dzieje cała magia. Tu też pewnie po pizzy są okruszki.",
    gradient: "from-purple-600 to-pink-600",
    emoji: "🖥️",
    date: "2026",
  },
  {
    id: "praca-inz",
    title: "Obrona pracy inżynierskiej",
    caption: "Ten moment kiedy 4 lata pracy schodzą do 15 minut prezentacji.",
    gradient: "from-cyan-500 to-teal-500",
    emoji: "🎓",
    date: "Wrzesień 2025",
  },
  {
    id: "rapidsoc-team",
    title: "Team Rapidsoc",
    caption: "Konkursowe pizza, kawa i deadline o 23:59. Klasyk.",
    gradient: "from-blue-600 to-cyan-500",
    emoji: "⚡",
    date: "Marzec 2026",
  },
  {
    id: "vps",
    title: "Pierwszy własny serwer",
    caption: "Moment, gdy SSH zaakceptował klucz pierwszy raz. Magia.",
    gradient: "from-green-500 to-emerald-600",
    emoji: "🖧",
    date: "2025",
  },
  {
    id: "code-night",
    title: "Sesja code night",
    caption: "Niektóre projekty rodzą się o 2:00 w nocy. Ten też.",
    gradient: "from-indigo-600 to-purple-600",
    emoji: "🌙",
    date: "2026",
  },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setOpen((i) =>
          i === null ? null : (i - 1 + items.length) % items.length
        );
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-purple-400 mb-2">
            {"// gallery"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Kilka chwil</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Konkursy, projekty, momenty. Klikaj.
            <span className="text-[11px] block mt-2 font-mono text-slate-600">
              Tymczasowo grafiki zastępcze - dorzucę prawdziwe zdjęcia.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative aspect-square rounded-2xl overflow-hidden glass cursor-pointer"
              aria-label={`Otwórz: ${item.title}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`}
              />
              <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-500">
                {item.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-white font-semibold text-sm truncate">
                  {item.title}
                </p>
                {item.date && (
                  <p className="text-white/70 text-[10px] font-mono">
                    {item.date}
                  </p>
                )}
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon size={12} className="text-white" />
              </div>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-[11px] font-mono text-slate-600 mt-6">
          Click - lightbox · Escape - close · ← → - navigation
        </p>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Zamknij"
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass glass-hover flex items-center justify-center"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) =>
                  i === null ? null : (i - 1 + items.length) % items.length
                );
              }}
              aria-label="Poprzednie"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass glass-hover flex items-center justify-center"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => (i === null ? null : (i + 1) % items.length));
              }}
              aria-label="Następne"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass glass-hover flex items-center justify-center"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={open}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <div
                className={`aspect-video rounded-3xl bg-gradient-to-br ${items[open].gradient} flex items-center justify-center text-9xl shadow-2xl`}
              >
                {items[open].emoji}
              </div>
              <div className="mt-6 glass rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-2">
                  <Camera size={16} className="text-purple-400 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">{items[open].title}</h3>
                    {items[open].date && (
                      <p className="text-xs text-slate-500 font-mono">
                        {items[open].date}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {items[open].caption}
                </p>
                <p className="mt-3 text-[10px] font-mono text-slate-600 text-right">
                  {open + 1} / {items.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
