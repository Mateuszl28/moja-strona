"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Send,
  CheckCircle2,
  Loader2,
  Quote,
} from "lucide-react";
import type { GuestbookMessage } from "@/lib/guestbook";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; message: string };

export default function Guestbook({
  messages,
}: {
  messages: GuestbookMessage[];
}) {
  const [form, setForm] = useState({ name: "", role: "", message: "" });
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.state === "sending") return;
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus({
          state: "error",
          message: data.error || "Nie udało się wysłać.",
        });
        return;
      }
      setStatus({ state: "success" });
      setForm({ name: "", role: "", message: "" });
      setTimeout(() => setStatus({ state: "idle" }), 6000);
    } catch {
      setStatus({ state: "error", message: "Problem z połączeniem." });
    }
  };

  const isSending = status.state === "sending";

  return (
    <section id="guestbook" className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-purple-400 mb-2">
            {"// guestbook"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Księga <span className="text-gradient">gości</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Byłeś, podobało się, masz feedback? Zostaw wpis. Pokażę tu te
            najfajniejsze.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={submit}
            className="md:col-span-2 glass rounded-2xl p-6 space-y-4 h-fit"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <MessageSquare size={16} className="text-white" />
              </div>
              <h3 className="font-bold">Zostaw wpis</h3>
            </div>

            <input
              type="text"
              required
              minLength={2}
              maxLength={60}
              disabled={isSending}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Imię / nick *"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm disabled:opacity-50"
            />

            <input
              type="text"
              maxLength={60}
              disabled={isSending}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="Kim jesteś? (opcjonalne)"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm disabled:opacity-50"
            />

            <textarea
              required
              rows={4}
              minLength={5}
              maxLength={500}
              disabled={isSending}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Twoja wiadomość *"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm resize-none disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isSending}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Wysyłanie...
                </>
              ) : (
                <>
                  Wyślij wpis
                  <Send size={14} />
                </>
              )}
            </button>

            {status.state === "success" && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-300">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                <span>
                  Wpis wysłany! Po krótkiej moderacji pojawi się obok.
                </span>
              </div>
            )}
            {status.state === "error" && (
              <p className="text-xs text-red-400">{status.message}</p>
            )}

            <p className="text-[10px] text-slate-500">
              Wpisy są moderowane (anty-spam). Pojawiają się tylko zaaprobowane.
            </p>
          </motion.form>

          <div className="md:col-span-3 space-y-3">
            {messages.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-slate-400 text-sm">
                  Bądź pierwszy! Zostaw wpis po lewej.
                </p>
              </div>
            ) : (
              messages.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="glass rounded-2xl p-5"
                >
                  <Quote
                    size={20}
                    className="text-purple-400/40 mb-2"
                  />
                  <p className="text-sm text-slate-200 leading-relaxed mb-4">
                    {m.message}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-xs font-bold">
                        {m.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{m.name}</p>
                        {m.role && (
                          <p className="text-[10px] text-slate-500 font-mono">
                            {m.role}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-600 font-mono">
                      {new Date(m.date).toLocaleDateString("pl-PL")}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
