import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import FeaturedProjects from "@/components/FeaturedProjects";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import { company } from "@/lib/company";
import { projectTypes, zl } from "@/lib/pricing";

// Lokalna strona usługowa pod frazy typu „strony internetowe Leszno".
// Ceny i czasy realizacji z lib/pricing — ta sama prawda co kalkulator.

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";
const PATH = "/strony-internetowe-leszno";

export const metadata: Metadata = {
  title: { absolute: "Strony internetowe Leszno — Mateusz Łagocki" },
  description:
    "Tworzenie stron internetowych i sklepów w Lesznie. Strona od 450 zł, sklep od 1500 zł. Bezpośrednio z programistą, bez agencji. Wycena online.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Strony internetowe Leszno — Mateusz Łagocki",
    description:
      "Strony i sklepy internetowe dla firm z Leszna i okolic. Bezpośrednio z programistą, bez agencji.",
    url: PATH,
  },
};

// Po „około" dopełniacz: „około 2 tygodni", „około 1 tygodnia".
const weeksOf = (id: string) => {
  const n: number = projectTypes.find((t) => t.id === id)?.weeks ?? 0;
  return `${n} ${n === 1 ? "tygodnia" : "tygodni"}`;
};
const minPrice = (id: string) => projectTypes.find((t) => t.id === id)?.base ?? 0;

const reasons = [
  {
    title: "Rozmawiasz z osobą, która pisze kod",
    desc: "Bez handlowca i project managera po drodze. Pytasz — odpowiada ten, kto robi Twoją stronę.",
  },
  {
    title: "Jasna cena przed startem",
    desc: "Widełki znasz od razu z kalkulatora, a dokładną kwotę ustalamy przed rozpoczęciem prac.",
  },
  {
    title: "Strona, która działa w Google",
    desc: "Szybkie ładowanie, poprawne metadane i dane firmy dla wyników lokalnych — w standardzie.",
  },
  {
    title: "Kod i dostępy są Twoje",
    desc: "Po rozliczeniu dostajesz pełny kod źródłowy i wszystkie dostępy. Nie jesteś uwiązany.",
  },
];

const faq = [
  {
    q: "Ile kosztuje strona internetowa w Lesznie?",
    a: `Prosta strona-wizytówka zaczyna się od ${zl(minPrice("strona"))}, sklep internetowy od ${zl(
      minPrice("sklep")
    )}. Dokładną kwotę dla swojego zakresu policzysz w kalkulatorze wyceny.`,
  },
  {
    q: "Jak długo trwa zrobienie strony?",
    a: `Orientacyjnie: strona firmowa około ${weeksOf("strona")}, sklep internetowy około ${weeksOf(
      "sklep"
    )}. Termin zależy od zakresu i tego, jak szybko dostanę treści.`,
  },
  {
    q: "Czy pracujesz tylko z firmami z Leszna?",
    a: "Nie. Firma ma siedzibę w Lesznie, ale pracuję z klientami z całej Polski — większość spraw da się załatwić online.",
  },
  {
    q: "Czy pomożesz z domeną i hostingiem?",
    a: "Tak. Publikuję stronę, konfiguruję domenę i pomagam po starcie, więc nie musisz się tym zajmować.",
  },
  {
    q: "Czy mogę sam edytować treści na stronie?",
    a: "Tak, jeśli wybierzesz system CMS — wtedy zmienisz teksty i zdjęcia bez programisty. Opcję zaznaczysz w kalkulatorze wyceny.",
  },
  {
    q: "Mam już stronę. Czy możesz ją sprawdzić?",
    a: "Tak — robię audyt SEO (dlaczego strona nie pokazuje się w Google) i audyt bezpieczeństwa. Oba mają stałą cenę.",
  },
];

export default function LesznoPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Tworzenie stron internetowych — Leszno",
      serviceType: "Tworzenie stron internetowych i sklepów",
      url: `${BASE_URL}${PATH}`,
      provider: { "@id": `${BASE_URL}/#firma` },
      areaServed: [
        { "@type": "City", name: "Leszno" },
        { "@type": "Country", name: "Polska" },
      ],
      offers: projectTypes.map((t) => ({
        "@type": "Offer",
        name: t.label,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: t.base,
          priceCurrency: "PLN",
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Strony internetowe Leszno",
          item: `${BASE_URL}${PATH}`,
        },
      ],
    },
  ];

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-content px-6 pb-16 pt-8 sm:pb-24">
        <p className="fade-rise eyebrow">
          <MapPin size={14} aria-hidden="true" />
          {company.address.city} i&nbsp;okolice
        </p>
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="fade-rise" style={{ animationDelay: "0.06s" }}>
            <h1 className="max-w-[16ch] text-balance text-[clamp(2.5rem,6.5vw,5.5rem)] leading-[0.96]">
              Strony internetowe Leszno
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
              Projektuję i&nbsp;koduję strony firmowe, sklepy internetowe
              i&nbsp;aplikacje dla firm z&nbsp;Leszna i&nbsp;okolic. Bez agencji
              i&nbsp;pośredników — od pierwszej rozmowy do publikacji pracujesz
              ze mną bezpośrednio.
            </p>
          </div>

          <div
            className="fade-rise rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6"
            style={{ animationDelay: "0.12s" }}
          >
            <p className="text-sm text-[var(--ink-soft)]">Strona firmowa od</p>
            <p className="mt-1 font-display text-5xl tabular-nums">
              {zl(minPrice("strona"))}
            </p>
            <p className="mt-2 text-sm text-[var(--ink-soft)]">
              Sklep internetowy od {zl(minPrice("sklep"))}
            </p>
            <Link
              href="/wycena"
              className="group mt-6 flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-accent"
            >
              Policz wycenę
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href="/kontakt"
              className="mt-3 block text-center text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              albo napisz do mnie
            </Link>
          </div>
        </div>
      </section>

      {/* Oferta z cenami */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Oferta" title="Co mogę zrobić dla Twojej firmy">
          Ceny są orientacyjne i&nbsp;zależą od zakresu. Czas realizacji to
          typowy termin dla danego rodzaju projektu.
        </SectionHead>
        <ul className="mt-10 md:ml-[calc(13rem+2rem)]">
          {projectTypes.map((t, i) => (
            <li key={t.id} className="border-b border-[var(--line)] first:border-t">
              <Reveal delay={i * 0.04}>
                <Link
                  href={
                    t.id === "strona"
                      ? "/uslugi/strony-internetowe"
                      : t.id === "sklep"
                        ? "/uslugi/sklepy-internetowe"
                        : "/wycena"
                  }
                  className="group grid items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[1fr_auto]"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <h3 className="text-xl transition-colors group-hover:text-accent sm:w-56 sm:shrink-0">
                      {t.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                      {t.desc} · ok. {t.weeks} tyg.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm tabular-nums">
                    od {zl(t.base)}
                    <ArrowUpRight
                      size={15}
                      className="text-[var(--ink-soft)] transition-colors group-hover:text-accent"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Dlaczego */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Dlaczego ja" title="Lokalnie, ale bez lokalnych kompromisów" />
        <div className="mt-10 grid gap-x-12 md:ml-[calc(13rem+2rem)] md:grid-cols-2">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 0.05}>
              <div className="border-t border-[var(--line)] py-6">
                <h3 className="font-sans text-lg font-medium tracking-normal">
                  {r.title}
                </h3>
                <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                  {r.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FeaturedProjects />
      <Process />

      {/* FAQ */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Pytania" title="Najczęstsze pytania" />
        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)] md:ml-[calc(13rem+2rem)]">
          {faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl leading-none text-[var(--ink-soft)] transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 leading-relaxed text-[var(--ink-soft)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-sm text-[var(--ink-soft)] md:ml-[calc(13rem+2rem)]">
          {company.legalName} · {company.addressLine} ·{" "}
          <a href={`tel:${company.phoneE164}`} className="link-underline">
            {company.phoneDisplay}
          </a>
        </p>
      </section>

      <CTA />
    </main>
  );
}
