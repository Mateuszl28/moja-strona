import type { Metadata } from "next";
import Packages from "@/components/Packages";
import QuoteCalculator from "@/components/QuoteCalculator";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Wycena",
  description:
    "Policz orientacyjny koszt swojego projektu — strona, sklep lub aplikacja. Interaktywny kalkulator wyceny Mateusza Łagockiego.",
  alternates: { canonical: "/wycena" },
};

// Dane strukturalne FAQ — szansa na rich results w Google.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function WycenaPage() {
  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

      <Packages />

      <section className="mx-auto max-w-content px-6 pb-16 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Kalkulator
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Policz dokładnie
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
            Złóż wycenę z&nbsp;klocków — rodzaj projektu, podstrony i&nbsp;funkcje.
            Kwota liczy się na&nbsp;bieżąco.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-10">
            <QuoteCalculator />
          </div>
        </Reveal>
      </section>

      <Faq />
    </main>
  );
}
