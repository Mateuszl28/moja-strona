"use client";

import { useState } from "react";
import { Loader2, Check, Mail } from "lucide-react";

type Status = "idle" | "loading" | "ok" | "error";

// Prosty zapis „powiadom o nowych wpisach" — wysyła adres przez web3forms na
// mój e-mail (bez backendu i listy mailingowej).
export default function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email");
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setStatus("error");
      setError("Zapis chwilowo niedostępny — napisz na maila.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Nowy zapis na powiadomienia o wpisach",
          from_name: "Portfolio — newsletter",
          email,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) throw new Error(body.message || "Nie udało się zapisać.");
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Coś poszło nie tak.");
    }
  }

  return (
    <div className="rounded-2xl border border-accent/20 bg-[var(--paper-soft)] p-6 sm:p-8">
      <h2 className="text-xl font-semibold tracking-tight">Nowe wpisy na maila</h2>
      <p className="mt-2 text-sm text-[var(--ink-soft)]">
        Zostaw adres, a dam znać, gdy pojawi się coś nowego. Bez spamu.
      </p>

      {status === "ok" ? (
        <div className="mt-5 inline-flex items-center gap-2 text-sm text-green-400">
          <Check size={16} /> Zapisano — dzięki!
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="twoj@email.pl"
              className="w-full rounded-full border border-[var(--line)] bg-[var(--paper)] py-2.5 pl-10 pr-4 text-sm text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-soft)]/60 focus:border-[var(--accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--paper)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : "Zapisz się"}
          </button>
        </form>
      )}

      {status === "error" && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
