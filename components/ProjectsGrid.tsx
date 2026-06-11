import type { Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function ProjectsGrid({ items }: { items: Project[] }) {
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
