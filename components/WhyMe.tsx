import {
  Rocket,
  Layers,
  Calculator,
  Clock,
  KeyRound,
  Gauge,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";

const points: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Rocket,
    title: "Realne wdrożenia, nie makiety",
    desc: "Sklepy i aplikacje, które faktycznie działają w sieci — Vibe, Nawia, Lepszy dzień. Możesz je kliknąć.",
  },
  {
    icon: Layers,
    title: "Więcej niż frontend",
    desc: "Ogarniam też backend (.NET / C#) i wdrożenie na serwer — nie odsyłam Cię do kogoś innego w połowie drogi.",
  },
  {
    icon: Calculator,
    title: "Przejrzysta wycena",
    desc: "Koszt policzysz zanim napiszesz — kalkulator i widełki. Wiesz, za co płacisz, bez niespodzianek.",
  },
  {
    icon: Clock,
    title: "Szybki kontakt",
    desc: "Odpisuję zwykle w ciągu 24 godzin i pokazuję postępy — bez znikania na tygodnie w trakcie projektu.",
  },
  {
    icon: KeyRound,
    title: "Kod należy do Ciebie",
    desc: "Po rozliczeniu dostajesz pełny kod źródłowy i wszystkie dostępy. Projekt jest Twój, bez uwięzienia.",
  },
  {
    icon: Gauge,
    title: "Czysty, szybki kod",
    desc: "Nacisk na wydajność, dostępność i czytelność — buduję tak, żeby dało się to potem rozwijać.",
  },
];

export default function WhyMe() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Dlaczego ja
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Konkret zamiast obietnic
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal key={p.title} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 transition-colors hover:border-accent/30">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--paper-soft)] text-accent">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 font-medium">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
