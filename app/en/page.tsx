import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import { projects } from "@/lib/projects";
import { audits } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Mateusz Łagocki — Frontend Developer",
  description:
    "Freelance frontend developer from Poland — React, Next.js, TypeScript. Websites, online stores and web/mobile apps that actually ship.",
  alternates: {
    canonical: "/en",
    languages: { "pl-PL": "/", en: "/en" },
  },
  openGraph: {
    type: "website",
    locale: "en",
    title: "Mateusz Łagocki — Frontend Developer",
    description:
      "Websites, online stores and web/mobile apps — React, Next.js, TypeScript.",
  },
};

const services: { title: string; desc: string }[] = [
  { title: "Websites", desc: "Landing pages and company sites — fast, clean, responsive." },
  { title: "Online stores", desc: "E-commerce with cart, payments and a full checkout flow." },
  { title: "Web apps", desc: "Custom dashboards, tools and SaaS built to fit." },
  { title: "Mobile apps", desc: "Apps for Android and iOS." },
];

const why: { title: string; desc: string }[] = [
  { title: "Real, shipped work", desc: "Stores and apps that actually run in production — not just mockups." },
  { title: "More than frontend", desc: "I also handle backend (.NET / C#) and server deployment." },
  { title: "Transparent pricing", desc: "You know the ballpark before you write — clear scope, no surprises." },
  { title: "Fast communication", desc: "I usually reply within 24 hours and show progress along the way." },
];

const recent = projects.filter((p) => p.featured && p.href).slice(0, 3);

export default function EnHome() {
  return (
    <main>
      <section className="mx-auto max-w-content px-6 pb-20 pt-32 sm:pb-28 sm:pt-40">
        <p className="fade-rise flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--ink-soft)]">
          <span className="font-medium text-[var(--ink)]">Mateusz Łagocki</span>
          <span aria-hidden>/</span>
          <span>frontend developer, Poland</span>
        </p>

        <h1
          className="fade-rise mt-8 max-w-[14ch] text-balance text-[clamp(2.75rem,8vw,6.75rem)] font-semibold leading-[0.95]"
          style={{ animationDelay: "0.08s" }}
        >
          Fast websites, stores and&nbsp;apps
          <span className="text-accent">.</span>
        </h1>

        <div
          className="fade-rise mt-14 grid gap-10 border-t border-[var(--line)] pt-8 md:grid-cols-[1.2fr_1fr_auto] md:gap-12"
          style={{ animationDelay: "0.16s" }}
        >
          <p className="max-w-md text-lg leading-relaxed">
            I design and build with React, Next.js and TypeScript. I work
            solo, so you talk directly to the person writing the code.
          </p>

          {recent.length > 0 && (
            <div className="text-sm">
              <p className="text-[var(--ink-soft)]">Recently shipped</p>
              <ul className="mt-3 space-y-1.5">
                {recent.map((p) => (
                  <li key={p.title}>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-underline font-medium"
                    >
                      {p.title}
                    </a>
                    <span className="text-[var(--ink-soft)]"> · {p.year}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col items-start gap-4">
            <Link
              href="/en/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-accent"
            >
              Get in touch
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href="/en/projects" className="link-underline text-sm font-medium">
              See projects
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
        <SectionHead
          label="Services"
          title="What I can build for you"
          aside={
            <Link href="/en/quote" className="link-underline shrink-0 text-sm font-medium">
              Get a quote
            </Link>
          }
        />
        <ul className="mt-12 md:ml-[calc(13rem+2rem)]">
          {services.map((s, i) => (
            <li key={s.title} className="border-b border-[var(--line)] first:border-t">
              <Reveal delay={i * 0.04}>
                <Link
                  href="/en/quote"
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <h3 className="text-xl transition-colors group-hover:text-accent sm:w-56 sm:shrink-0">
                    {s.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {s.desc}
                  </p>
                  <ArrowUpRight
                    size={15}
                    className="hidden text-[var(--ink-soft)] transition-colors group-hover:text-accent sm:block"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-14 md:ml-[calc(13rem+2rem)]">
          <p className="text-sm text-[var(--ink-soft)]">
            Audits of existing sites (fixed price)
          </p>
          <ul className="mt-4">
            {audits.map((a) => (
              <li key={a.id} className="border-b border-[var(--line)] first:border-t">
                <Link
                  href="/en/contact"
                  className="group grid items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[1fr_auto]"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <h3 className="text-xl transition-colors group-hover:text-accent sm:w-56 sm:shrink-0">
                      {a.labelEn}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                      {a.descEn}
                    </p>
                  </div>
                  <span className="whitespace-nowrap text-sm tabular-nums">
                    PLN {a.price.toLocaleString("en-US")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
        <SectionHead label="Why me" title="Substance over promises" />
        <dl className="mt-12 grid gap-x-12 md:ml-[calc(13rem+2rem)] md:grid-cols-2">
          {why.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.05}>
              <div className="border-t border-[var(--line)] py-6">
                <dt className="text-lg font-medium">{p.title}</dt>
                <dd className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                  {p.desc}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
        <Reveal>
          <div className="border-t border-[var(--ink)] pt-10">
            <h2 className="max-w-[16ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]">
              Got a project? Let&apos;s talk about&nbsp;it
              <span className="text-accent">.</span>
            </h2>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/en/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-accent"
              >
                Contact me
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="mailto:kontakt@programujzmateuszem.pl"
                className="link-underline text-sm font-medium"
              >
                kontakt@programujzmateuszem.pl
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
