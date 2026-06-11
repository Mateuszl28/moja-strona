import Reveal from "./Reveal";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Git",
];

export default function About() {
  return (
    <section id="o-mnie" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <p className="mb-10 font-mono text-sm text-[var(--ink-soft)]">
          01 — O mnie
        </p>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5 text-lg leading-relaxed text-[var(--ink-soft)]">
            <p>
              Jestem frontend developerem, którego napędza budowanie rzeczy,
              z&nbsp;których ludziom wygodnie się korzysta. Lubię, gdy interfejs
              jest prosty, szybki i&nbsp;po prostu działa.
            </p>
            <p>
              Uczę się przez praktykę — od pracy inżynierskiej, przez projekty
              konkursowe, po własne eksperymenty. Stale dokładam nowe rzeczy do
              warsztatu i&nbsp;dbam o&nbsp;detal oraz dostępność.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <h3 className="mb-4 text-sm font-medium text-[var(--ink)]">
              Czym pracuję
            </h3>
            <ul className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-[var(--line)] bg-[var(--paper-soft)] px-3 py-1.5 text-sm text-[var(--ink-soft)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
