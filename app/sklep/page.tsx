import type { Metadata } from "next";
import Solutions from "@/components/Solutions";
import { getShopProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gotowe strony i aplikacje — sklep",
  description:
    "Gotowe rozwiązania do kupienia online: strona-wizytówka w pakiecie z wdrożeniem na Twojej domenie oraz autorskie aplikacje.",
  alternates: { canonical: "/sklep" },
};

export default function SklepPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <div className="fade-rise">
          <p className="eyebrow">
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
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        <Solutions items={getShopProducts()} />
      </section>
    </main>
  );
}
