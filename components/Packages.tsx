"use client";

import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { zl } from "@/lib/pricing";

// Gotowe pakiety — kuratorowane zestawy. Ceny „od" trzymaj spójne z cennikiem.
type Pack = {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  tagline: string;
  taglineEn: string;
  features: string[];
  featuresEn: string[];
  highlighted?: boolean;
};

const packages: Pack[] = [
  {
    id: "start",
    name: "Start",
    nameEn: "Starter",
    price: 450,
    tagline: "Prosta, szybka wizytówka.",
    taglineEn: "A simple, fast landing.",
    features: [
      "Strona one-page",
      "Formularz kontaktowy",
      "Responsywność (RWD)",
      "Podstawowe SEO",
      "Wdrożenie na serwer",
    ],
    featuresEn: [
      "One-page site",
      "Contact form",
      "Responsive (RWD)",
      "Basic SEO",
      "Deployment",
    ],
  },
  {
    id: "firmowy",
    name: "Firmowy",
    nameEn: "Business",
    price: 900,
    tagline: "Rozbudowana strona z treściami.",
    taglineEn: "A richer site with content.",
    highlighted: true,
    features: [
      "Kilka podstron",
      "System CMS (edycja treści)",
      "Blog / aktualności",
      "Formularz + SEO",
      "Animacje i detale",
      "Wdrożenie na serwer",
    ],
    featuresEn: [
      "Several pages",
      "CMS (edit content)",
      "Blog / news",
      "Form + SEO",
      "Animations & polish",
      "Deployment",
    ],
  },
  {
    id: "sklep",
    name: "Sklep",
    nameEn: "Store",
    price: 1500,
    tagline: "Sprzedawaj online.",
    taglineEn: "Sell online.",
    features: [
      "Katalog i koszyk",
      "Integracja płatności",
      "Konta użytkowników",
      "System CMS",
      "Wdrożenie na serwer",
    ],
    featuresEn: [
      "Catalog & cart",
      "Payment integration",
      "User accounts",
      "CMS",
      "Deployment",
    ],
  },
];

const summaryFor = (p: Pack, en: boolean) =>
  en
    ? [
        "Package request",
        `• Package: ${p.nameEn} (from ${zl(p.price)})`,
        `• Includes: ${p.featuresEn.join(", ")}`,
      ].join("\n")
    : [
        "Zapytanie o pakiet",
        `• Pakiet: ${p.name} (od ${zl(p.price)})`,
        `• Zawiera: ${p.features.join(", ")}`,
      ].join("\n");

export default function Packages({ en = false }: { en?: boolean }) {
  const contactHref = en ? "/en/contact" : "/kontakt";
  const t = en
    ? {
        eyebrow: "Packages",
        title: "Ready-made packages",
        intro:
          "Prefer something concrete? Pick a package. Need something custom — use the calculator below.",
        popular: "Most popular",
        from: "from",
        choose: (n: string) => `Choose ${n}`,
      }
    : {
        eyebrow: "Pakiety",
        title: "Gotowe pakiety",
        intro:
          "Wolisz konkret? Wybierz pakiet. A jeśli potrzebujesz czegoś na miarę — policz dokładnie w kalkulatorze niżej.",
        popular: "Najczęściej wybierany",
        from: "od",
        choose: (n: string) => `Wybieram ${n}`,
      };

  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          {t.eyebrow}
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
          {t.intro}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-3 lg:grid-cols-3">
        {packages.map((p, i) => {
          const name = en ? p.nameEn : p.name;
          const feats = en ? p.featuresEn : p.features;
          return (
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
                    {t.popular}
                  </span>
                )}

                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">
                  {en ? p.taglineEn : p.tagline}
                </p>

                <p className="mt-5 text-3xl font-semibold tracking-tight">
                  <span className="text-base font-normal text-[var(--ink-soft)]">
                    {t.from}{" "}
                  </span>
                  {zl(p.price)}
                </p>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--line)] pt-5 text-sm">
                  {feats.map((f) => (
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
                  href={contactHref}
                  onClick={() =>
                    sessionStorage.setItem("wycena_summary", summaryFor(p, en))
                  }
                  className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all ${
                    p.highlighted
                      ? "bg-[var(--ink)] text-[var(--paper)] hover:-translate-y-0.5"
                      : "border border-[var(--line)] text-[var(--ink)] hover:border-accent/40"
                  }`}
                >
                  {t.choose(name)}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
