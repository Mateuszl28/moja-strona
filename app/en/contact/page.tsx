import type { Metadata } from "next";
import { Github, Mail, MapPin, Phone, CalendarClock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mateusz Łagocki — freelance frontend developer. Send a message or email directly.",
  alternates: {
    canonical: "/en/contact",
    languages: { "pl-PL": "/kontakt", en: "/en/contact" },
  },
};

const EMAIL = "kontakt@programujzmateuszem.pl";
const GITHUB = "https://github.com/Mateuszl28";

const CALL_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Let's schedule a call"
)}&body=${encodeURIComponent(
  "Hi Mateusz,\n\nI'd like to schedule a short call about a project.\n\nProposed time:\nA bit about the project:\n"
)}`;

export default function EnContactPage() {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-12 pt-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            Contact
          </p>
          <h1 className="mt-4 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl">
            Let&apos;s talk
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            Got an idea, a project, or looking for someone to join the team?
            Drop me a line — I usually reply within a day.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-6 pb-16">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 backdrop-blur-sm sm:p-8">
              <ContactForm en />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-accent/20 bg-[var(--paper-soft)] p-6 sm:p-8">
              <div className="glow-warm pointer-events-none absolute inset-x-0 -top-10 h-40 opacity-70" />
              <div className="relative">
                <h2 className="text-xl font-semibold">Direct details</h2>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">
                  Prefer to skip the form? Here&apos;s where to find me.
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
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
                >
                  <CalendarClock size={16} />
                  Book a call
                </a>
                <p className="text-xs text-[var(--ink-soft)]">
                  I usually reply within 24 hours.
                </p>

                <div className="mt-2 border-t border-[var(--line)] pt-4 text-xs leading-relaxed text-[var(--ink-soft)]">
                  <p className="font-medium text-[var(--ink)]">
                    {company.legalName}
                  </p>
                  <p className="mt-1">{company.addressLine}, Poland</p>
                  <p>VAT ID (NIP): {company.nip}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
