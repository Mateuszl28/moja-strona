import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[72vh] max-w-content flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
        Nie ma takiej strony
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-[var(--ink-soft)]">
        Strona, której szukasz, nie istnieje albo została przeniesiona. Wróćmy
        na właściwy tor.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5"
      >
        <ArrowLeft
          size={16}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Wróć na start
      </Link>
    </main>
  );
}
