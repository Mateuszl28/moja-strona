import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

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
    <section className="my-10 bg-[#171512] text-[#f3f0e8] [--ink-soft:rgba(243,240,232,0.6)] [--ink:#f3f0e8] [--line:rgba(243,240,232,0.15)]">
      <div className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <SectionHead label="Jak pracuję" title="Od pomysłu do wdrożenia" />

      <ol className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 0.05}>
              <div className="border-t border-[var(--line)] pt-4">
                <span className="font-display text-4xl text-accent-soft tabular-nums">
                  {s.n}
                </span>
                <h3 className="mt-6 text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}
