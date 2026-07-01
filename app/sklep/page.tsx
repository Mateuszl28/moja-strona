import type { Metadata } from "next";
import Solutions from "@/components/Solutions";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Sklep",
  description:
    "Gotowe rozwiązania do kupienia — landingi, szablony i motywy do szybkiego startu.",
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
            Nie chcesz czekać na projekt od zera? Wybierz gotowca — szybki start,
            gotowy do personalizacji i&nbsp;wdrożenia.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-24">
        <Solutions />
      </section>
    </main>
  );
}
