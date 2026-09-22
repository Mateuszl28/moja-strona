import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

// Stack oparty na realnych projektach (portfolio, sklepy, sterownik P15) — bez pasków %.
const stack: { group: string; items: string[] }[] = [
  {
    group: "Na co dzień",
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
      <SectionHead
        label="O mnie"
        title="Buduję rzeczy, które trafiają do ludzi."
      />

      <Reveal delay={0.06}>
        <div className="mt-12 grid gap-12 md:ml-[calc(13rem+2rem)] md:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>
              Jestem Mateusz, frontend developer z&nbsp;Polski. Najlepiej czuję
              się w&nbsp;React, Next.js i&nbsp;TypeScript, gdzie mogę zadbać
              o&nbsp;detal, dostępność i&nbsp;czytelny kod.
            </p>
            <p className="text-[var(--ink-soft)]">
              Nie zostaję tylko przy interfejsie. Zbudowałem działające sklepy
              internetowe, a&nbsp;nawet sterowniki drukarki w&nbsp;.NET na Linux
              i&nbsp;Windows. Lubię rozumieć całość i&nbsp;dowozić rzeczy, które
              realnie działają.
            </p>
          </div>

          <dl className="space-y-8 text-sm">
            {stack.map(({ group, items }) => (
              <div key={group} className="border-t border-[var(--line)] pt-4">
                <dt className="text-[var(--ink-soft)]">{group}</dt>
                <dd className="mt-2 text-base leading-relaxed">
                  {items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
