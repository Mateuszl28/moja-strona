import {
  LOGO_L,
  LOGO_M,
  LOGO_STROKE,
  LOGO_VIEWBOX,
} from "@/lib/logo";

// Znak (kwadrat z monogramem ML) + opcjonalnie nazwa. Kolory z currentColor i tokenów,
// więc ten sam komponent działa na jasnym tle (nawigacja) i ciemnym (stopka).
export default function Logo({
  withName = true,
  inverted = false,
  className = "",
}: {
  withName?: boolean;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox={LOGO_VIEWBOX}
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
      >
        <rect
          width="32"
          height="32"
          rx="7"
          fill={inverted ? "var(--paper)" : "var(--ink)"}
        />
        <g
          fill="none"
          strokeWidth={LOGO_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d={LOGO_M} stroke={inverted ? "var(--ink)" : "var(--paper)"} />
          <path d={LOGO_L} stroke="#ea7a4b" />
        </g>
      </svg>
      {withName && (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight">
          Mateusz Łagocki
        </span>
      )}
    </span>
  );
}
