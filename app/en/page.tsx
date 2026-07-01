import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Layout,
  ShoppingBag,
  AppWindow,
  Smartphone,
  Rocket,
  Layers,
  Calculator,
  Clock,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";

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

const services: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Layout, title: "Websites", desc: "Landing pages and company sites — fast, clean, responsive." },
  { icon: ShoppingBag, title: "Online stores", desc: "E-commerce with cart, payments and a full checkout flow." },
  { icon: AppWindow, title: "Web apps", desc: "Custom dashboards, tools and SaaS built to fit." },
  { icon: Smartphone, title: "Mobile apps", desc: "Apps for Android and iOS." },
];

const why: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Rocket, title: "Real, shipped work", desc: "Stores and apps that actually run in production — not just mockups." },
  { icon: Layers, title: "More than frontend", desc: "I also handle backend (.NET / C#) and server deployment." },
  { icon: Calculator, title: "Transparent pricing", desc: "You know the ballpark before you write — clear scope, no surprises." },
  { icon: Clock, title: "Fast communication", desc: "I usually reply within 24 hours and show progress along the way." },
];

export default function EnHome() {
  return (
    <main>
      <section className="relative mx-auto max-w-content px-6 pt-32 sm:pt-40">
        <div className="glow-warm pointer-events-none absolute inset-x-0 -top-10 h-[460px]" />
        <div className="relative z-[2]">
          <div className="fade-rise inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.7)]" />
            Available for work
          </div>

          <h1 className="fade-rise mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
            I build clear, fast websites
            <span className="text-accent"> and apps</span>.
          </h1>

          <p className="fade-rise mt-7 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            I&apos;m Mateusz — a frontend developer from Poland. React, Next.js
            and TypeScript, with care for detail, accessibility and clean code.
          </p>

          <div className="fade-rise mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--ink-soft)]">
            <span>Poland, remote</span>
            <span className="h-1 w-1 rounded-full bg-[var(--ink-soft)]/40" />
            <span className="font-mono text-xs">React / Next.js / TypeScript</span>
          </div>

          <div className="fade-rise mt-10 flex flex-wrap gap-3">
            <Link
              href="/en/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
            >
              Get in touch
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/projekty"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-accent/40"
            >
              See projects
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Services
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            What I build for you
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors hover:border-accent/30">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--paper-soft)] text-accent">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-lg font-medium">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Why me
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Substance over promises
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {why.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05} className="h-full">
                <div className="flex h-full gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--paper-soft)] text-accent">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="font-medium">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-[var(--paper-soft)] px-8 py-14 text-center sm:py-20">
            <div className="glow-warm absolute inset-x-0 -top-10 h-60 opacity-90" />
            <h2 className="relative mx-auto max-w-xl text-balance text-2xl font-semibold leading-snug sm:text-3xl">
              Got a project or need a frontend developer?
              <span className="text-accent"> Let&apos;s build it.</span>
            </h2>
            <div className="relative mt-8">
              <Link
                href="/en/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
              >
                Contact me
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
