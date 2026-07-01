import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Rozmowa",
    desc: "Poznaję Twój pomysł, cel i zakres. Bez zobowiązań.",
  },
  {
    n: "02",
    title: "Wycena i plan",
    desc: "Ustalamy kwotę, zakres i termin. Wiesz, za co płacisz.",
  },
  {
    n: "03",
    title: "Projekt",
    desc: "Przygotowuję układ i wygląd do Twojej akceptacji.",
  },
  {
    n: "04",
    title: "Realizacja",
    desc: "Buduję i pokazuję postępy — bez znikania na tygodnie.",
  },
  {
    n: "05",
    title: "Wdrożenie",
    desc: "Publikuję, konfiguruję domenę i wspieram po starcie.",
  },
];

export default function Process() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Jak pracuję
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Od pomysłu do wdrożenia
        </h2>
      </Reveal>

      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05} className="h-full">
            <li className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 transition-colors hover:border-accent/30">
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <h3 className="mt-3 font-medium">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                {s.desc}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
