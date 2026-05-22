"use client";

import { motion } from "framer-motion";
import {
  Music,
  Film,
  Dumbbell,
  BookOpen,
  Gamepad2,
  Camera,
} from "lucide-react";

type Hobby = {
  icon: typeof Music;
  title: string;
  description: string;
  gradient: string;
};

const hobbies: Hobby[] = [
  {
    icon: Music,
    title: "Muzyka",
    description:
      "Wieczne tło do kodowania. Trochę elektronicznej, trochę indie. Spotify zna mnie lepiej niż ja sam.",
    gradient: "from-purple-600 to-pink-600",
  },
  {
    icon: Dumbbell,
    title: "Siłka",
    description:
      "Kilka razy w tygodniu — bo mózg działa lepiej jak ciało nie zardzewieje przy biurku.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Gamepad2,
    title: "Gry",
    description:
      "Od czasu do czasu coś single-player. Lubię gry z dobrym story, eksperymentalne mechaniki.",
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    icon: Film,
    title: "Filmy / seriale",
    description:
      "Sci-fi, dokumenty technologiczne, czasem coś polskiego dla odprężenia.",
    gradient: "from-indigo-600 to-purple-600",
  },
  {
    icon: BookOpen,
    title: "Czytanie",
    description:
      "Bardziej non-fiction niż fiction. Programowanie, biznes, psychologia. Powoli, ale konsekwentnie.",
    gradient: "from-green-500 to-emerald-600",
  },
  {
    icon: Camera,
    title: "Fotografia",
    description:
      "Telefonem, bez ambicji. Lubię łapać momenty bardziej niż obrazy.",
    gradient: "from-pink-600 to-rose-500",
  },
];

export default function Hobby() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-purple-400 mb-2">
            {"// off-code"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Co robię <span className="text-gradient">poza kodem</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Bo programista to nie tylko programowanie. Tu kilka rzeczy które
            mnie ładują albo po prostu lubię.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hobbies.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass glass-hover rounded-2xl p-6 transition-all hover:-translate-y-1"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${h.gradient} flex items-center justify-center mb-4`}
              >
                <h.icon size={18} className="text-white" />
              </div>
              <h3 className="font-bold mb-2">{h.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {h.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
