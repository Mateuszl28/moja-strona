"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Linkedin } from "lucide-react";

type Testimonial = {
  text: string;
  name: string;
  role: string;
  avatar: string;
  source?: "LinkedIn" | "Email" | "Friend";
};

const testimonials: Testimonial[] = [
  {
    text: "Mateusz to typ programisty, który nie czeka, aż mu ktoś powie 'zrób to'. Sam łapie problem, sam go rozwiązuje. Robił z nami na konkursie i mocno wyróżniał się focuse'em.",
    name: "Kuba M.",
    role: "Team mate · Hack the Tech 2026",
    avatar: "KM",
    source: "Friend",
  },
  {
    text: "Świetna komunikacja, otwarta głowa i konkretne pytania. Dawał mi feedback dokładnie tam, gdzie był potrzebny — to rzadkość u juniorów.",
    name: "Anna K.",
    role: "Mentor · Frontend",
    avatar: "AK",
    source: "LinkedIn",
  },
  {
    text: "Powierzyłem mu fragment frontu, nie spodziewałem się dopieszczenia detali na tym poziomie. Animacje, responsywność, edge cases — wszystko ogarnięte. Polecam.",
    name: "Tomek R.",
    role: "Lead Dev",
    avatar: "TR",
    source: "LinkedIn",
  },
  {
    text: "Pisaliśmy razem pracę grupową. Mateusz wziął na siebie część techniczną i nie tylko ją skończył w terminie, ale jeszcze nauczył nas paru rzeczy po drodze.",
    name: "Magda W.",
    role: "Studentka informatyki",
    avatar: "MW",
    source: "Email",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, [paused]);

  const prev = () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx((i) => (i + 1) % testimonials.length);

  const t = testimonials[idx];

  return (
    <section
      className="relative py-32 px-6 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-purple-400 mb-2">
            {"// recommendations"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Co o mnie <span className="text-gradient">mówią</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Opinie od ludzi, z którymi miałem przyjemność pracować, uczyć się
            lub konkurować.
          </p>
        </div>

        <div className="relative">
          <div className="glass rounded-3xl p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
            <Quote
              size={36}
              className="text-purple-400/30 mb-6"
              aria-hidden
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8">
                  &quot;{t.text}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white shrink-0">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 font-mono">
                      {t.role}
                    </p>
                  </div>
                  {t.source === "LinkedIn" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a66c2]/20 text-[#3b8de8] text-[10px] font-mono">
                      <Linkedin size={10} />
                      LinkedIn
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              aria-label="Poprzednia opinia"
              className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Opinia ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === idx
                      ? "w-8 bg-gradient-to-r from-purple-500 to-pink-500"
                      : "w-2 bg-white/20 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Następna opinia"
              className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] font-mono text-slate-600 mt-6">
          {paused ? "⏸ pause" : "▶ auto-play (6s)"} · {idx + 1}/
          {testimonials.length}
        </p>
      </div>
    </section>
  );
}
