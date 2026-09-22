import Link from "next/link";
import Reveal from "./Reveal";
import { audits, zl } from "@/lib/pricing";

// Audyty w stałej cenie — osobno od kalkulatora (strona /wycena i /en/quote).
export default function Audits({ en = false }: { en?: boolean }) {
  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-8">
      <Reveal>
        <p className="eyebrow">{en ? "Audits" : "Audyty"}</p>
        <h2 className="mt-4 text-balance text-3xl sm:text-4xl">
          {en ? "Already have a site? Let me check it" : "Masz już stronę? Sprawdzę ją"}
        </h2>
      </Reveal>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {audits.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.05} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6">
              <h3 className="text-xl">{en ? a.labelEn : a.label}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                {en ? a.descEn : a.desc}
              </p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <span className="font-display text-3xl tabular-nums">
                  {en ? `PLN ${a.price.toLocaleString("en-US")}` : zl(a.price)}
                </span>
                <Link
                  href={en ? "/en/contact" : "/kontakt"}
                  className="link-underline text-sm font-medium"
                >
                  {en ? "Order an audit" : "Zamów audyt"}
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
