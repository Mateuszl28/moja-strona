import type { Metadata } from "next";
import Packages from "@/components/Packages";
import Audits from "@/components/Audits";
import QuoteCalculator from "@/components/QuoteCalculator";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Website & online store pricing — instant quote",
  description:
    "How much does a website or online store cost? Websites from PLN 450, stores from PLN 1,500. Get an instant estimate in the calculator.",
  alternates: {
    canonical: "/en/quote",
    languages: { "pl-PL": "/wycena", en: "/en/quote" },
  },
};

export default function EnQuotePage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <div className="fade-rise">
          <p className="eyebrow">
            Quote
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Estimate your project
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Pick what you need and the price updates live. It&apos;s a rough
            starting point; we&apos;ll nail the details in a quick chat.
          </p>
        </div>
      </section>

      <Packages en />

      <Audits en />

      <section className="mx-auto max-w-content px-6 pb-16 pt-8">
        <Reveal>
          <p className="eyebrow">
            Calculator
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Get an exact number
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
            Build a quote from blocks — project type, pages and add-ons. The
            amount updates as you go.
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-10">
            <QuoteCalculator en />
          </div>
        </Reveal>
      </section>
    </main>
  );
}
