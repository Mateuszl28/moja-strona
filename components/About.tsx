"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, BookOpen, Coffee } from "lucide-react";

const facts = [
  {
    icon: Code2,
    title: "Lubię budować",
    text: "Najwięcej uczę się przy projektach. Ta strona to jeden z nich.",
  },
  {
    icon: Rocket,
    title: "Frontend",
    text: "React, Next.js, TypeScript, Tailwind. Tu spędzam większość czasu.",
  },
  {
    icon: BookOpen,
    title: "Wciąż się uczę",
    text: "Każdy projekt to nowe pytania. Lubię to.",
  },
  {
    icon: Coffee,
    title: "Otwarty na feedback",
    text: "Jeśli widzisz coś co mogę zrobić lepiej — daj znać.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-purple-400 mb-2">{"// 01."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            O <span className="text-gradient">mnie</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Kilka rzeczy, które warto o mnie wiedzieć
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl blur-2xl opacity-50 animate-pulse" />
              <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-1">
                <div className="w-full h-full rounded-3xl bg-[#0a0a0f] flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 grid-pattern opacity-20" />
                  <span className="relative font-mono text-8xl font-bold text-gradient">
                    ML
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-slate-300 text-lg leading-relaxed"
          >
            <p>
              Cześć! Jestem{" "}
              <span className="text-white font-semibold">Mateusz</span> —
              uczę się programowania i powoli buduję rzeczy, które mają sens.
            </p>
            <p>
              Pracuję głównie we frontendzie:{" "}
              <span className="text-purple-400">React</span>,{" "}
              <span className="text-pink-400">Next.js</span>, TypeScript,
              Tailwind. Po godzinach eksperymentuję z nowymi narzędziami,
              czytam dokumentację i pakuję się w projekty, które mnie czegoś
              uczą.
            </p>
            <p>
              Nie udaję, że umiem wszystko — wręcz przeciwnie.{" "}
              <span className="text-white font-semibold">
                Jestem na początku drogi
              </span>
              , ale mocno mi na niej zależy. Jeśli masz fajny pomysł albo
              chcesz po prostu pogadać o kodzie — pisz.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass glass-hover rounded-2xl p-6 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center mb-4">
                <fact.icon size={22} className="text-purple-400" />
              </div>
              <h3 className="font-semibold mb-2">{fact.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {fact.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
