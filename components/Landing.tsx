import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteShot from "./SiteShot";
import { projects } from "@/lib/projects";

// Prawdziwe, działające realizacje ze zrzutem — kolaż pod nagłówkiem.
const shots = projects.filter((p) => p.cover && p.href).slice(0, 3);

// Komponent serwerowy — treść hero jest w HTML od razu (lepszy LCP). Animacja wejścia
// to CSS (.fade-rise) ze staggerem przez animation-delay, bez "use client".
export default function Landing() {
  const [main, ...side] = shots;

  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-32 sm:pb-24 sm:pt-40">
      <p
        className="fade-rise flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--ink-soft)]"
        style={{ animationDelay: "0s" }}
      >
        <span className="inline-flex items-center gap-2 font-medium text-[var(--ink)]">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Przyjmuję nowe projekty
        </span>
        <span aria-hidden>/</span>
        <span>
          Mateusz Łagocki, frontend developer z{" "}
          <Link
            href="/strony-internetowe-leszno"
            className="underline decoration-[var(--line)] underline-offset-2 transition-colors hover:text-[var(--ink)]"
          >
            Leszna
          </Link>
        </span>
      </p>

      <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1fr_20rem]">
        <h1
          className="fade-rise text-balance text-[clamp(2.75rem,7.5vw,6.5rem)] font-semibold leading-[0.95]"
          style={{ animationDelay: "0.08s" }}
        >
          Strony i&nbsp;sklepy, które pracują na Twój biznes
          <span className="text-accent">.</span>
        </h1>

        <div
          className="fade-rise lg:pb-3"
          style={{ animationDelay: "0.16s" }}
        >
          <p className="text-lg leading-relaxed">
            Projektuję i&nbsp;koduję w&nbsp;React i&nbsp;Next.js. Rozmawiasz
            bezpośrednio z&nbsp;osobą, która pisze kod, bez agencji
            i&nbsp;pośredników.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-accent"
            >
              Porozmawiajmy
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <Link href="/wycena" className="link-underline text-sm font-medium">
              Sprawdź ceny
            </Link>
          </div>
        </div>
      </div>

      {main && (
        <div
          className="fade-rise mt-16 grid gap-4 md:grid-cols-12"
          style={{ animationDelay: "0.26s" }}
        >
          <a
            href={main.href}
            target="_blank"
            rel="noreferrer"
            className="group md:col-span-8"
          >
            <SiteShot
              src={main.cover!}
              href={main.href}
              alt={`Strona ${main.title}`}
              priority
              sizes="(min-width: 768px) 66vw, 100vw"
            />
          </a>
          {/* Na telefonie tylko główny zrzut — reszta jest niżej w „Wybranych projektach". */}
          <div className="hidden gap-4 md:col-span-4 md:grid md:grid-rows-2">
            {side.map((p) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group min-h-0"
              >
                <SiteShot
                  src={p.cover!}
                  href={p.href}
                  alt={`Strona ${p.title}`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  fill
                />
              </a>
            ))}
          </div>
          <p className="hidden text-sm text-[var(--ink-soft)] md:col-span-12 md:block">
            Na zrzutach: {shots.map((p) => p.title).join(", ")}. Wszystkie działają,
            możesz je kliknąć.
          </p>
        </div>
      )}
    </section>
  );
}
