"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[88vh] max-w-content flex-col justify-center px-6 pt-24"
    >
      <motion.p
        className="mb-6 font-mono text-sm text-accent"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Cześć, jestem Mateusz 👋
      </motion.p>

      <motion.h1
        className="max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        Buduję przejrzyste, szybkie interfejsy
        <span className="text-accent"> we frontendzie</span>.
      </motion.h1>

      <motion.p
        className="mt-6 max-w-xl text-lg text-[var(--ink-soft)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        Frontend developer z Polski. Najlepiej czuję się w React, Next.js
        i&nbsp;TypeScript — z naciskiem na detal, dostępność i&nbsp;czysty kod.
      </motion.p>

      <motion.div
        className="mt-10 flex flex-wrap items-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
      >
        <a
          href="#projekty"
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm text-[var(--paper)] transition-transform hover:-translate-y-0.5"
        >
          Zobacz projekty
          <ArrowDownRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          />
        </a>
        <a
          href="#kontakt"
          className="link-underline text-sm text-[var(--ink-soft)] hover:text-[var(--ink)]"
        >
          Napisz do mnie
        </a>
      </motion.div>
    </section>
  );
}
