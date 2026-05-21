"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle2, Loader2 } from "lucide-react";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; already?: boolean }
  | { state: "error"; message: string };

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.state === "sending") return;
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        alreadySubscribed?: boolean;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setStatus({
          state: "error",
          message: data.error || "Nie udało się zapisać.",
        });
        return;
      }
      setStatus({ state: "success", already: data.alreadySubscribed });
      setEmail("");
    } catch {
      setStatus({ state: "error", message: "Problem z połączeniem." });
    }
  };

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-2xl mx-auto glass rounded-3xl p-8 md:p-10 text-center">
        <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 items-center justify-center mb-4">
          <Mail size={20} className="text-white" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Newsletter <span className="text-gradient">co jakiś czas</span>
        </h3>
        <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
          Zostaw email — wyślę Ci wiadomość gdy dodam nowy projekt, post na
          blogu, albo dowiem się czegoś co warto przekazać. Bez spamu.
        </p>

        <form
          onSubmit={onSubmit}
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="twoj@email.com"
            disabled={status.state === "sending"}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status.state === "sending"}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status.state === "sending" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Zapisz się <Send size={14} />
              </>
            )}
          </button>
        </form>

        {status.state === "success" && (
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-green-400">
            <CheckCircle2 size={16} />
            {status.already
              ? "Już jesteś zapisany. Dzięki!"
              : "Zapisano! Sprawdź skrzynkę."}
          </div>
        )}
        {status.state === "error" && (
          <p className="mt-4 text-sm text-red-400">{status.message}</p>
        )}
      </div>
    </section>
  );
}
