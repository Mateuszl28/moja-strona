"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Mail } from "lucide-react";

const navPl = [
  { href: "/", label: "Start" },
  { href: "/projekty", label: "Projekty" },
  { href: "/wycena", label: "Wycena" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

const navEn = [
  { href: "/en", label: "Home" },
  { href: "/en/projects", label: "Projects" },
  { href: "/en/quote", label: "Quote" },
  { href: "/en/contact", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const nav = isEn ? navEn : navPl;
  const homeHref = isEn ? "/en" : "/";
  const privacyLabel = isEn ? "Privacy policy" : "Polityka prywatności";

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href={homeHref} className="font-mono text-sm">
            ML<span className="text-accent">.</span>
          </Link>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Frontend developer — React, Next.js, TypeScript.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--ink-soft)]">
          {nav.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-[var(--ink)]"
            >
              {l.label}
            </Link>
          ))}
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

      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2 px-6 pb-8 text-xs text-[var(--ink-soft)]">
        <span>© 2026 Mateusz Łagocki</span>
        <Link
          href="/polityka-prywatnosci"
          className="transition-colors hover:text-[var(--ink)]"
        >
          {privacyLabel}
        </Link>
      </div>
    </footer>
  );
}
