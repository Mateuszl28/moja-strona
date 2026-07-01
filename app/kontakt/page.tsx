import type { Metadata } from "next";
import { Github, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Napisz do Mateusza Łagockiego — frontend developer. Formularz lub mail bezpośrednio.",
  alternates: { canonical: "/kontakt" },
};

const EMAIL = "kontakt@programujzmateuszem.pl";
const GITHUB = "https://github.com/Mateuszl28";

export default function KontaktPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Kontakt
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Porozmawiajmy
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Masz pomysł, projekt albo szukasz kogoś do zespołu? Napisz —
            odpisuję zwykle w&nbsp;ciągu jednego dnia.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-16">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 backdrop-blur-sm sm:p-8">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-accent/20 bg-[var(--paper-soft)] p-6 sm:p-8">
              <div className="glow-warm pointer-events-none absolute inset-x-0 -top-10 h-40 opacity-70" />
              <div className="relative">
                <h2 className="text-xl font-semibold">Dane bezpośrednie</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Wolisz ominąć formularz? Tu mnie znajdziesz.
                </p>
              </div>
              <div className="relative flex flex-col gap-4 text-sm">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-3 text-[var(--ink-soft)] transition-colors hover:text-accent"
                >
                  <Mail size={18} />
                  {EMAIL}
                </a>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-[var(--ink-soft)] transition-colors hover:text-accent"
                >
                  <Github size={18} />
                  @Mateuszl28
                </a>
                <span className="inline-flex items-center gap-3 text-[var(--ink-soft)]">
                  <MapPin size={18} />
                  Polska · praca zdalna
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
