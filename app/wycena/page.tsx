import type { Metadata } from "next";
import QuoteCalculator from "@/components/QuoteCalculator";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Wycena",
  description:
    "Policz orientacyjny koszt swojego projektu — strona, sklep lub aplikacja. Interaktywny kalkulator wyceny Mateusza Łagockiego.",
  alternates: { canonical: "/wycena" },
};

export default function WycenaPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Wycena
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Policz swój projekt
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Zaznacz, czego potrzebujesz — kwota policzy się na bieżąco. To
            orientacyjny punkt wyjścia; szczegóły dopniemy w&nbsp;rozmowie.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        <Reveal delay={0.06}>
          <QuoteCalculator />
        </Reveal>
      </section>
    </main>
  );
}
