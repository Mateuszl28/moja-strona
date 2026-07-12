import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import type { ShopProduct } from "@/lib/products";
import { zl } from "@/lib/pricing";
import { applyPromo } from "@/lib/promo";
import AddToCartButton from "./AddToCartButton";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://programujzmateuszem.pl";

// Widok pojedynczego produktu (serwerowy). Wspólny dla /sklep/[slug] i /en/shop/[slug].
export default function ProductView({
  product,
  en = false,
}: {
  product: ShopProduct;
  en?: boolean;
}) {
  const name = en ? product.nameEn ?? product.name : product.name;
  const description = en
    ? product.descriptionEn ?? product.description
    : product.description;
  const features = en ? product.featuresEn ?? product.features : product.features;
  const badge = en ? product.badgeEn ?? product.badge : product.badge;
  const priceNote = en ? product.priceNoteEn ?? product.priceNote : product.priceNote;
  const priceAlt = en ? product.priceAltEn ?? product.priceAlt : product.priceAlt;

  const promo = applyPromo(product.price);
  const showPromo = promo.active && !product.soon;

  const t = en
    ? {
        back: "Back to shop",
        order: "Order",
        ask: "Ask about availability",
        soonNote: "This product isn't available for purchase yet.",
        orderNote: "Your order lands in your panel — we settle payment afterwards.",
        promoLine: `Promo price −${promo.percent}% · save ${zl(promo.saved)}`,
      }
    : {
        back: "Wróć do sklepu",
        order: "Zamawiam",
        ask: "Zapytaj o dostępność",
        soonNote: "Ten produkt nie jest jeszcze dostępny do kupienia.",
        orderNote: "Zamówienie trafia do Twojego panelu — płatność ustalamy po jego złożeniu.",
        promoLine: `Cena promocyjna −${promo.percent}% · oszczędzasz ${zl(promo.saved)}`,
      };

  const shopHref = en ? "/en/shop" : "/sklep";
  const contactHref = en ? "/en/contact" : "/kontakt";

  const url = `${BASE_URL}${shopHref}/${product.slug}`;
  const offerPrice = showPromo ? promo.final : product.price;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku: product.slug,
    brand: { "@type": "Brand", name: "Mateusz Łagocki Software Studio" },
    url,
    ...(offerPrice > 0 && {
      offers: {
        "@type": "Offer",
        price: offerPrice,
        priceCurrency: "PLN",
        availability: product.soon
          ? "https://schema.org/PreOrder"
          : "https://schema.org/InStock",
        url,
      },
    }),
  };

  return (
    <main className="pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="mx-auto max-w-content px-6 pb-24 pt-8">
        <Link
          href={shopHref}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft size={15} />
          {t.back}
        </Link>

        <div className="mt-8 grid gap-3 lg:grid-cols-[1.3fr_1fr]">
          {/* Opis + funkcje */}
          <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
            {badge && (
              <span className="inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-[var(--paper)]">
                {badge}
              </span>
            )}
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              {name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
              {description}
            </p>

            {features.length > 0 && (
              <ul className="mt-8 space-y-3 border-t border-[var(--line)] pt-6 text-sm">
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
            )}
          </div>

          {/* Karta zamówienia */}
          <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border border-accent/20 bg-[var(--paper-soft)] p-6 sm:p-8">
            <div className="glow-warm pointer-events-none absolute inset-x-0 -top-10 h-40 opacity-70" />

            <div className="relative">
              {showPromo && (
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-sm text-[var(--ink-soft)] line-through">
                    {zl(promo.original)}
                  </span>
                  <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                    −{promo.percent}%
                  </span>
                </div>
              )}
              <p className="flex flex-wrap items-baseline gap-x-2 text-4xl font-semibold tracking-tight">
                {zl(showPromo ? promo.final : product.price)}
                {priceNote && (
                  <span className="text-sm font-normal text-[var(--ink-soft)]">
                    {priceNote}
                  </span>
                )}
              </p>
              {priceAlt && (
                <p className="mt-1 text-sm text-[var(--ink-soft)]">{priceAlt}</p>
              )}
              {showPromo && (
                <p className="mt-2 text-xs font-medium text-accent">{t.promoLine}</p>
              )}
            </div>

            {product.soon ? (
              <div className="relative mt-auto">
                <Link
                  href={contactHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-accent/40"
                >
                  {t.ask}
                </Link>
                <p className="mt-3 text-xs text-[var(--ink-soft)]">{t.soonNote}</p>
              </div>
            ) : (
              <div className="relative mt-auto">
                <AddToCartButton
                  slug={product.slug}
                  name={name}
                  price={product.price}
                />
                <p className="mt-3 text-xs text-[var(--ink-soft)]">{t.orderNote}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
