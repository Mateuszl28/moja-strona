import type { Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function ProjectsGrid({ items }: { items: Project[] }) {
  if (items.length === 0) {
    return (
      <Reveal>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center">
          <p className="text-[var(--ink-soft)]">
            Nowe projekty w drodze — wkrótce pojawią się tutaj.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.title} delay={i * 0.06} className="h-full">
          <ProjectCard project={p} />
        </Reveal>
      ))}
    </div>
  );
}
