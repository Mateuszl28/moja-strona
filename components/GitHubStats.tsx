"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

const GITHUB_USERNAME = "Mateuszl28";

const statsUrl = `https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=transparent&hide_border=true&title_color=a855f7&icon_color=ec4899&text_color=cbd5e1&hide=contribs,prs&include_all_commits=true&count_private=true`;
const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&theme=transparent&hide_border=true&title_color=a855f7&text_color=cbd5e1&langs_count=8`;
const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${GITHUB_USERNAME}&theme=transparent&hide_border=true&background=00000000&ring=a855f7&fire=ec4899&currStreakLabel=a855f7&sideLabels=cbd5e1&dates=94a3b8&sideNums=cbd5e1&currStreakNum=ffffff`;

export default function GitHubStats() {
  return (
    <section id="github" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-purple-400 mb-2">{"// 04."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Aktywność na <span className="text-gradient">GitHubie</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Statystyki ładowane na żywo z mojego profilu.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 flex items-center justify-center min-h-[200px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={statsUrl}
              alt="GitHub stats"
              className="max-w-full h-auto"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass rounded-2xl p-6 flex items-center justify-center min-h-[200px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={langsUrl}
              alt="Top languages"
              className="max-w-full h-auto"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass rounded-2xl p-6 flex items-center justify-center min-h-[200px] mb-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={streakUrl}
            alt="GitHub streak"
            className="max-w-full h-auto"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass glass-hover text-sm font-medium transition-all"
          >
            <Github size={16} />
            Zobacz pełny profil
          </a>
        </motion.div>
      </div>
    </section>
  );
}
