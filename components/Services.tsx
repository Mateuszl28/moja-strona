import Link from "next/link";
import {
  Layout,
  ShoppingBag,
  AppWindow,
  Smartphone,
  Puzzle,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { projectTypes, zl } from "@/lib/pricing";

// Ikona per rodzaj usługi (id zgodne z lib/pricing).
const icons: Record<string, LucideIcon> = {
  strona: Layout,
  sklep: ShoppingBag,
  webapp: AppWindow,
  mobile: Smartphone,
  inne: Puzzle,
};

export default function Services() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Usługi
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Co dla Ciebie zbuduję
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">
          Od prostej wizytówki po sklep i&nbsp;aplikację. Ceny orientacyjne —
          dokładną policzysz w&nbsp;kalkulatorze.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {projectTypes.map((s, i) => {
          const Icon = icons[s.id] ?? Puzzle;
          return (
            <Reveal key={s.id} delay={i * 0.05} className="h-full">
              <Link
                href="/wycena"
                className="group flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:bg-[var(--surface-hover)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--paper-soft)] text-accent transition-colors group-hover:bg-accent group-hover:text-[var(--paper)]">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-medium">{s.label}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {s.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-accent">
                  od {zl(s.base)}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <Link
          href="/wycena"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--ink)] transition-colors hover:text-accent"
        >
          Policz dokładną wycenę
          <ArrowUpRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}
