"use client";

import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[72vh] max-w-content flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
        Błąd
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Coś poszło nie tak
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-[var(--ink-soft)]">
        Przepraszam — wystąpił nieoczekiwany błąd. Spróbuj ponownie albo wróć na
        start.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
        >
          <RotateCcw size={16} />
          Spróbuj ponownie
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-accent/40"
        >
          <Home size={16} />
          Na start
        </Link>
      </div>
    </main>
  );
}
