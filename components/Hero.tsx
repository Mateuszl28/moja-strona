"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, Github, Linkedin, Mail } from "lucide-react";
import { useI18n } from "./I18nProvider";

export default function Hero() {
  const { dict } = useI18n();
  const stats = [
    { value: "3+", label: dict.hero.stats.projects },
    { value: "1.5y", label: dict.hero.stats.experience },
    { value: "∞", label: dict.hero.stats.coffee },
  ];
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12"
    >
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-sm text-slate-300">
              {dict.hero.badge}
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
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight"
          >
            <span className="text-slate-400 text-3xl md:text-4xl lg:text-5xl block mb-2 font-medium">
              {dict.hero.greeting}
            </span>
            <span className="text-gradient">Mateusz</span>
            <br />
            <span className="text-gradient">Łagocki</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl lg:max-w-none leading-relaxed"
          >
            {dict.hero.role}{" "}
            <span className="text-purple-400 font-medium">React</span>,{" "}
            <span className="text-pink-400 font-medium">Next.js</span>{" "}
            {dict.hero.and} TypeScript. {dict.hero.learning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 mb-10"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-xl px-3 py-3 text-center"
              >
                <p className="text-2xl md:text-3xl font-bold text-gradient leading-none mb-1">
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
          >
            <a
              href="#projects"
              className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-medium hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5 text-sm"
            >
              {dict.hero.seeProjects}
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded-full glass glass-hover font-medium transition-all text-sm"
            >
              {dict.hero.contactMe}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center lg:justify-start gap-5"
          >
            <a
              href="https://github.com/Mateuszl28"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-500 hover:text-white transition-all hover:-translate-y-1"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-white transition-all hover:-translate-y-1"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:lagockimateusz6@gmail.com"
              aria-label="Email"
              className="text-slate-500 hover:text-white transition-all hover:-translate-y-1"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="order-1 lg:order-2 relative"
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-orange-500/30 rounded-3xl blur-3xl opacity-50 animate-pulse" />

          <div className="relative glass rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 text-xs font-mono text-slate-500">
                mateusz.tsx
              </span>
            </div>

            <pre className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
              <code className="text-slate-300">
                <span className="text-pink-400">const</span>{" "}
                <span className="text-purple-400">developer</span>{" "}
                <span className="text-slate-500">=</span>{" "}
                <span className="text-slate-400">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">name</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-emerald-400">&apos;Mateusz Łagocki&apos;</span>
                <span className="text-slate-400">,</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">role</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-emerald-400">&apos;Junior Frontend Dev&apos;</span>
                <span className="text-slate-400">,</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">stack</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-slate-400">[</span>
                {"\n"}
                {"    "}
                <span className="text-emerald-400">&apos;React&apos;</span>
                <span className="text-slate-400">,</span>{" "}
                <span className="text-emerald-400">&apos;Next.js&apos;</span>
                <span className="text-slate-400">,</span>
                {"\n"}
                {"    "}
                <span className="text-emerald-400">&apos;TypeScript&apos;</span>
                <span className="text-slate-400">,</span>{" "}
                <span className="text-emerald-400">&apos;Tailwind&apos;</span>
                {"\n"}
                {"  "}
                <span className="text-slate-400">],</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">learning</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-orange-400">true</span>
                <span className="text-slate-400">,</span>
                {"\n"}
                {"  "}
                <span className="text-cyan-400">openToWork</span>
                <span className="text-slate-500">:</span>{" "}
                <span className="text-orange-400">true</span>
                <span className="text-slate-400">,</span>
                {"\n"}
                <span className="text-slate-400">{"}"}</span>
                <span className="text-slate-500">;</span>
                <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-type-blink align-middle" />
              </code>
            </pre>
          </div>

          <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 text-xs font-mono text-slate-400 shadow-lg hidden sm:flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            <span>currently coding</span>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-float"
        aria-label="Scroll down"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
