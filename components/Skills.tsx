"use client";

import { motion } from "framer-motion";
import SectionNumber from "./SectionNumber";

type Skill = {
  name: string;
  level: number;
  color: string;
};

const categories: { title: string; emoji: string; skills: Skill[] }[] = [
  {
    title: "Frontend",
    emoji: "🎨",
    skills: [
      { name: "HTML & CSS", level: 90, color: "from-orange-500 to-red-500" },
      { name: "JavaScript", level: 80, color: "from-yellow-400 to-orange-500" },
      { name: "TypeScript", level: 65, color: "from-blue-500 to-blue-700" },
      { name: "React", level: 75, color: "from-cyan-400 to-blue-500" },
      { name: "Next.js", level: 65, color: "from-slate-300 to-slate-500" },
      { name: "Tailwind CSS", level: 85, color: "from-cyan-500 to-teal-500" },
    ],
  },
  {
    title: "Backend & Tools",
    emoji: "⚙️",
    skills: [
      { name: "Node.js", level: 55, color: "from-green-500 to-green-700" },
      { name: "Python", level: 50, color: "from-blue-400 to-yellow-400" },
      { name: "Git & GitHub", level: 75, color: "from-orange-500 to-pink-500" },
      { name: "REST API", level: 60, color: "from-purple-500 to-pink-500" },
      { name: "SQL", level: 45, color: "from-blue-600 to-indigo-600" },
      { name: "VS Code", level: 90, color: "from-blue-500 to-purple-500" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <SectionNumber number="02" position="left" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-purple-400 mb-2">{"// 02."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Mój <span className="text-gradient">tech stack</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Narzędzia, których używam na co dzień. Stale powiększam tę listę.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              className="glass rounded-3xl p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">{cat.emoji}</span>
                {cat.title}
              </h3>
              <div className="space-y-5">
                {cat.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-slate-500 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: ci * 0.15 + i * 0.1,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">Aktualnie uczę się:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Framer Motion",
              "PostgreSQL",
              "Prisma",
              "Docker",
              "Testing",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full glass text-sm text-slate-300"
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
