import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <Reveal>
        <div className="border-t border-[var(--ink)] pt-10">
          <h2 className="max-w-[16ch] text-balance text-[clamp(2.5rem,6vw,5rem)] leading-[0.98]">
            Masz projekt? Porozmawiajmy o&nbsp;nim
            <span className="text-accent">.</span>
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--paper)] transition-colors hover:bg-accent"
            >
              Napisz do mnie
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="mailto:kontakt@programujzmateuszem.pl"
              className="link-underline text-sm font-medium"
            >
              kontakt@programujzmateuszem.pl
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
