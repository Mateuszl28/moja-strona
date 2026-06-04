"use client";

import { motion } from "framer-motion";
import SectionNumber from "./SectionNumber";

type Group = {
  title: string;
  note: string;
  items: string[];
};

const groups: Group[] = [
  {
    title: "Na co dzień",
    note: "Tu czuję się pewnie i sięgam po to bez zastanowienia.",
    items: ["HTML & CSS", "JavaScript", "React", "Tailwind CSS", "Git"],
  },
  {
    title: "Coraz lepiej",
    note: "Używam w projektach, wciąż odkrywam głębsze rzeczy.",
    items: ["TypeScript", "Next.js", "Node.js", "REST API"],
  },
  {
    title: "Liznąłem temat",
    note: "Wiem o co chodzi, ale jeszcze trochę przede mną.",
    items: ["Python", "SQL", "PostgreSQL", "Docker"],
  },
];

const learning = ["Server Components", "Prisma", "Testing (Vitest)", "Framer Motion"];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="02" position="left" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-accent-400 mb-2">{"// 02."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Czym <span className="text-gradient">pracuję</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Bez procentów i pasków — po prostu szczerze, gdzie jestem z każdą
            rzeczą.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-semibold mb-1">{group.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-5">
                {group.note}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-slate-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400/70 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row sm:items-center justify-center gap-3 text-center"
        >
          <span className="text-slate-500 text-sm">Teraz siedzę w:</span>
          <div className="flex flex-wrap justify-center gap-2">
            {learning.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full border border-white/10 text-sm text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
