"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#o-mnie", label: "O mnie" },
  { href: "#projekty", label: "Projekty" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[var(--line)] bg-[var(--paper)]/85 backdrop-blur"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm tracking-tight">
          ML<span className="text-accent">.</span>
        </a>
        <ul className="flex items-center gap-7 text-sm text-[var(--ink-soft)]">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="link-underline hover:text-[var(--ink)]">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
