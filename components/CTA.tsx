import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="mx-auto max-w-content px-6 py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--ink)] px-8 py-14 text-center text-[var(--paper)] sm:py-20">
          <div className="glow-warm absolute inset-x-0 -top-10 h-60 opacity-70" />
          <h2 className="relative mx-auto max-w-xl text-balance text-2xl font-semibold leading-snug sm:text-3xl">
            Masz projekt albo szukasz frontendowca?
            <span className="text-accent"> Zbudujmy coś razem.</span>
          </h2>
          <div className="relative mt-8">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--paper)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-transform hover:-translate-y-0.5"
            >
              Napisz do mnie
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
