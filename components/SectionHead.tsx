import Reveal from "./Reveal";

// Wspólny nagłówek sekcji: linia u góry, etykieta w lewej kolumnie, tytuł obok.
export default function SectionHead({
  label,
  title,
  children,
  aside,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="grid gap-4 border-t border-[var(--ink)] pt-5 md:grid-cols-[13rem_1fr] md:gap-8">
        <p className="eyebrow">{label}</p>
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl leading-[1.05] sm:text-5xl">
              {title}
            </h2>
            {children && (
              <p className="mt-5 max-w-xl leading-relaxed text-[var(--ink-soft)]">
                {children}
              </p>
            )}
          </div>
          {aside}
        </div>
      </div>
    </Reveal>
  );
}
