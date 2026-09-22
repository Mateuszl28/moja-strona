"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Mail } from "lucide-react";
import { company } from "@/lib/company";
import Logo from "./Logo";

const navPl = [
  { href: "/", label: "Start" },
  { href: "/projekty", label: "Projekty" },
  { href: "/wycena", label: "Wycena" },
  { href: "/sklep", label: "Sklep" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

const navEn = [
  { href: "/en", label: "Home" },
  { href: "/en/projects", label: "Projects" },
  { href: "/en/quote", label: "Quote" },
  { href: "/en/shop", label: "Shop" },
  { href: "/en/contact", label: "Contact" },
];

export default function Footer() {
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const nav = isEn ? navEn : navPl;
  const homeHref = isEn ? "/en" : "/";
  const privacyHref = isEn ? "/en/privacy" : "/polityka-prywatnosci";
  const privacyLabel = isEn ? "Privacy policy" : "Polityka prywatności";
  const termsHref = isEn ? "/en/terms" : "/regulamin";
  const termsLabel = isEn ? "Terms" : "Regulamin";

  return (
    <footer className="mt-10 bg-[var(--ink)] text-[var(--paper)]">
      <div className="mx-auto max-w-content px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href={homeHref} aria-label="Mateusz Łagocki">
              <Logo inverted />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
              {isEn
                ? "Websites, online stores and apps. React, Next.js, TypeScript."
                : "Strony, sklepy i aplikacje. React, Next.js, TypeScript."}
            </p>
          </div>

          <nav aria-label={isEn ? "Footer" : "Stopka"} className="text-sm">
            <p className="text-paper/50">{isEn ? "Pages" : "Strony"}</p>
            <ul className="mt-3 space-y-1.5">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-accent-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <p className="text-paper/50">{isEn ? "Contact" : "Kontakt"}</p>
            <ul className="mt-3 space-y-1.5">
              <li>
                <a
                  href="mailto:kontakt@programujzmateuszem.pl"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft"
                >
                  <Mail size={14} />
                  kontakt@programujzmateuszem.pl
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Mateuszl28"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-paper/15 pt-6 text-xs text-paper/50">
          <span>
            © 2026 {company.legalName} · {company.addressLine} · NIP:{" "}
            {company.nip}
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Link
              href={termsHref}
              className="transition-colors hover:text-[var(--paper)]"
            >
              {termsLabel}
            </Link>
            <Link
              href={privacyHref}
              className="transition-colors hover:text-[var(--paper)]"
            >
              {privacyLabel}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
