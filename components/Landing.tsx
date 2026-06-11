"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, FolderGit2, Mail } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Landing() {
  return (
    <section className="relative mx-auto flex min-h-[88vh] max-w-content flex-col justify-center px-6 pt-28">
      <div className="glow-warm pointer-events-none absolute inset-x-0 -top-10 h-[420px]" />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.08 }}
        className="relative z-[2]"
      >
        <motion.span
          variants={item}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--paper-soft)] px-3.5 py-1.5 font-mono text-xs text-[var(--ink-soft)]"
        >
          Mateusz Łagocki · Frontend Developer
        </motion.span>

        <motion.h1
          variants={item}
          transition={{ duration: 0.6 }}
          className="mt-7 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Buduję przejrzyste, szybkie strony i&nbsp;aplikacje
          <span className="text-accent"> we frontendzie</span>.
        </motion.h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.6 }}
          className="mt-6 max-w-xl text-lg text-[var(--ink-soft)]"
        >
          React, Next.js i&nbsp;TypeScript — z naciskiem na detal, dostępność
          i&nbsp;czysty kod. Zajrzyj do moich projektów albo napisz, jeśli masz
          pomysł do zrealizowania.
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[var(--ink-soft)]"
        >
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Dostępny do współpracy
          </span>
          <span className="text-[var(--line)]">·</span>
          <span>Polska, zdalnie</span>
          <span className="text-[var(--line)]">·</span>
          <span className="font-mono text-xs">React / Next.js / TypeScript</span>
        </motion.div>

        {/* hub — przejścia na podstrony */}
        <motion.div
          variants={item}
          transition={{ duration: 0.6 }}
          className="mt-12 grid gap-3 sm:grid-cols-2"
        >
          <NavTile
            href="/projekty"
            icon={<FolderGit2 size={20} />}
            title="Projekty"
            desc="Zobacz, co zbudowałem — wybrane prace i eksperymenty."
          />
          <NavTile
            href="/kontakt"
            icon={<Mail size={20} />}
            title="Kontakt"
            desc="Masz projekt lub pytanie? Napisz — odpisuję szybko."
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

function NavTile({
  href,
  icon,
  title,
  desc,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between gap-8 rounded-2xl border border-[var(--line)] bg-white/70 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(28,27,25,0.07)]"
    >
      <span className="flex items-center justify-between">
        <span className="text-accent">{icon}</span>
        <ArrowUpRight
          size={18}
          className="text-[var(--ink-soft)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </span>
      <span>
        <span className="block text-lg font-medium">{title}</span>
        <span className="mt-1 block text-sm text-[var(--ink-soft)]">{desc}</span>
      </span>
    </Link>
  );
}
