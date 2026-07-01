import Link from "next/link";
import { ArrowUpRight, FolderGit2, Mail } from "lucide-react";

// Komponent serwerowy — treść hero jest w HTML od razu (lepszy LCP). Animacja wejścia
// to CSS (.fade-rise) ze staggerem przez animation-delay, bez framer-motion ani "use client".
export default function Landing() {
  return (
    <section className="relative mx-auto max-w-content px-6 pt-32 sm:pt-40">
      <div className="glow-warm pointer-events-none absolute inset-x-0 -top-10 h-[460px]" />

      <div className="relative z-[2]">
        <div
          className="fade-rise flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]"
          style={{ animationDelay: "0s" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Dostępny do współpracy
        </div>

        <h1
          className="fade-rise mt-8 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl"
          style={{ animationDelay: "0.09s" }}
        >
          Buduję przejrzyste, szybkie strony i&nbsp;aplikacje
          <span className="text-accent"> we frontendzie</span>.
        </h1>

        <p
          className="fade-rise mt-7 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]"
          style={{ animationDelay: "0.18s" }}
        >
          Jestem Mateusz — frontend developer. React, Next.js i&nbsp;TypeScript,
          z naciskiem na detal, dostępność i&nbsp;czysty kod.
        </p>

        <div
          className="fade-rise mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--ink-soft)]"
          style={{ animationDelay: "0.27s" }}
        >
          <span>Polska, zdalnie</span>
          <span className="h-1 w-1 rounded-full bg-[var(--ink-soft)]/40" />
          <span className="font-mono text-xs">React / Next.js / TypeScript</span>
        </div>

        {/* hub — przejścia na podstrony */}
        <div
          className="fade-rise mt-14 grid gap-4 border-t border-[var(--line)] pt-12 sm:grid-cols-2"
          style={{ animationDelay: "0.36s" }}
        >
          <NavTile
            href="/projekty"
            n="01"
            icon={<FolderGit2 size={20} />}
            title="Projekty"
            desc="Zobacz, co zbudowałem — wybrane prace i eksperymenty."
          />
          <NavTile
            href="/kontakt"
            n="02"
            icon={<Mail size={20} />}
            title="Kontakt"
            desc="Masz projekt lub pytanie? Napisz — odpisuję szybko."
          />
        </div>
      </div>
    </section>
  );
}

function NavTile({
  href,
  n,
  icon,
  title,
  desc,
}: {
  href: string;
  n: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-10 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-7 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:bg-[var(--surface-hover)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.45)]"
    >
      <div className="flex items-center justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--paper-soft)] text-accent transition-colors group-hover:bg-accent group-hover:text-[var(--paper)]">
          {icon}
        </span>
        <span className="font-mono text-xs text-[var(--ink-soft)]">{n}</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="block text-xl font-medium tracking-tight">
            {title}
          </span>
          <span className="mt-1.5 block max-w-[24ch] text-sm text-[var(--ink-soft)]">
            {desc}
          </span>
        </div>
        <ArrowUpRight
          size={22}
          className="shrink-0 text-[var(--ink-soft)] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
        />
      </div>
    </Link>
  );
}
