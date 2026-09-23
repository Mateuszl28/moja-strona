import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { audits, projectTypes, zl } from "@/lib/pricing";

// Rodzaje z własną stroną usługi — reszta prowadzi do kalkulatora.
const SERVICE_PAGES: Record<string, string> = {
  strona: "/uslugi/strony-internetowe",
  sklep: "/uslugi/sklepy-internetowe",
};

export default function Services() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <SectionHead
        label="Usługi"
        title="Co mogę dla Ciebie zbudować"
        aside={
          <Link
            href="/wycena"
            className="link-underline shrink-0 text-sm font-medium"
          >
            Policz dokładną wycenę
          </Link>
        }
      >
        Od prostej wizytówki po sklep i&nbsp;aplikację. Ceny są orientacyjne,
        dokładną kwotę policzysz w&nbsp;kalkulatorze.
      </SectionHead>

      <ul className="mt-12 md:ml-[calc(13rem+2rem)]">
        {projectTypes.map((s, i) => (
          <li key={s.id} className="border-b border-[var(--line)] first:border-t">
            <Reveal delay={i * 0.04}>
              <Link
                href={SERVICE_PAGES[s.id] ?? "/wycena"}
                className="group grid items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[1fr_auto]"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                  <h3 className="text-xl transition-colors group-hover:text-accent sm:w-56 sm:shrink-0">
                    {s.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                    {s.desc}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm tabular-nums">
                  od {zl(s.base)}
                  <ArrowUpRight
                    size={15}
                    className="text-[var(--ink-soft)] transition-colors group-hover:text-accent"
                  />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-14 md:ml-[calc(13rem+2rem)]">
        <Reveal>
          <p className="text-sm text-[var(--ink-soft)]">
            Audyty istniejących stron (stała cena)
          </p>
        </Reveal>
        <ul className="mt-4">
          {audits.map((a, i) => (
            <li key={a.id} className="border-b border-[var(--line)] first:border-t">
              <Reveal delay={i * 0.04}>
                <Link
                  href={`/audyt/${a.id}`}
                  className="group grid items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[1fr_auto]"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <h3 className="text-xl transition-colors group-hover:text-accent sm:w-56 sm:shrink-0">
                      {a.label}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                      {a.desc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 whitespace-nowrap text-sm tabular-nums">
                    {zl(a.price)}
                    <ArrowUpRight
                      size={15}
                      className="text-[var(--ink-soft)] transition-colors group-hover:text-accent"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
