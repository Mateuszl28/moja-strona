"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
} from "lucide-react";

type Msg = { role: "user" | "model"; content: string };

const STARTERS = [
  "Jakie technologie zna Mateusz?",
  "Opowiedz o projekcie Sentra AI",
  "Czy Mateusz może pracować zdalnie?",
  "Pokaż mi jego doświadczenie",
];

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    const userMsg: Msg = { role: "user", content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reply?: string;
        error?: string;
      };

      if (!res.ok || !data.ok || !data.reply) {
        setError(data.error || "Nie udało się uzyskać odpowiedzi.");
        setMessages((m) => m.slice(0, -1));
        return;
      }

      setMessages((m) => [...m, { role: "model", content: data.reply! }]);
    } catch {
      setError("Problem z połączeniem.");
      setMessages((m) => m.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Otwórz chat z AI"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:-translate-y-0.5 transition-all group"
      >
        <div className="relative">
          <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        </div>
        <span className="hidden sm:inline">Zapytaj AI</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl border border-white/10 bg-[#13131a]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[600px] max-h-[700px]"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 ring-2 ring-[#13131a]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">AI Asystent</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      Gemini 2.0 Flash
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                  aria-label="Zamknij"
                >
                  <X size={20} />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
              >
                {messages.length === 0 && (
                  <div>
                    <div className="text-center py-6">
                      <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 items-center justify-center mb-4">
                        <Sparkles size={24} className="text-white" />
                      </div>
                      <h3 className="font-bold mb-2">Cześć! 👋</h3>
                      <p className="text-sm text-slate-400 leading-relaxed max-w-xs mx-auto">
                        Jestem asystentem AI. Zapytaj mnie o Mateusza —
                        projekty, doświadczenie, technologie. Co Cię ciekawi?
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-wider font-mono text-slate-500 mb-2">
                        Przykłady:
                      </p>
                      {STARTERS.map((s) => (
                        <button
                          key={s}
                          onClick={() => send(s)}
                          className="w-full text-left px-4 py-2.5 rounded-xl glass glass-hover text-sm text-slate-300 hover:text-white transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2.5 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "model" && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
                        <Bot size={14} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-tr-sm"
                          : "bg-white/5 text-slate-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <User size={14} className="text-slate-400" />
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-white" />
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-center text-xs text-red-400 px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    {error}
                  </div>
                )}
              </div>

              <form
                onSubmit={onSubmit}
                className="border-t border-white/5 p-3 flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder="Napisz pytanie..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-sm disabled:opacity-50 max-h-32"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>

              <div className="px-4 pb-3 text-[10px] text-slate-600 font-mono text-center">
                AI może czasem się mylić. Sprawdź ważne info bezpośrednio.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
