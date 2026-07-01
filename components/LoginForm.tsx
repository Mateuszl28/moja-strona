"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { loginAction, type FormState } from "@/lib/actions";
import SubmitButton from "./SubmitButton";

const initial: FormState = {};

export default function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useFormState(loginAction, initial);

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}

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
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm outline-none transition-colors focus:border-accent/50"
        />
      </div>

      {state.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}

      <SubmitButton pendingLabel="Logowanie…" className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-medium text-[var(--paper)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">
        Zaloguj się
      </SubmitButton>

      <p className="pt-2 text-center text-sm text-[var(--ink-soft)]">
        Nie masz konta?{" "}
        <Link href="/register" className="text-accent hover:underline">
          Zarejestruj się
        </Link>
      </p>
    </form>
  );
}
