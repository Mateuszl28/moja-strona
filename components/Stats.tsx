import Reveal from "./Reveal";
import { stats } from "@/lib/stats";

// Pokazuje się tylko, gdy są prawdziwe liczby (lib/stats).
export default function Stats() {
  if (stats.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <Reveal>
        <dl className="grid gap-8 border-y border-[var(--line)] py-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="font-display text-5xl tabular-nums">{s.value}</dt>
              <dd className="mt-2 text-sm text-[var(--ink-soft)]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
