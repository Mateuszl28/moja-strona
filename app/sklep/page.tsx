import type { Metadata } from "next";
import Solutions from "@/components/Solutions";
import Reveal from "@/components/Reveal";
import { getShopProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sklep",
  description:
    "Gotowe rozwiązania i autorskie aplikacje — m.in. aplikacja do projektowania wnętrz. Wkrótce dostępne.",
  alternates: { canonical: "/sklep" },
};

export default function SklepPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Sklep
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Gotowe rozwiązania
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Autorskie aplikacje i&nbsp;gotowe rozwiązania. Pierwszy produkt —
            aplikacja do projektowania wnętrz — pojawi się tu wkrótce. Chcesz
            wiedzieć pierwszy? Zapytaj o&nbsp;dostępność.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        <Solutions items={getShopProducts()} />
      </section>
    </main>
  );
}
