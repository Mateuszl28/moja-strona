"use client";

const techList = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "Git",
  "GitHub",
  "HTML5",
  "CSS3",
  "Framer Motion",
  "REST API",
  "PostgreSQL",
  "Vercel",
];

export default function TechMarquee() {
  return (
    <section
      aria-label="Tech stack"
      className="relative py-12 overflow-hidden border-y border-white/5"
    >
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0f] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...techList, ...techList].map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="text-2xl md:text-3xl font-bold font-mono text-slate-700 hover:text-gradient transition-colors duration-300 flex items-center gap-8"
          >
            {tech}
            <span className="text-purple-500/40">·</span>
          </span>
        ))}
      </div>
    </section>
  );
}
