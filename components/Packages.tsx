"use client";

import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { zl } from "@/lib/pricing";

// Gotowe pakiety — kuratorowane zestawy. Ceny „od" trzymaj spójne z cennikiem
// bazowym (lib/pricing): Start = strona, Firmowy ~ strona rozbudowana, Sklep = sklep.
type Pack = {
  id: string;
  name: string;
  price: number;
  tagline: string;
  features: string[];
  highlighted?: boolean;
};

const packages: Pack[] = [
  {
    id: "start",
    name: "Start",
    price: 450,
    tagline: "Prosta, szybka wizytówka.",
    features: [
      "Strona one-page",
      "Formularz kontaktowy",
      "Responsywność (RWD)",
      "Podstawowe SEO",
      "Wdrożenie na serwer",
    ],
  },
  {
    id: "firmowy",
    name: "Firmowy",
    price: 900,
    tagline: "Rozbudowana strona z treściami.",
    highlighted: true,
    features: [
      "Kilka podstron",
      "System CMS (edycja treści)",
      "Blog / aktualności",
      "Formularz + SEO",
      "Animacje i detale",
      "Wdrożenie na serwer",
    ],
  },
  {
    id: "sklep",
    name: "Sklep",
    price: 1500,
    tagline: "Sprzedawaj online.",
    features: [
      "Katalog i koszyk",
      "Integracja płatności",
      "Konta użytkowników",
      "System CMS",
      "Wdrożenie na serwer",
    ],
  },
];

const summaryFor = (p: Pack) =>
  [
    "Zapytanie o pakiet",
    `• Pakiet: ${p.name} (od ${zl(p.price)})`,
    `• Zawiera: ${p.features.join(", ")}`,
  ].join("\n");

export default function Packages() {
  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Pakiety
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Gotowe pakiety
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
          Wolisz konkret? Wybierz pakiet. A jeśli potrzebujesz czegoś na miarę —
          policz dokładnie w&nbsp;kalkulatorze niżej.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-3 lg:grid-cols-3">
        {packages.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.06} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-6 transition-colors sm:p-7 ${
                p.highlighted
                  ? "border-accent/50 bg-accent/[0.06]"
                  : "border-[var(--line)] bg-[var(--surface)]"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-[var(--paper)]">
                  Najczęściej wybierany
                </span>
              )}

              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">{p.tagline}</p>

              <p className="mt-5 text-3xl font-semibold tracking-tight">
                <span className="text-base font-normal text-[var(--ink-soft)]">
                  od{" "}
                </span>
                {zl(p.price)}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--line)] pt-5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/kontakt"
                onClick={() =>
                  sessionStorage.setItem("wycena_summary", summaryFor(p))
                }
                className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                  p.highlighted
                    ? "bg-[var(--ink)] text-[var(--paper)] hover:-translate-y-0.5"
                    : "border border-[var(--line)] text-[var(--ink)] hover:border-accent/40"
                }`}
              >
                Wybieram {p.name}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
