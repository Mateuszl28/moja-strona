"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { registerAction, type FormState } from "@/lib/actions";
import SubmitButton from "./SubmitButton";

const initial: FormState = {};

export default function RegisterForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(registerAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Imię
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
          Hasło <span className="text-[var(--ink-soft)]">(min. 8 znaków)</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
        />
      </div>

      {state.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <SubmitButton pendingLabel="Tworzenie konta…" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
        Utwórz konto
      </SubmitButton>

      <p className="pt-2 text-center text-sm text-[var(--ink-soft)]">
        Masz już konto?{" "}
        <Link href="/login" className="text-accent hover:underline">
          Zaloguj się
        </Link>
      </p>
    </form>
  );
}
