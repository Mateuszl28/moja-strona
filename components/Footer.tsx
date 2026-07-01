import Link from "next/link";
import { Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-mono text-sm">
            ML<span className="text-accent">.</span>
          </Link>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Frontend developer — React, Next.js, TypeScript.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--ink-soft)]">
          <Link href="/" className="transition-colors hover:text-[var(--ink)]">
            Start
          </Link>
          <Link href="/projekty" className="transition-colors hover:text-[var(--ink)]">
            Projekty
          </Link>
          <Link href="/wycena" className="transition-colors hover:text-[var(--ink)]">
            Wycena
          </Link>
          <Link href="/kontakt" className="transition-colors hover:text-[var(--ink)]">
            Kontakt
          </Link>
          <a
            href="mailto:kontakt@programujzmateuszem.pl"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            aria-label="E-mail"
          >
            <Mail size={15} />
          </a>
          <a
            href="https://github.com/Mateuszl28"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
        </nav>
      </div>

      <div className="mx-auto max-w-content px-6 pb-8 text-xs text-[var(--ink-soft)]">
        © 2026 Mateusz Łagocki
      </div>
    </footer>
  );
}
