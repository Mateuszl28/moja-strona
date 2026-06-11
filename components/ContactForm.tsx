"use client";

import { useState } from "react";
import { Loader2, Send, Check } from "lucide-react";

type Status = "idle" | "loading" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      "d2b0fd15-e2b2-416e-ae64-86b9c9e10586";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Nowa wiadomość z portfolio",
          from_name: "Portfolio — formularz kontaktowy",
          ...data,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) {
        throw new Error(body.message || "Nie udało się wysłać wiadomości.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Coś poszło nie tak.");
    }
  }

  if (status === "ok") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper-soft)] px-5 py-6 text-[var(--ink)]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500/15 text-green-600">
          <Check size={18} />
        </span>
        <div>
          <p className="font-medium">Dzięki, wiadomość wysłana!</p>
          <p className="text-sm text-[var(--ink-soft)]">
            Odpiszę najszybciej jak się da.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:max-w-lg">
      {/* honeypot antyspamowy — niewidoczny dla ludzi */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Imię" name="name" type="text" placeholder="Jan Kowalski" />
        <Field
          label="E-mail"
          name="email"
          type="email"
          placeholder="jan@firma.pl"
        />
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="text-[var(--ink-soft)]">Wiadomość</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="W czym mogę pomóc?"
          className="resize-none rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-soft)]/60 focus:border-[var(--accent)]"
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm text-[var(--paper)] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Wysyłam…
          </>
        ) : (
          <>
            <Send size={16} />
            Wyślij wiadomość
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="text-[var(--ink-soft)]">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3.5 py-2.5 text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-soft)]/60 focus:border-[var(--accent)]"
      />
    </label>
  );
}
