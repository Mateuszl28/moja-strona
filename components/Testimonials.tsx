"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  MessageCircle,
  Sparkles,
} from "lucide-react";

type Testimonial = {
  text: string;
  name: string;
  role: string;
  avatar: string;
  source?: "LinkedIn" | "Email" | "Friend";
};

const testimonials: Testimonial[] = [];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasTestimonials = testimonials.length > 0;

  useEffect(() => {
    if (paused || !hasTestimonials) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, [paused, hasTestimonials]);

  const prev = () =>
    setIdx((i) => (i - 1 + testimonials.length) % testimonials.length);
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

        {!hasTestimonials && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-orange-500/10 rounded-3xl blur-2xl" />
            <div className="relative glass rounded-3xl p-10 md:p-12 text-center">
              <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 items-center justify-center mb-5">
                <MessageCircle size={22} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                <span className="text-gradient">Wkrótce</span> tutaj
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto mb-6">
                Tu pojawią się prawdziwe opinie od osób, z którymi pracowałem
                i uczyłem się. Pracuję nad tym &mdash; chwilę cierpliwości.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-xs font-mono text-slate-400">
                <Sparkles size={12} className="text-purple-400" />
                Zbieram rekomendacje
              </div>
              <p className="mt-8 text-[11px] text-slate-600 leading-relaxed">
                Pracowałeś / uczyłeś się ze mną? Napisz parę zdań przez{" "}
                <a
                  href="#contact"
                  className="text-purple-400 hover:underline"
                >
                  formularz kontaktowy
                </a>{" "}
                lub zostaw wpis w księdze gości &mdash; może trafi tutaj.
              </p>
            </div>
          </motion.div>
        )}

        {hasTestimonials && (
          <>{/* carousel rendered below */}</>
        )}

        {hasTestimonials && t && (

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
        )}

        {hasTestimonials && (
          <p className="text-center text-[11px] font-mono text-slate-600 mt-6">
            {paused ? "⏸ pause" : "▶ auto-play (6s)"} · {idx + 1}/
            {testimonials.length}
          </p>
        )}
      </div>
    </section>
  );
}
