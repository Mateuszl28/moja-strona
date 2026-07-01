import Reveal from "./Reveal";

// Stack oparty na realnych projektach (portfolio, sklepy, sterownik P15) — bez pasków %.
const stack: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
  },
  {
    group: "Poza frontendem",
    items: [".NET / C#", "WordPress", "Astro", "Git"],
  },
];

export default function About() {
  return (
    <section className="mx-auto max-w-content px-6 py-20 sm:py-28">
      <div className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
            O mnie
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Buduję rzeczy, które trafiają do ludzi.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-4 text-[var(--ink-soft)]">
            <p className="text-lg leading-relaxed">
              Jestem Mateusz — frontend developer z&nbsp;Polski. Najlepiej czuję
              się w&nbsp;React, Next.js i&nbsp;TypeScript, gdzie mogę zadbać
              o&nbsp;detal, dostępność i&nbsp;czysty, czytelny kod.
            </p>
            <p className="leading-relaxed">
              Nie zostaję tylko przy interfejsie — zbudowałem działające sklepy
              internetowe, a&nbsp;nawet sterowniki drukarki w&nbsp;.NET na Linux
              i&nbsp;Windows. Lubię rozumieć całość i&nbsp;dowozić rzeczy, które
              realnie działają.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {stack.map(({ group, items }) => (
              <div key={group}>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-soft)]">
                  {group}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-[var(--line)] bg-[var(--paper-soft)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:border-accent/40"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
