"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, BookOpen, Coffee } from "lucide-react";

const facts = [
  {
    icon: Code2,
    title: "Czysty kod",
    text: "Piszę kod, który łatwo czytać i utrzymywać. Bo wiem, że jutro to ja będę go czytał.",
  },
  {
    icon: Rocket,
    title: "Szybko się uczę",
    text: "Każdy dzień to nowa biblioteka, nowy pattern, nowa rzecz do zrozumienia. I to mnie kręci.",
  },
  {
    icon: BookOpen,
    title: "Ciągły rozwój",
    text: "Dokumentacja, tutoriale, projekty side. Wiem, że bycie programistą = nauka przez całe życie.",
  },
  {
    icon: Coffee,
    title: "Pasja, nie zawód",
    text: "Programowanie nie jest dla mnie pracą — jest sposobem rozwiązywania problemów i budowania rzeczy.",
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
              Jestem{" "}
              <span className="text-white font-semibold">
                Mateuszem Łagockim
              </span>{" "}
              — początkującym programistą, który odkrył, że budowanie aplikacji
              i stron internetowych to coś więcej niż tylko zarobek. To sposób
              myślenia.
            </p>
            <p>
              Zacząłem od podstaw HTML i CSS, a teraz buduję projekty w{" "}
              <span className="text-purple-400">React</span> i{" "}
              <span className="text-pink-400">Next.js</span>. Po drodze poznałem
              TypeScript, Tailwind, Git i kilka innych narzędzi, bez których nie
              wyobrażam sobie dzisiaj pracy.
            </p>
            <p>
              Wierzę, że najlepszy sposób na naukę to{" "}
              <span className="text-white font-semibold">
                budowanie prawdziwych rzeczy
              </span>{" "}
              — dlatego cały czas pracuję nad nowymi projektami. Jeśli masz
              pomysł, na którym mógłbym się czegoś nauczyć — odezwij się.
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
