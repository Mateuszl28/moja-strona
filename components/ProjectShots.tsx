"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Shot } from "@/lib/projects";

// Miniatury zrzutów ekranu w karcie projektu + pełny podgląd po kliknięciu.
export default function ProjectShots({
  shots,
  title,
  en = false,
}: {
  shots: Shot[];
  title: string;
  en?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const captionOf = (s: Shot) => (en ? s.captionEn ?? s.caption : s.caption);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    // blokada scrolla pod nakładką
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const current = open === null ? null : shots[open];

  const overlay = current && (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
    >
      <figure onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={captionOf(current)}
          className="w-full rounded-xl border border-white/10"
        />
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm text-white/70">
          <span>{captionOf(current)}</span>
          <span className="shrink-0 font-mono text-xs tabular-nums text-white/45">
            {(open ?? 0) + 1}/{shots.length}
          </span>
        </figcaption>
      </figure>

      {shots.length > 1 && (
        <>
          <button
            type="button"
            aria-label={en ? "Previous" : "Poprzedni"}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/60 transition-colors hover:text-white sm:left-5"
          >
            <ChevronLeft size={26} />
          </button>
          <button
            type="button"
            aria-label={en ? "Next" : "Następny"}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-3 text-white/60 transition-colors hover:text-white sm:right-5"
          >
            <ChevronRight size={26} />
          </button>
        </>
      )}

      <button
        type="button"
        aria-label={en ? "Close" : "Zamknij"}
        onClick={close}
        className="absolute right-3 top-3 rounded-full p-2 text-white/60 transition-colors hover:text-white sm:right-5 sm:top-5"
      >
        <X size={22} />
      </button>
    </div>
  );

  return (
    <>
      <ul className="mt-5 grid grid-cols-3 gap-1.5">
        {shots.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={captionOf(s)}
              className="block w-full overflow-hidden rounded-lg border border-[var(--line)] transition-colors hover:border-accent/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={captionOf(s)}
                loading="lazy"
                width={1280}
                height={720}
                className="aspect-video w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Podgląd portalem do <body>: karta ma transform i backdrop-blur, więc
          position: fixed liczyłoby się względem karty, a nie okna. */}
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
