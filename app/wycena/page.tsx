import type { Metadata } from "next";
import Packages from "@/components/Packages";
import Audits from "@/components/Audits";
import QuoteCalculator from "@/components/QuoteCalculator";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Cennik stron internetowych i sklepów — wycena online",
  description:
    "Ile kosztuje strona internetowa lub sklep? Strona od 450 zł, sklep od 1500 zł. Policz dokładną wycenę w kalkulatorze online, bez zobowiązań.",
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
        <div className="fade-rise">
          <p className="eyebrow">
            Wycena
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Policz swój projekt
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Zaznacz, czego potrzebujesz — kwota policzy się na bieżąco. To
            orientacyjny punkt wyjścia; szczegóły dopniemy w&nbsp;rozmowie.
          </p>
        </div>
      </section>

      <Packages />

      <Audits />

      <section className="mx-auto max-w-content px-6 pb-16 pt-8">
        <Reveal>
          <p className="eyebrow">
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
