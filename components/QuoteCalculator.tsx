"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Copy, ArrowUpRight } from "lucide-react";
import {
  projectTypes,
  featuresList,
  designOptions,
  timelineOptions,
  PAGE_PRICE,
  INCLUDED_PAGES,
  zl,
} from "@/lib/pricing";

// Zaokrąglanie widełek do 10 zł (ceny bywają niskie — 100 zł by je zawyżało).
const round10 = (n: number) => Math.round(n / 10) * 10;

export default function QuoteCalculator() {
  const [typeId, setTypeId] = useState<string>(projectTypes[0].id);
  const [pages, setPages] = useState<number>(1);
  const [features, setFeatures] = useState<string[]>([]);
  const [designId, setDesignId] = useState<string>(designOptions[0].id);
  const [timelineId, setTimelineId] = useState<string>(timelineOptions[0].id);
  const [copied, setCopied] = useState(false);

  const type = projectTypes.find((t) => t.id === typeId)!;
  const design = designOptions.find((d) => d.id === designId)!;
  const timeline = timelineOptions.find((t) => t.id === timelineId)!;

  const toggleFeature = (id: string) =>
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const { low, high, weeks, lines, hasTbd } = useMemo(() => {
    const extraPages = Math.max(0, pages - INCLUDED_PAGES);
    const lines: { label: string; price: number; note?: string }[] = [
      { label: type.label, price: type.base },
    ];
    if (extraPages > 0) {
      lines.push({
        label: `Podstrony (+${extraPages})`,
        price: extraPages * PAGE_PRICE,
      });
    }
    for (const f of featuresList) {
      if (!features.includes(f.id)) continue;
      lines.push(
        f.tbd
          ? { label: f.label, price: 0, note: "do ustalenia" }
          : { label: f.label, price: f.price }
      );
    }
    if (design.price > 0) lines.push({ label: design.label, price: design.price });

    const subtotal = lines.reduce((sum, l) => sum + l.price, 0);
    const surcharge = subtotal * (timeline.mult - 1);
    if (surcharge > 0) {
      lines.push({
        label: `Ekspres (+${Math.round((timeline.mult - 1) * 100)}%)`,
        price: surcharge,
      });
    }
    const total = subtotal + surcharge;

    const weeks =
      type.weeks + Math.ceil(features.length / 3) + (designId === "custom" ? 1 : 0);

    const hasTbd = featuresList.some((f) => features.includes(f.id) && f.tbd);

    return { low: round10(total), high: round10(total * 1.25), weeks, lines, hasTbd };
  }, [type, pages, features, design, timeline, designId]);

  const summaryText = useMemo(() => {
    const parts = [
      `Rodzaj: ${type.label}`,
      `Podstrony: ${pages}`,
      `Funkcje: ${
        features.length
          ? featuresList
              .filter((f) => features.includes(f.id))
              .map((f) => f.label)
              .join(", ")
          : "brak dodatkowych"
      }`,
      `Grafika: ${design.label}`,
      `Termin: ${timeline.label}`,
      `Szacowana wycena: ${zl(low)} – ${zl(high)}${
        hasTbd ? " + pozycje do ustalenia" : ""
      } (orientacyjnie)`,
      `Szacowany czas: ok. ${weeks} tyg.`,
    ];
    return "Zapytanie o wycenę\n" + parts.map((p) => `• ${p}`).join("\n");
  }, [type, pages, features, design, timeline, low, high, weeks, hasTbd]);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* schowek niedostępny — trudno, użytkownik ma link do kontaktu */
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
      {/* ── FORMULARZ ── */}
      <div className="space-y-8">
        {/* Rodzaj projektu */}
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Rodzaj projektu</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {projectTypes.map((t) => {
              const active = t.id === typeId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTypeId(t.id)}
                  aria-pressed={active}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    active
                      ? "border-accent/50 bg-accent/10"
                      : "border-[var(--line)] bg-[var(--surface)] hover:border-accent/30 hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <span className="block font-medium">{t.label}</span>
                  <span className="mt-1 block text-sm text-[var(--ink-soft)]">
                    {t.desc}
                  </span>
                  <span className="mt-2 block font-mono text-xs text-accent">
                    od {zl(t.base)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Liczba podstron */}
        <div>
          <label htmlFor="pages" className="mb-3 block text-sm font-medium">
            Liczba podstron
          </label>
          <div className="flex items-center gap-3">
            <input
              id="pages"
              type="range"
              min={1}
              max={20}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              className="h-1 w-full max-w-xs cursor-pointer appearance-none rounded-full bg-[var(--paper-soft)] accent-accent"
            />
            <span className="w-16 font-mono text-sm tabular-nums text-[var(--ink-soft)]">
              {pages}{pages >= 20 ? "+" : ""}
            </span>
          </div>
          <p className="mt-2 text-xs text-[var(--ink-soft)]">
            Pierwsza podstrona w cenie bazowej, każda kolejna +{zl(PAGE_PRICE)}.
          </p>
        </div>

        {/* Funkcje */}
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Dodatkowe funkcje</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {featuresList.map((f) => {
              const active = features.includes(f.id);
              return (
                <label
                  key={f.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                    active
                      ? "border-accent/50 bg-accent/10"
                      : "border-[var(--line)] bg-[var(--surface)] hover:border-accent/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => toggleFeature(f.id)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      active
                        ? "border-accent bg-accent text-[var(--paper)]"
                        : "border-[var(--ink-soft)]/50"
                    }`}
                    aria-hidden="true"
                  >
                    {active && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span className="flex-1">{f.label}</span>
                  <span className="font-mono text-xs text-[var(--ink-soft)]">
                    {f.tbd ? "do ustalenia" : `+${zl(f.price)}`}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Grafika */}
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Projekt graficzny</legend>
          <div className="flex flex-wrap gap-2">
            {designOptions.map((d) => {
              const active = d.id === designId;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDesignId(d.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-accent/50 bg-accent/10 text-[var(--ink)]"
                      : "border-[var(--line)] text-[var(--ink-soft)] hover:border-accent/30 hover:text-[var(--ink)]"
                  }`}
                >
                  {d.label}
                  {d.price > 0 && (
                    <span className="ml-2 font-mono text-xs text-[var(--ink-soft)]">
                      +{zl(d.price)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Termin */}
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Termin realizacji</legend>
          <div className="flex flex-wrap gap-2">
            {timelineOptions.map((t) => {
              const active = t.id === timelineId;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTimelineId(t.id)}
                  aria-pressed={active}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    active
                      ? "border-accent/50 bg-accent/10 text-[var(--ink)]"
                      : "border-[var(--line)] text-[var(--ink-soft)] hover:border-accent/30 hover:text-[var(--ink)]"
                  }`}
                >
                  {t.label}
                  {t.mult > 1 && (
                    <span className="ml-2 font-mono text-xs text-[var(--ink-soft)]">
                      +{Math.round((t.mult - 1) * 100)}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* ── PODSUMOWANIE (sticky) ── */}
      <div className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-accent/20 bg-[var(--paper-soft)] p-6 sm:p-7">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Szacowana wycena
          </p>
          <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">
            {zl(low)}{" "}
            <span className="text-[var(--ink-soft)]">–</span> {zl(high)}
          </p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Szacowany czas: ok. {weeks} tyg.
          </p>
          {hasTbd && (
            <p className="mt-1 text-sm text-accent">
              + pozycje do ustalenia (np. SEO)
            </p>
          )}

          <ul className="mt-6 space-y-2 border-t border-[var(--line)] pt-5 text-sm">
            {lines.map((l, i) => (
              <li key={i} className="flex items-baseline justify-between gap-4">
                <span className="text-[var(--ink-soft)]">{l.label}</span>
                <span className="shrink-0 font-mono tabular-nums">
                  {l.note ?? zl(l.price)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
            >
              Wyślij zapytanie
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <button
              type="button"
              onClick={copySummary}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm text-[var(--ink-soft)] transition-colors hover:border-accent/40 hover:text-[var(--ink)]"
            >
              {copied ? (
                <>
                  <Check size={15} /> Skopiowano — wklej w formularzu
                </>
              ) : (
                <>
                  <Copy size={15} /> Kopiuj podsumowanie
                </>
              )}
            </button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-[var(--ink-soft)]">
            Wycena jest orientacyjna i zależy od szczegółów. Ostateczną kwotę i
            termin ustalamy po krótkiej rozmowie.
          </p>
        </div>
      </div>
    </div>
  );
}
