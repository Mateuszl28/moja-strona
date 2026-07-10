import type { Metadata } from "next";
import { Github, Mail, MapPin, Phone, CalendarClock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Napisz do Mateusza Łagockiego — frontend developer. Formularz lub mail bezpośrednio.",
  alternates: { canonical: "/kontakt" },
};

const EMAIL = "kontakt@programujzmateuszem.pl";
const GITHUB = "https://github.com/Mateuszl28";

// „Umów rozmowę" — mail z gotowym tematem i szkieletem treści.
const CALL_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Chcę umówić rozmowę"
)}&body=${encodeURIComponent(
  "Cześć Mateusz,\n\nChciał(a)bym umówić krótką rozmowę o projekcie.\n\nProponowany termin:\nKrótko o projekcie:\n"
)}`;

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
                  href={`tel:${company.phoneE164}`}
                  className="inline-flex items-center gap-3 text-[var(--ink-soft)] transition-colors hover:text-accent"
                >
                  <Phone size={18} />
                  {company.phoneDisplay}
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
                <span className="inline-flex items-start gap-3 text-[var(--ink-soft)]">
                  <MapPin size={18} className="mt-0.5 shrink-0" />
                  {company.addressLine}
                </span>

                <a
                  href={CALL_MAILTO}
                  className="group mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
                >
                  <CalendarClock size={16} />
                  Umów rozmowę
                </a>
                <p className="text-xs text-[var(--ink-soft)]">
                  Odpisuję zwykle w&nbsp;ciągu 24&nbsp;godzin.
                </p>

                <div className="mt-2 border-t border-[var(--line)] pt-4 text-xs leading-relaxed text-[var(--ink-soft)]">
                  <p className="font-medium text-[var(--ink)]">
                    {company.legalName}
                  </p>
                  <p className="mt-1">{company.addressLine}</p>
                  <p>NIP: {company.nip}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
