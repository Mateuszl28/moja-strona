"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Bell,
  Apple,
  Sparkles,
  Wifi,
  BatteryFull,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const features = [
  "Wszystkie projekty offline",
  "Powiadomienia o nowych postach",
  "Tryb ciemny i jasny",
  "Szybsze niż wersja web",
];

export default function MobileApp() {
  const [notified, setNotified] = useState(false);
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNotified(true);
    setEmail("");
    setTimeout(() => setNotified(false), 5000);
  };

  return (
    <section
      id="mobile-app"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
            <span className="text-xs font-mono text-purple-400">
              Coming soon
            </span>
          </div>

          <p className="font-mono text-sm text-purple-400 mb-2">
            {"// mobile"}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Mobilna <span className="text-gradient">aplikacja</span>
            <br />
            <span className="text-slate-500 text-2xl md:text-3xl lg:text-4xl font-medium">
              już wkrótce
            </span>
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
            Pracuję nad natywną aplikacją mobilną dla portfolio. React Native,
            offline-first, native feel. Zostaw email — dam znać, gdy wystartuje
            beta.
          </p>

          <ul className="space-y-3 mb-8">
            {features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-3 text-slate-300"
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center shrink-0">
                  <ChevronRight size={14} className="text-purple-300" />
                </div>
                <span className="text-sm">{f}</span>
              </motion.li>
            ))}
          </ul>

          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2 max-w-md mb-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.com"
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all whitespace-nowrap"
            >
              <Bell size={14} />
              Powiadom mnie
            </button>
          </form>

          {notified && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-green-400 mb-4"
            >
              ✓ Dodam Cię do listy. Dam znać gdy beta będzie gotowa.
            </motion.p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
              <Apple size={12} />
              iOS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass">
              <Smartphone size={12} />
              Android
            </span>
            <span className="font-mono">React Native + Expo</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center"
        >
          <div className="absolute -inset-8 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" />

          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-[280px] h-[580px] rounded-[3rem] border-[10px] border-slate-800 bg-[#0a0a0f] shadow-2xl"
              style={{
                boxShadow:
                  "0 30px 80px -20px rgba(168,85,247,0.4), 0 0 40px rgba(236,72,153,0.2)",
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />

              <div className="relative h-full w-full rounded-[2.3rem] overflow-hidden bg-gradient-to-br from-[#0a0a0f] via-[#1a0a2e] to-[#2d0a3e]">
                <div className="flex justify-between items-center px-7 pt-4 text-[10px] text-white font-mono">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Wifi size={10} />
                    <BatteryFull size={12} />
                  </div>
                </div>

                <div className="px-5 pt-8">
                  <p className="font-mono text-[10px] text-purple-400 mb-1">
                    &lt;ML/&gt;
                  </p>
                  <h3 className="text-2xl font-bold text-gradient mb-1">
                    Mateusz
                  </h3>
                  <p className="text-[10px] text-slate-400 mb-5">
                    Junior Frontend Dev
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {["3+", "1.5y", "∞"].map((stat, i) => (
                      <div
                        key={i}
                        className="glass rounded-lg p-2 text-center"
                      >
                        <p className="text-sm font-bold text-gradient">
                          {stat}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mb-5">
                    {["React", "Next.js", "TypeScript"].map((tech, i) => (
                      <div
                        key={tech}
                        className="glass rounded-lg p-2 flex items-center justify-between"
                      >
                        <span className="text-[11px] text-slate-300">
                          {tech}
                        </span>
                        <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${70 + i * 5}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 0.5 + i * 0.2,
                            }}
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass rounded-lg p-3">
                    <p className="text-[10px] font-mono text-purple-400 mb-1">
                      LATEST PROJECT
                    </p>
                    <p className="text-xs font-bold mb-0.5">Sentra AI 🛡️</p>
                    <p className="text-[10px] text-slate-500">
                      Phishing detection with Gemini
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -top-6 -left-10 glass rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2"
            >
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-xs font-mono">React Native</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-4 -right-8 glass rounded-2xl px-4 py-2 shadow-xl flex items-center gap-2"
            >
              <Bell size={14} className="text-pink-400" />
              <span className="text-xs font-mono">Beta soon</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
