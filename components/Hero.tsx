"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles size={14} className="text-purple-400" />
          <span className="text-sm text-slate-300">
            Dostępny dla nowych projektów
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          Cześć, jestem <br />
          <span className="text-gradient">Mateusz Łagocki</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-400 mb-4 max-w-3xl mx-auto"
        >
          Początkujący{" "}
          <span className="text-white font-semibold">programista</span>, który
          buduje rzeczy w internecie i uczy się każdego dnia.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-mono text-sm text-slate-500 mb-12"
        >
          {"// "} React • TypeScript • Next.js • Tailwind
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#projects"
            className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-medium hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5"
          >
            Zobacz projekty
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full glass glass-hover font-medium transition-all"
          >
            Skontaktuj się
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="#"
            aria-label="GitHub"
            className="text-slate-500 hover:text-white transition-colors hover:-translate-y-1 inline-block transition-transform"
          >
            <Github size={22} />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-slate-500 hover:text-white transition-colors hover:-translate-y-1 inline-block transition-transform"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="#contact"
            aria-label="Email"
            className="text-slate-500 hover:text-white transition-colors hover:-translate-y-1 inline-block transition-transform"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-float"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
