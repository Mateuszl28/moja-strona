"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import SectionNumber from "./SectionNumber";

const faqs = [
  {
    q: "Czy możesz pracować zdalnie?",
    a: "Tak, w 100%. Mam własne stanowisko, dobre łącze i potrafię pracować samodzielnie. Jestem otwarty na hybrydę i pełne remote, mogę też dojeżdżać do biura w razie potrzeby.",
  },
  {
    q: "Jakie formy zatrudnienia rozważasz?",
    a: "Wszystkie standardowe — umowa o pracę, B2B, umowa zlecenie. Otwarty zarówno na pierwszy pełnoetatowy job, jak i na płatny staż jako trampolinę.",
  },
  {
    q: "W jakim tech stacku najmocniejszy jesteś?",
    a: "Frontend: React, Next.js (App Router), TypeScript, Tailwind CSS. Pracowałem też z Gemini API (integracja AI), własnym backendem na VPS (nginx + PM2) i podstawami Node.js.",
  },
  {
    q: "Czego się aktualnie uczysz?",
    a: "Głębszego TypeScripta, Server Components, backendu w Node.js z Postgres + Prisma, podstaw testowania (Vitest, Playwright). Aktualizuję listę na stronie /teraz.",
  },
  {
    q: "Czy masz portfolio z kodem?",
    a: "Tak — wszystkie moje projekty są na GitHubie (@Mateuszl28). Tę stronę też zbudowałem od zera i jej kod jest publiczny. Możesz zerknąć w „Projekty” i kliknąć logo GitHuba.",
  },
  {
    q: "Jak szybko odpowiadasz na maile?",
    a: "Zwykle tego samego dnia, maksymalnie w 24h. Jeśli zależy Ci na pilnym kontakcie — w command palette (⌘K) jest opcja kopiowania mojego emaila.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="06" position="left" />
      <div className="relative max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-purple-400 mb-2">{"// faq"}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Najczęściej{" "}
            <span className="text-gradient">zadawane pytania</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Krótko, konkretnie. Nie ma odpowiedzi? Zapytaj AI lub napisz.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`glass rounded-2xl overflow-hidden transition-all ${
                  isOpen ? "ring-1 ring-purple-500/30" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      <HelpCircle size={14} />
                    </div>
                    <span
                      className={`text-sm md:text-base font-medium transition-colors ${
                        isOpen ? "text-white" : "text-slate-300"
                      }`}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-slate-500 transition-transform shrink-0 ${
                      isOpen ? "rotate-180 text-purple-400" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 pl-16 text-sm text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
