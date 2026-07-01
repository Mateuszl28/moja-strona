import type { Metadata } from "next";
import Solutions from "@/components/Solutions";
import Reveal from "@/components/Reveal";
import { getShopProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "In-house apps and ready-made solutions — including an interior design app. Coming soon.",
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
            In-house apps and ready-made solutions. The first product — an
            interior design app — is coming soon. Want to be first? Ask about
            availability.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        <Solutions en items={getShopProducts()} />
      </section>
    </main>
  );
}
