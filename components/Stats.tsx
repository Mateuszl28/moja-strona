"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  GitCommit,
  Calendar,
  Coffee,
  Rocket,
  BookOpen,
} from "lucide-react";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: typeof Code2;
  gradient: string;
};

const stats: Stat[] = [
  {
    label: "Dni od pierwszego commitu",
    value: 580,
    suffix: "+",
    icon: Calendar,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    label: "Commitów publicznych",
    value: 240,
    suffix: "+",
    icon: GitCommit,
    gradient: "from-blue-600 to-cyan-500",
  },
  {
    label: "Linii kodu w portfolio",
    value: 12000,
    suffix: "+",
    icon: Code2,
    gradient: "from-orange-500 to-pink-500",
  },
  {
    label: "Projektów ukończonych",
    value: 4,
    icon: Rocket,
    gradient: "from-pink-600 to-purple-600",
  },
  {
    label: "Postów na blogu",
    value: 2,
    icon: BookOpen,
    gradient: "from-cyan-500 to-teal-500",
  },
  {
    label: "Kaw wypitych",
    value: 9999,
    suffix: "+",
    icon: Coffee,
    gradient: "from-yellow-500 to-orange-500",
  },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const startTs = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - startTs) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function StatCard({ stat, visible }: { stat: Stat; visible: boolean }) {
  const val = useCountUp(stat.value, 1800, visible);
  const Icon = stat.icon;

  return (
    <div className="glass glass-hover rounded-2xl p-6 text-center transition-all hover:-translate-y-1">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-4`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <p className="text-3xl md:text-4xl font-bold text-gradient leading-none mb-2 tabular-nums">
        {stat.prefix}
        {val.toLocaleString("pl-PL")}
        {stat.suffix}
      </p>
      <p className="text-xs text-slate-400 leading-tight">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-purple-400 mb-2">{"// stats"}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Trochę <span className="text-gradient">liczb</span>
          </h2>
          <p className="text-slate-400 text-sm">
            Aktualizowane co jakiś czas. Liczby są przybliżone.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map((s) => (
            <StatCard key={s.label} stat={s} visible={visible} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
