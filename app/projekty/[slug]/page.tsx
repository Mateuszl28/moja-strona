import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import Reveal from "@/components/Reveal";
import SiteShot from "@/components/SiteShot";
import ProjectShots from "@/components/ProjectShots";
import CTA from "@/components/CTA";
import { caseStudies, projectSlug } from "@/lib/projects";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

// Podstrony powstają tylko dla projektów z uzupełnionym `caseStudy` (lib/projects).
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: projectSlug(p) }));
}

const find = (slug: string) => caseStudies.find((p) => projectSlug(p) === slug);

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = find(params.slug);
  if (!p?.caseStudy) return {};
  const description =
    p.caseStudy.challenge.length > 155
      ? p.caseStudy.challenge.slice(0, 152).replace(/\s+\S*$/, "") + "…"
      : p.caseStudy.challenge;
  return {
    title: `${p.title.split(" — ")[0]} — case study`,
    description,
    alternates: { canonical: `/projekty/${params.slug}` },
    openGraph: {
      title: `${p.title} — case study`,
      description,
      url: `/projekty/${params.slug}`,
      ...(p.cover ? { images: [{ url: p.cover, width: 1280, height: 640 }] } : {}),
    },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = find(params.slug);
  if (!p?.caseStudy) notFound();
  const cs = p.caseStudy;
  const repos = p.repos ?? (p.repo ? [{ label: "Kod", href: p.repo }] : []);

  const idx = caseStudies.indexOf(p);
  const next = caseStudies.length > 1 ? caseStudies[(idx + 1) % caseStudies.length] : null;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      dateCreated: p.year,
      keywords: p.tags.join(", "),
      url: `${BASE_URL}/projekty/${params.slug}`,
      ...(p.cover ? { image: `${BASE_URL}${p.cover}` } : {}),
      author: { "@type": "Person", name: "Mateusz Łagocki", url: BASE_URL },
      ...(p.href ? { sameAs: p.href } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Start", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Realizacje", item: `${BASE_URL}/projekty` },
        {
          "@type": "ListItem",
          position: 3,
          name: p.title,
          item: `${BASE_URL}/projekty/${params.slug}`,
        },
      ],
    },
  ];

  const facts = [
    { label: "Rok", value: p.year },
    { label: "Rodzaj", value: p.category },
    cs.client && { label: "Klient", value: cs.client },
    cs.role && { label: "Mój zakres", value: cs.role },
    cs.duration && { label: "Czas", value: cs.duration },
    { label: "Technologie", value: p.tags.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  const sections = [
    { label: "Wyzwanie", text: cs.challenge },
    { label: "Rozwiązanie", text: cs.solution },
    { label: "Efekt", text: cs.result },
  ];

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Link
          href="/projekty"
          className="fade-rise inline-flex items-center gap-2 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft size={15} />
          Wszystkie realizacje
        </Link>
        <h1
          className="fade-rise mt-8 max-w-[20ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]"
          style={{ animationDelay: "0.06s" }}
        >
          {p.title}
          <span className="text-accent">.</span>
        </h1>
        <p
          className="fade-rise mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]"
          style={{ animationDelay: "0.12s" }}
        >
          {p.description}
        </p>
        <div
          className="fade-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
          style={{ animationDelay: "0.18s" }}
        >
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 font-medium text-[var(--paper)] transition-colors hover:bg-accent"
            >
              {p.hrefLabel ?? "Zobacz na żywo"}
              <ArrowUpRight size={15} />
            </a>
          )}
          {repos.map((r) => (
            <a
              key={r.href}
              href={r.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              <Github size={15} />
              {r.label}
            </a>
          ))}
        </div>
      </section>

      {/* Duży zrzut */}
      {p.cover && (
        <section className="mx-auto max-w-content px-6">
          <SiteShot
            src={p.cover}
            href={p.href}
            alt={`Strona ${p.title}`}
            priority
            sizes="(min-width: 1152px) 1104px, 100vw"
          />
        </section>
      )}

      {/* Fakty + treść */}
      <section className="mx-auto max-w-content px-6 py-16 sm:py-24">
        <div className="grid gap-12 md:grid-cols-[13rem_1fr] md:gap-8">
          <dl className="space-y-5 text-sm md:sticky md:top-28 md:self-start">
            {facts.map((f) => (
              <div key={f.label} className="border-t border-[var(--line)] pt-3">
                <dt className="text-[var(--ink-soft)]">{f.label}</dt>
                <dd className="mt-1">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="max-w-2xl space-y-14">
            {sections.map((s) => (
              <Reveal key={s.label}>
                <h2 className="text-3xl sm:text-4xl">{s.label}</h2>
                <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--ink-soft)]">
                  {s.text.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>
            ))}

            {cs.quote && (
              <Reveal>
                <figure className="border-l-2 border-accent pl-6">
                  <blockquote className="font-display text-2xl leading-snug">
                    „{cs.quote.text}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm text-[var(--ink-soft)]">
                    {cs.quote.author}
                  </figcaption>
                </figure>
              </Reveal>
            )}

            {p.shots && p.shots.length > 0 && (
              <Reveal>
                <h2 className="text-3xl sm:text-4xl">Zrzuty ekranu</h2>
                <ProjectShots shots={p.shots} title={p.title} />
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* Następny projekt */}
      {next && next !== p && (
        <section className="mx-auto max-w-content px-6 pb-8">
          <Link
            href={`/projekty/${projectSlug(next)}`}
            className="group flex items-end justify-between gap-6 border-y border-[var(--ink)] py-8"
          >
            <div>
              <p className="text-sm text-[var(--ink-soft)]">Następna realizacja</p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-5xl">
                {next.title}
              </p>
            </div>
            <ArrowRight
              size={28}
              className="mb-2 shrink-0 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </section>
      )}

      <CTA />
    </main>
  );
}
