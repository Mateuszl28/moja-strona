"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-purple-400 mb-2">{"// 04."}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pogadajmy <span className="text-gradient">o twoim projekcie</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Masz pomysł, pytanie, albo po prostu chcesz się przywitać? Pisz
            śmiało — odpowiadam zwykle w ciągu 24h.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 space-y-4"
          >
            <a
              href="mailto:hello@example.com"
              className="block glass glass-hover rounded-2xl p-5 transition-all"
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <Mail size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium">hello@example.com</p>
                </div>
              </div>
            </a>

            <a
              href="#"
              className="block glass glass-hover rounded-2xl p-5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <Github size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">GitHub</p>
                  <p className="text-sm font-medium">@mateuszlagocki</p>
                </div>
              </div>
            </a>

            <a
              href="#"
              className="block glass glass-hover rounded-2xl p-5 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <Linkedin size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">LinkedIn</p>
                  <p className="text-sm font-medium">Mateusz Łagocki</p>
                </div>
              </div>
            </a>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <MapPin size={18} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Lokalizacja</p>
                  <p className="text-sm font-medium">Polska • Remote</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 glass rounded-3xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Imię
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="jan@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Wiadomość
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                placeholder="Cześć Mateusz, mam pomysł na..."
              />
            </div>
            <button
              type="submit"
              disabled={sent}
              className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sent ? (
                "Wiadomość wysłana! ✨"
              ) : (
                <>
                  Wyślij wiadomość
                  <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
