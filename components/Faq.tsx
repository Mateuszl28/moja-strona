import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "Ile kosztuje projekt?",
    a: "Zależy od zakresu. Orientacyjną kwotę policzysz w kalkulatorze powyżej, a ostateczną ustalamy po krótkiej rozmowie o szczegółach.",
  },
  {
    q: "Ile trwa realizacja?",
    a: "Zwykle od dwóch do kilku tygodni, zależnie od złożoności. Jeśli zależy Ci na czasie, możliwy jest tryb ekspresowy.",
  },
  {
    q: "Czy kod należy do mnie?",
    a: "Tak. Po rozliczeniu przekazuję pełny kod źródłowy i wszystkie dostępy — projekt jest Twój.",
  },
  {
    q: "Jak wygląda płatność?",
    a: "Najczęściej zaliczka na start i reszta po wdrożeniu. Szczegóły dopasowujemy do wielkości projektu.",
  },
  {
    q: "Czy robisz poprawki po oddaniu?",
    a: "Tak — drobne poprawki po wdrożeniu wchodzą w zakres. Większe zmiany i nowe funkcje wyceniam osobno.",
  },
  {
    q: "Zajmujesz się hostingiem i wdrożeniem?",
    a: "Tak. Mogę wdrożyć stronę na serwer, skonfigurować domenę i certyfikat oraz zadbać o start.",
  },
];

export default function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          FAQ
        </p>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Najczęstsze pytania
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-[var(--ink-soft)] transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <p className="pb-4 leading-relaxed text-[var(--ink-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
