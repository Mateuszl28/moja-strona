import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, FileText } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import CTA from "@/components/CTA";
import { auditPages, getAuditPage } from "@/lib/audit-pages";
import { zl } from "@/lib/pricing";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

// Tylko znane audyty — inne adresy od razu 404 (bez tego loading.tsx strumieniuje 200).
export const dynamicParams = false;

export function generateStaticParams() {
  return auditPages.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const data = getAuditPage(params.slug);
  if (!data) return {};
  const { page } = data;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/audyt/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `/audyt/${page.slug}`,
    },
  };
}

export default function AuditPage({ params }: { params: { slug: string } }) {
  const data = getAuditPage(params.slug);
  if (!data) notFound();
  const { page, offer } = data;
  const orderHref = `/kontakt?temat=${page.slug}`;

  // Usługa z ceną + FAQ — dane strukturalne dla wyników Google.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: offer.label,
    description: page.metaDescription,
    serviceType: offer.label,
    areaServed: "PL",
    url: `${BASE_URL}/audyt/${page.slug}`,
    provider: { "@type": "Person", name: "Mateusz Łagocki", url: BASE_URL },
    offers: {
      "@type": "Offer",
      price: offer.price,
      priceCurrency: "PLN",
      url: `${BASE_URL}/audyt/${page.slug}`,
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-content px-6 pb-16 pt-8 sm:pb-24">
        <p className="fade-rise eyebrow">
          <Link href="/wycena" className="transition-colors hover:text-[var(--ink)]">
            Usługi
          </Link>
          <span aria-hidden>/</span>
          {offer.label}
        </p>

        <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <h1
              className="fade-rise max-w-[18ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]"
              style={{ animationDelay: "0.06s" }}
            >
              {page.headline}
              <span className="text-accent">.</span>
            </h1>
            <p
              className="fade-rise mt-7 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]"
              style={{ animationDelay: "0.12s" }}
            >
              {page.lead}
            </p>
          </div>

          <div
            className="fade-rise rounded-2xl bg-[var(--ink)] p-6 text-[var(--paper)]"
            style={{ animationDelay: "0.18s" }}
          >
            <p className="text-sm text-paper/60">Stała cena</p>
            <p className="mt-1 font-display text-5xl tabular-nums">
              {zl(offer.price)}
            </p>
            <p className="mt-2 text-sm text-paper/60">
              Raport PDF i&nbsp;omówienie w&nbsp;cenie.
            </p>
            <Link
              href={orderHref}
              className="group mt-6 flex items-center justify-center gap-2 rounded-full bg-[var(--paper)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:bg-accent hover:text-[var(--paper)]"
            >
              Zamów audyt
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            {page.sample && (
              <a
                href={page.sample.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-center gap-2 text-sm text-paper/70 transition-colors hover:text-[var(--paper)]"
              >
                <FileText size={15} />
                Przykładowy raport
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Dla kogo */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Dla kogo" title="Ten audyt jest dla Ciebie, jeśli…" />
        <ul className="mt-10 grid gap-x-10 gap-y-6 md:ml-[calc(13rem+2rem)] md:grid-cols-3">
          {page.forWho.map((item, i) => (
            <li key={item}>
              <Reveal delay={i * 0.05}>
                <p className="border-t border-[var(--line)] pt-4 text-lg leading-snug">
                  {item}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Zakres */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Zakres" title="Co sprawdzam" />
        <div className="mt-10 grid gap-x-12 md:ml-[calc(13rem+2rem)] md:grid-cols-2">
          {page.scope.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.05}>
              <div className="border-t border-[var(--line)] py-6">
                <h3 className="font-sans text-lg font-medium tracking-normal">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Co dostajesz + przykładowy raport (ciemna sekcja dla rytmu) */}
      <section className="my-10 bg-[#171512] text-[#f3f0e8] [--ink-soft:rgba(243,240,232,0.6)] [--ink:#f3f0e8] [--line:rgba(243,240,232,0.15)]">
        <div className="mx-auto max-w-content px-6 py-20 sm:py-24">
          <SectionHead label="Efekt" title="Co dostajesz" />
          <div className="mt-10 grid gap-12 md:ml-[calc(13rem+2rem)] md:grid-cols-[1.3fr_1fr]">
            <ul className="space-y-4">
              {page.deliverables.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed">
                  <Check size={18} className="mt-1 shrink-0 text-accent-soft" />
                  {d}
                </li>
              ))}
            </ul>

            {page.sample ? (
              <Reveal>
                <a
                  href={page.sample.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-[var(--line)] p-6 transition-colors hover:border-accent-soft"
                >
                  <FileText size={28} className="text-accent-soft" />
                  <p className="mt-4 text-xl font-medium">{page.sample.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {page.sample.note}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-soft">
                    Otwórz PDF
                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </Reveal>
            ) : (
              page.note && (
                <Reveal>
                  <p className="rounded-2xl border border-[var(--line)] p-6 leading-relaxed text-[var(--ink-soft)]">
                    {page.note}
                  </p>
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* Przebieg */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Przebieg" title="Jak to wygląda" />
        <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {page.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.05}>
                <div className="border-t border-[var(--line)] pt-4">
                  <span className="font-display text-4xl tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-20">
        <SectionHead label="Pytania" title="Zanim zamówisz" />
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
              <p className="max-w-2xl pb-5 leading-relaxed text-[var(--ink-soft)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}
