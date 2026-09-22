import { Star } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import {
  googleProfileUrl,
  googleReviewUrl,
  testimonials,
} from "@/lib/testimonials";

// Sekcja opinii: poziomy pasek z opiniami (docelowo z Google). Dopóki lista jest pusta,
// pokazuje krótką informację zamiast zmyślonych recenzji.
export default function Testimonials() {
  const hasReviews = testimonials.length > 0;
  const rated = testimonials.filter((t) => t.rating);
  const avg =
    rated.length > 0
      ? rated.reduce((sum, t) => sum + (t.rating ?? 0), 0) / rated.length
      : null;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-content px-6">
        <SectionHead
          label="Opinie"
          title="Co mówią klienci"
          aside={
            avg !== null && (
              <p className="flex items-center gap-2 text-sm">
                <GoogleMark />
                <span className="font-medium tabular-nums">
                  {avg.toFixed(1).replace(".", ",")}
                </span>
                <Stars value={Math.round(avg)} />
                <span className="text-[var(--ink-soft)]">
                  ({rated.length})
                </span>
              </p>
            )
          }
        />
      </div>

      {hasReviews ? (
        // Pasek przewijany w poziomie (przeciągnij / scroll), z przyciąganiem do kart.
        <div className="mt-12 overflow-x-auto pb-4 [scrollbar-width:thin]">
          <ul className="mx-auto flex w-max snap-x snap-mandatory gap-4 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
            {testimonials.map((t, i) => (
              <li
                key={i}
                className="w-[min(22rem,80vw)] shrink-0 snap-start"
              >
                <figure className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
                  <div className="flex items-center justify-between gap-3">
                    {t.rating ? <Stars value={t.rating} /> : <span />}
                    {t.source === "google" && <GoogleMark />}
                  </div>
                  <blockquote className="mt-4 flex-1 leading-relaxed">
                    „{t.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm">
                    <span className="font-medium">{t.author}</span>
                    {t.role && (
                      <span className="text-[var(--ink-soft)]"> · {t.role}</span>
                    )}
                    {t.date && (
                      <span className="block text-xs text-[var(--ink-soft)]">
                        {t.date}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mx-auto max-w-content px-6">
          <Reveal>
            <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-dashed border-ink/20 px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:ml-[calc(13rem+2rem)]">
              <p className="flex items-center gap-3">
                <GoogleMark />
                <span>
                  Zbieram pierwsze opinie w&nbsp;Google. Wkrótce pojawią się
                  tutaj.
                </span>
              </p>
              {googleReviewUrl && (
                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline shrink-0 text-sm font-medium"
                >
                  Współpracowaliśmy? Zostaw opinię
                </a>
              )}
            </div>
          </Reveal>
        </div>
      )}

      {hasReviews && (googleProfileUrl || googleReviewUrl) && (
        <div className="mx-auto mt-6 flex max-w-content flex-wrap gap-x-6 gap-y-2 px-6 text-sm">
          {googleProfileUrl && (
            <a
              href={googleProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline font-medium"
            >
              Wszystkie opinie w Google
            </a>
          )}
          {googleReviewUrl && (
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noreferrer"
              className="link-underline text-[var(--ink-soft)]"
            >
              Wystaw opinię
            </a>
          )}
        </div>
      )}
    </section>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} na 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          aria-hidden="true"
          className={n <= value ? "fill-accent text-accent" : "text-ink/20"}
        />
      ))}
    </span>
  );
}

// Proste „G" jako oznaczenie źródła (bez oficjalnego logotypu).
function GoogleMark() {
  return (
    <span
      aria-label="Google"
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold"
    >
      G
    </span>
  );
}
