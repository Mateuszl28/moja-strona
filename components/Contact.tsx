import { Github, Mail } from "lucide-react";
import Reveal from "./Reveal";

const EMAIL = "lagockimateusz6@gmail.com";
const GITHUB = "https://github.com/Mateuszl28";

export default function Contact() {
  return (
    <section id="kontakt" className="mx-auto max-w-content px-6 py-24">
      <Reveal>
        <p className="mb-10 font-mono text-sm text-[var(--ink-soft)]">
          03 — Kontakt
        </p>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Masz pomysł albo szukasz kogoś do zespołu?
          <span className="text-accent"> Odezwij się.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm text-[var(--paper)] transition-transform hover:-translate-y-0.5"
          >
            <Mail size={16} />
            {EMAIL}
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-6 py-3 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
