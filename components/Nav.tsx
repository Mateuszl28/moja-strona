"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CartIcon from "./CartIcon";
import Logo from "./Logo";

const linksPl = [
  { href: "/", label: "Start" },
  { href: "/projekty", label: "Projekty" },
  { href: "/wycena", label: "Wycena" },
  { href: "/sklep", label: "Sklep" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/panel", label: "Panel" },
];

const linksEn = [
  { href: "/en", label: "Home" },
  { href: "/en/projects", label: "Projects" },
  { href: "/en/quote", label: "Quote" },
  { href: "/en/shop", label: "Shop" },
  { href: "/en/contact", label: "Contact" },
  { href: "/panel", label: "Panel" },
];

// Trasy-korzenie dopasowywane dokładnie (żeby /en nie było aktywne na /en/quote).
const ROOTS = ["/", "/en"];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Zamknij menu mobilne po zmianie trasy.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    ROOTS.includes(href) ? pathname === href : pathname.startsWith(href);

  const isEn = pathname.startsWith("/en");
  const links = isEn ? linksEn : linksPl;
  const homeHref = isEn ? "/en" : "/";
  const langHref = isEn ? "/" : "/en";
  const contactHref = isEn ? "/en/contact" : "/kontakt";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[var(--paper)]"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link
          href={homeHref}
          onClick={() => setOpen(false)}
          aria-label="Mateusz Łagocki — strona główna"
        >
          <Logo />
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 text-sm md:flex">
          {links.filter((l) => l.href !== contactHref).map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-1.5 transition-colors duration-200 ${
                    active
                      ? "text-[var(--ink)] after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-[var(--ink)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="ml-2 border-l border-[var(--line)] pl-2">
            <Link
              href={langHref}
              className="px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              {isEn ? "PL" : "EN"}
            </Link>
          </li>
          <li>
            <CartIcon />
          </li>
          <li className="ml-2">
            <Link
              href={contactHref}
              className="inline-flex items-center rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-accent"
            >
              {isEn ? "Contact" : "Napisz do mnie"}
            </Link>
          </li>
        </ul>

        {/* Prawa strona (mobile): koszyk + hamburger */}
        <div className="flex items-center gap-0.5 md:hidden">
          <CartIcon />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Panel mobilny */}
      {open && (
        <div
          id="mobile-menu"
          className="soft-in border-t border-[var(--line)] bg-[var(--paper)] md:hidden"
        >
          <ul className="mx-auto flex max-w-content flex-col px-6 py-4">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block border-b border-[var(--line)] py-3 font-display text-2xl transition-colors ${
                      active
                        ? "text-[var(--ink)]"
                        : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={langHref}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
              >
                {isEn ? "Polski" : "English"}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
