"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  Wallet,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const offerings = [
  {
    icon: Briefcase,
    label: "Stanowisko",
    value: "Junior Frontend / Full-Stack",
  },
  {
    icon: MapPin,
    label: "Lokalizacja",
    value: "Polska / Remote / Hybrid",
  },
  {
    icon: Clock,
    label: "Dostępność",
    value: "Pełen etat lub staż",
  },
  {
    icon: Wallet,
    label: "Forma",
    value: "Otwarty na UoP, B2B, umowa zlecenie",
  },
];

export default function HireMe() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-orange-500/20" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-pink-600 rounded-full blur-3xl opacity-30" />

          <div className="relative p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="text-xs font-mono text-green-400">
                  Open to Work
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Szukasz juniora,{" "}
                <span className="text-gradient">który chce się rozwijać?</span>
              </h2>

              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
                Jestem na początku drogi, ale mocno mi na niej zależy. Mam już
                kilka prawdziwych projektów na koncie — w tym dwa z zawodów
                programistycznych. Szukam zespołu, w którym mogę robić sensowne
                rzeczy i uczyć się od lepszych.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {offerings.map((o) => (
                  <div
                    key={o.label}
                    className="flex items-center gap-3 glass rounded-xl p-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center shrink-0">
                      <o.icon size={18} className="text-purple-300" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider font-mono text-slate-400">
                        {o.label}
                      </p>
                      <p className="text-sm font-medium text-white">
                        {o.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-medium text-white hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5"
                >
                  <Sparkles size={16} />
                  Napisz do mnie
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </a>
                <a
                  href="mailto:lagockimateusz6@gmail.com"
                  className="px-7 py-3.5 rounded-full glass glass-hover font-medium transition-all text-sm"
                >
                  lagockimateusz6@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
