"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "./CartProvider";
import { cartTotals } from "@/lib/cart";
import { zl } from "@/lib/pricing";
import { checkoutAction } from "@/lib/actions";

export default function CartView({ en = false }: { en?: boolean }) {
  const { items, setQty, remove, clear, hydrated } = useCart();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  const t = en
    ? {
        title: "Cart",
        empty: "Your cart is empty.",
        toShop: "Browse the shop",
        each: "each",
        remove: "Remove",
        clear: "Clear cart",
        subtotal: "Subtotal",
        discount: "Discount",
        total: "Total",
        checkout: "Place order",
        checkingOut: "Placing order…",
        note: "You'll confirm details and payment after ordering.",
        loading: "Loading cart…",
      }
    : {
        title: "Koszyk",
        empty: "Twój koszyk jest pusty.",
        toShop: "Przejdź do sklepu",
        each: "za szt.",
        remove: "Usuń",
        clear: "Wyczyść koszyk",
        subtotal: "Wartość",
        discount: "Rabat",
        total: "Do zapłaty",
        checkout: "Złóż zamówienie",
        checkingOut: "Składanie…",
        note: "Szczegóły i płatność ustalimy po złożeniu zamówienia.",
        loading: "Wczytywanie koszyka…",
      };

  const shopHref = en ? "/en/shop" : "/sklep";
  const termsHref = en ? "/en/terms" : "/regulamin";
  const privacyHref = en ? "/en/privacy" : "/polityka-prywatnosci";
  const totals = cartTotals(items);

  function checkout() {
    if (!accepted) return;
    setError(null);
    startTransition(async () => {
      const res = await checkoutAction(JSON.stringify(items));
      if (res.needLogin) {
        const next = en ? "/en/cart" : "/koszyk";
        router.push(`/login?next=${encodeURIComponent(next)}`);
        return;
      }
      if (res.error) {
        setError(res.error);
        return;
      }
      if (res.orderId) {
        clear();
        router.push(`/panel/zamowienia/${res.orderId}`);
      }
    });
  }

  return (
    <main className="pt-28">
      <section className="mx-auto max-w-content px-6 pb-24 pt-8">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {t.title}
        </h1>

        {!hydrated ? (
          <p className="mt-8 text-sm text-[var(--ink-soft)]">{t.loading}</p>
        ) : items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-6 py-16 text-center">
            <p className="text-[var(--ink-soft)]">{t.empty}</p>
            <Link
              href={shopHref}
              className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-[var(--ink)]"
            >
              {t.toShop}
              <ArrowRight size={15} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-3 lg:grid-cols-[1.4fr_1fr]">
            {/* Pozycje */}
            <ul className="space-y-2">
              {totals.lines.map((l) => (
                <li
                  key={l.slug}
                  className="flex flex-wrap items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-4"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`${shopHref}/${l.slug}`}
                      className="font-medium transition-colors hover:text-accent"
                    >
                      {l.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                      {zl(l.unitFinal)} {t.each}
                      {l.unitFinal !== l.price && (
                        <span className="ml-1.5 line-through">{zl(l.price)}</span>
                      )}
                    </p>
                  </div>

                  <div className="inline-flex items-center rounded-full border border-[var(--line)]">
                    <button
                      type="button"
                      onClick={() => setQty(l.slug, l.qty - 1)}
                      disabled={l.qty <= 1}
                      aria-label="−"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] disabled:opacity-40"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-[2rem] text-center text-sm tabular-nums">
                      {l.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(l.slug, l.qty + 1)}
                      aria-label="+"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="w-20 text-right font-semibold tabular-nums">
                    {zl(l.lineFinal)}
                  </div>

                  <button
                    type="button"
                    onClick={() => remove(l.slug)}
                    aria-label={t.remove}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-soft)] transition-colors hover:text-red-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}

              <button
                type="button"
                onClick={clear}
                className="mt-1 text-xs text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
              >
                {t.clear}
              </button>
            </ul>

            {/* Podsumowanie */}
            <div className="h-fit rounded-2xl border border-accent/20 bg-[var(--paper-soft)] p-6">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between text-[var(--ink-soft)]">
                  <dt>{t.subtotal}</dt>
                  <dd className="tabular-nums">{zl(totals.subtotal)}</dd>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-accent">
                    <dt>{t.discount}</dt>
                    <dd className="tabular-nums">−{zl(totals.discount)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between border-t border-[var(--line)] pt-3 text-base font-semibold">
                  <dt>{t.total}</dt>
                  <dd className="text-xl tabular-nums">{zl(totals.total)}</dd>
                </div>
              </dl>

              {error && (
                <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </p>
              )}

              <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[var(--ink-soft)]">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                />
                <span>
                  {en ? "I accept the " : "Akceptuję "}
                  <Link
                    href={termsHref}
                    className="text-[var(--ink)] underline underline-offset-2 hover:text-accent"
                  >
                    {en ? "terms" : "regulamin"}
                  </Link>
                  {en ? " and the " : " i "}
                  <Link
                    href={privacyHref}
                    className="text-[var(--ink)] underline underline-offset-2 hover:text-accent"
                  >
                    {en ? "privacy policy" : "politykę prywatności"}
                  </Link>
                  .
                </span>
              </label>

              <button
                type="button"
                onClick={checkout}
                disabled={pending || !accepted}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <ShoppingCart size={16} />
                {pending ? t.checkingOut : t.checkout}
              </button>
              <p className="mt-3 text-xs text-[var(--ink-soft)]">{t.note}</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
