import { Quote } from "lucide-react";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/testimonials";

// Pokazuje się tylko, gdy są realne opinie (lib/testimonials).
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Opinie
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Co mówią klienci
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 0.05} className="h-full">
            <figure className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
              <Quote size={22} className="text-accent" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 leading-relaxed text-[var(--ink)]">
                „{t.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-medium">{t.author}</span>
                {t.role && (
                  <span className="text-[var(--ink-soft)]"> · {t.role}</span>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
