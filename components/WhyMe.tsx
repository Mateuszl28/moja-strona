import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const points: { title: string; desc: string }[] = [
  {
    title: "Realne wdrożenia, nie makiety",
    desc: "Sklepy i aplikacje, które faktycznie działają w sieci — Vibe, Nawia, Lepszy dzień. Możesz je kliknąć.",
  },
  {
    title: "Więcej niż frontend",
    desc: "Ogarniam też backend (.NET / C#) i wdrożenie na serwer — nie odsyłam Cię do kogoś innego w połowie drogi.",
  },
  {
    title: "Przejrzysta wycena",
    desc: "Koszt policzysz zanim napiszesz — kalkulator i widełki. Wiesz, za co płacisz, bez niespodzianek.",
  },
  {
    title: "Szybki kontakt",
    desc: "Odpisuję zwykle w ciągu 24 godzin i pokazuję postępy — bez znikania na tygodnie w trakcie projektu.",
  },
  {
    title: "Kod należy do Ciebie",
    desc: "Po rozliczeniu dostajesz pełny kod źródłowy i wszystkie dostępy. Projekt jest Twój, bez uwięzienia.",
  },
  {
    title: "Czysty, szybki kod",
    desc: "Nacisk na wydajność, dostępność i czytelność — buduję tak, żeby dało się to potem rozwijać.",
  },
];

export default function WhyMe() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <SectionHead label="Dlaczego ja" title="Konkret zamiast obietnic" />

      <dl className="mt-12 grid gap-x-12 md:ml-[calc(13rem+2rem)] md:grid-cols-2">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 0.05}>
            <div className="border-t border-[var(--line)] py-6">
              <dt className="text-lg font-medium">{p.title}</dt>
              <dd className="mt-2 leading-relaxed text-[var(--ink-soft)]">
                {p.desc}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
