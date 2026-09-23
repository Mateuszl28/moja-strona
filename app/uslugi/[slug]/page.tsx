import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import SiteShot from "@/components/SiteShot";
import Process from "@/components/Process";
import CTA from "@/components/CTA";
import { extrasFor, getServicePage, servicePages } from "@/lib/service-pages";
import { packages } from "@/lib/packages";
import { caseStudies, projectSlug } from "@/lib/projects";
import { projectTypes, zl } from "@/lib/pricing";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

// Tylko zdefiniowane usługi — inne adresy od razu 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const page = getServicePage(params.slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/uslugi/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/uslugi/${page.slug}`,
    },
  };
}

export default function ServicePageView({ params }: { params: { slug: string } }) {
  const page = getServicePage(params.slug);
  if (!page) notFound();

  const type = projectTypes.find((t) => t.id === page.typeId)!;
  const packs = packages.filter((p) => page.packageIds.includes(p.id));
  const extras = extrasFor(page);
  const works = page.caseStudySlugs
    .map((slug) => caseStudies.find((p) => projectSlug(p) === slug))
    .filter((p): p is (typeof caseStudies)[number] => Boolean(p));
  const url = `${BASE_URL}/uslugi/${page.slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.label,
      serviceType: page.label,
      description: page.metaDescription,
      url,
      provider: { "@id": `${BASE_URL}/#firma` },
      areaServed: { "@type": "Country", name: "Polska" },
      offers: packs.map((p) => ({
        "@type": "Offer",
        name: `Pakiet ${p.name}`,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: p.price,
          priceCurrency: "PLN",
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((f) => ({
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
        { "@type": "ListItem", position: 2, name: "Cennik", item: `${BASE_URL}/wycena` },
        { "@type": "ListItem", position: 3, name: page.label, item: url },
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
          <Link href="/wycena" className="transition-colors hover:text-[var(--ink)]">
            Usługi
          </Link>
          <span aria-hidden>/</span>
          {page.label}
        </p>
        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_20rem]">
          <div className="fade-rise" style={{ animationDelay: "0.06s" }}>
            <h1 className="max-w-[18ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]">
              {page.headline}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
              {page.lead}
            </p>
          </div>

          <div
            className="fade-rise rounded-2xl bg-[var(--ink)] p-6 text-[var(--paper)]"
            style={{ animationDelay: "0.12s" }}
          >
            <p className="text-sm text-paper/60">{type.label} od</p>
            <p className="mt-1 font-display text-5xl tabular-nums">{zl(type.base)}</p>
            <p className="mt-2 text-sm text-paper/60">
              Realizacja orientacyjnie ok. {type.weeks} tyg.
            </p>
            <Link
              href="/wycena"
              className="group mt-6 flex items-center justify-center gap-2 rounded-full bg-[var(--paper)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-accent hover:text-[var(--paper)]"
            >
              Policz wycenę
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href={`/kontakt?temat=${type.id}`}
              className="mt-3 block text-center text-sm text-paper/70 transition-colors hover:text-[var(--paper)]"
            >
              albo napisz do mnie
            </Link>
          </div>
        </div>
      </section>

      {/* Co dostajesz */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="W standardzie" title="Co dostajesz" />
        <div className="mt-10 grid gap-x-12 md:ml-[calc(13rem+2rem)] md:grid-cols-2">
          {page.includes.map((it, i) => (
            <Reveal key={it.title} delay={(i % 2) * 0.05}>
              <div className="border-t border-[var(--line)] py-6">
                <h3 className="font-sans text-lg font-medium tracking-normal">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Realizacje */}
      {works.length > 0 && (
        <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
          <SectionHead
            label="Realizacje"
            title={works.length > 1 ? "Tak to wygląda w praktyce" : "Przykład z praktyki"}
          />
          <div
            className={`mt-10 grid gap-8 ${works.length > 1 ? "md:grid-cols-2" : "md:ml-[calc(13rem+2rem)]"}`}
          >
            {works.map((p) => (
              <Reveal key={p.title}>
                <Link href={`/projekty/${projectSlug(p)}`} className="group block">
                  {p.cover && (
                    <SiteShot
                      src={p.cover}
                      href={p.href}
                      alt={`Strona ${p.title}`}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  )}
                  <h3 className="mt-5 text-2xl transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">{p.description}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Przeczytaj case study
                    <ArrowUpRight size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Pakiety i dodatki */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Cennik" title="Pakiety i dodatki">
          Ceny „od” — dokładną kwotę dla swojego zakresu policzysz w&nbsp;kalkulatorze.
        </SectionHead>
        <div className="mt-10 grid gap-10 md:ml-[calc(13rem+2rem)] lg:grid-cols-[1.3fr_1fr]">
          <div className={`grid gap-4 ${packs.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {packs.map((p) => (
              <Reveal key={p.id} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <h3 className="text-xl">{p.name}</h3>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{p.tagline}</p>
                  <p className="mt-4 font-display text-4xl tabular-nums">
                    <span className="mr-1 text-base text-[var(--ink-soft)]">od</span>
                    {zl(p.price)}
                  </p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div>
              <p className="text-sm text-[var(--ink-soft)]">Popularne dodatki</p>
              <ul className="mt-3 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {extras.map((e) => (
                  <li key={e.id} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                    <span>{e.label}</span>
                    <span className="whitespace-nowrap tabular-nums text-[var(--ink-soft)]">
                      {e.tbd ? "wycena indywidualna" : `+${zl(e.price)}`}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/wycena" className="link-underline mt-5 inline-block text-sm font-medium">
                Otwórz kalkulator wyceny
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Process />

      {/* FAQ */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Pytania" title="Najczęstsze pytania" />
        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)] md:ml-[calc(13rem+2rem)]">
          {page.faq.map((f) => (
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
              <p className="max-w-2xl pb-5 leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}
