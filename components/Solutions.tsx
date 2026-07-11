"use client";

import Link from "next/link";
import { Check, ArrowUpRight, ShoppingCart } from "lucide-react";
import Reveal from "./Reveal";
import type { ShopProduct } from "@/lib/products";
import { zl } from "@/lib/pricing";
import { applyPromo } from "@/lib/promo";
import { useCart } from "./CartProvider";

const orderSummary = (
  en: boolean,
  name: string,
  price: number,
  features: string[],
  soon: boolean
) =>
  en
    ? [
        soon ? "Enquiry about an upcoming product" : "Ready-made solution order",
        `• Product: ${name} (${zl(price)})`,
        `• Includes: ${features.join(", ")}`,
      ].join("\n")
    : [
        soon
          ? "Zapytanie o zapowiadany produkt"
          : "Zamówienie gotowego rozwiązania",
        `• Produkt: ${name} (${zl(price)})`,
        `• Zawiera: ${features.join(", ")}`,
      ].join("\n");

export default function Solutions({
  en = false,
  items = [],
}: {
  en?: boolean;
  items?: ShopProduct[];
}) {
  const { add } = useCart();
  const t = en
    ? {
        empty: "Ready-made solutions are coming soon.",
        buy: "Buy now",
        add: "Add to cart",
        ask: "Ask about availability",
      }
    : {
        empty: "Gotowe rozwiązania pojawią się tutaj wkrótce.",
        buy: "Kup teraz",
        add: "Do koszyka",
        ask: "Zapytaj o dostępność",
      };
  const contactHref = en ? "/en/contact" : "/kontakt";
  const shopHref = en ? "/en/shop" : "/sklep";

  if (items.length === 0) {
    return (
      <Reveal>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center text-[var(--ink-soft)]">
          {t.empty}
        </div>
      </Reveal>
    );
  }

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {items.map((s, i) => {
        const name = en ? s.nameEn ?? s.name : s.name;
        const description = en ? s.descriptionEn ?? s.description : s.description;
        const features = en ? s.featuresEn ?? s.features : s.features;
        const badge = en ? s.badgeEn ?? s.badge : s.badge;
        const priceNote = en ? s.priceNoteEn ?? s.priceNote : s.priceNote;
        const priceAlt = en ? s.priceAltEn ?? s.priceAlt : s.priceAlt;
        const promo = applyPromo(s.price);
        const showPromo = promo.active && !s.soon;
        const href = `${shopHref}/${s.slug}`;
        return (
          <Reveal key={s.id} delay={i * 0.06} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-6 transition-colors sm:p-7 ${
                s.badge
                  ? "border-accent/50 bg-accent/[0.06]"
                  : "border-[var(--line)] bg-[var(--surface)]"
              }`}
            >
              {badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-[var(--paper)]">
                  {badge}
                </span>
              )}

              <h3 className="text-lg font-semibold">
                <Link
                  href={href}
                  className="transition-colors hover:text-accent"
                >
                  {name}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                {description}
              </p>

              <div className="mt-5">
                {showPromo && (
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm text-[var(--ink-soft)] line-through">
                      {zl(promo.original)}
                    </span>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                      −{promo.percent}%
                    </span>
                  </div>
                )}
                <p className="flex flex-wrap items-baseline gap-x-2 text-3xl font-semibold tracking-tight">
                  {zl(showPromo ? promo.final : s.price)}
                  {priceNote && (
                    <span className="text-sm font-normal text-[var(--ink-soft)]">
                      {priceNote}
                    </span>
                  )}
                </p>
                {priceAlt && (
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    {priceAlt}
                  </p>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5 border-t border-[var(--line)] pt-5 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {s.buyUrl ? (
                <a
                  href={s.buyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingCart size={16} />
                  {t.buy}
                </a>
              ) : s.soon ? (
                <Link
                  href={contactHref}
                  onClick={() =>
                    sessionStorage.setItem(
                      "wycena_summary",
                      orderSummary(en, name, s.price, features, true)
                    )
                  }
                  className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-accent/40"
                >
                  {t.ask}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    add({ slug: s.slug, name, price: s.price })
                  }
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
                >
                  <ShoppingCart size={16} />
                  {t.add}
                </button>
              )}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
