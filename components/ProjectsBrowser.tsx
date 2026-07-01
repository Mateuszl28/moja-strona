"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import { categories } from "@/lib/projects";
import ProjectsGrid from "./ProjectsGrid";

// Zakładki kategorii + filtrowanie po stronie klienta. "Wszystkie" jako domyślny widok.
const ALL = "Wszystkie";
const tabs = [ALL, ...categories] as const;

export default function ProjectsBrowser({ items }: { items: Project[] }) {
  const [active, setActive] = useState<string>(ALL);

  const filtered =
    active === ALL ? items : items.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Kategorie projektów"
        className="flex flex-wrap gap-2"
      >
        {tabs.map((t) => {
          const isActive = t === active;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                isActive
                  ? "border-accent/40 bg-accent/15 text-[var(--ink)]"
                  : "border-[var(--line)] text-[var(--ink-soft)] hover:border-accent/30 hover:text-[var(--ink)]"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <ProjectsGrid items={filtered} />
      </div>
    </div>
  );
}
