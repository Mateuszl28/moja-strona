import Reveal from "./Reveal";
import { stats } from "@/lib/stats";

// Pokazuje się tylko, gdy są prawdziwe liczby (lib/stats).
export default function Stats() {
  if (stats.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-16">
      <Reveal>
        <dl className="grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="text-4xl font-semibold tracking-tight">{s.value}</dt>
              <dd className="mt-1 text-sm text-[var(--ink-soft)]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
