"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Start" },
  { href: "/projekty", label: "Projekty" },
  { href: "/wycena", label: "Wycena" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

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
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-mono text-sm tracking-tight"
        >
          ML<span className="text-accent">.</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 text-sm sm:flex">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`rounded-full px-3.5 py-1.5 transition-colors duration-200 ${
                    active
                      ? "bg-[var(--paper-soft)] text-[var(--ink)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--paper-soft)]/60 hover:text-[var(--ink)]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] sm:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Panel mobilny */}
      {open && (
        <div
          id="mobile-menu"
          className="soft-in border-t border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur sm:hidden"
        >
          <ul className="mx-auto flex max-w-content flex-col gap-1 px-4 py-3 text-sm">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3.5 py-2.5 transition-colors ${
                      active
                        ? "bg-[var(--paper-soft)] text-[var(--ink)]"
                        : "text-[var(--ink-soft)] hover:bg-[var(--paper-soft)]/60 hover:text-[var(--ink)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
