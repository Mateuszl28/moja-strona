import type { Metadata } from "next";
import Solutions from "@/components/Solutions";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Ready-made solutions to buy — landings, templates and themes for a fast start.",
  alternates: {
    canonical: "/en/shop",
    languages: { "pl-PL": "/sklep", en: "/en/shop" },
  },
};

export default function EnShopPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Shop
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Ready-made solutions
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Don&apos;t want to wait for a project from scratch? Grab a ready one
            — a fast start, ready to personalize and deploy.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        <Solutions en />
      </section>
    </main>
  );
}
