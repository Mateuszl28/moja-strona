import { ImageResponse } from "next/og";
import { LOGO_COLORS, LOGO_L, LOGO_M, LOGO_STROKE, LOGO_VIEWBOX } from "./logo";

// Wspólny generator obrazków OG (podgląd przy udostępnianiu). Jasny papier, tusz,
// jeden akcent (cegła) + znak ML. Uwaga: w next/og każdy element flex musi mieć jawne
// display:flex, inaczej render pada.
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function renderOg(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: LOGO_COLORS.paper,
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              background: LOGO_COLORS.ink,
              borderRadius: 12,
            }}
          >
            <svg width="56" height="56" viewBox={LOGO_VIEWBOX}>
              <path
                d={LOGO_M}
                fill="none"
                stroke={LOGO_COLORS.paper}
                strokeWidth={LOGO_STROKE}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={LOGO_L}
                fill="none"
                stroke={LOGO_COLORS.accent}
                strokeWidth={LOGO_STROKE}
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            style={{
              marginLeft: 18,
              fontSize: 30,
              fontWeight: 700,
              color: LOGO_COLORS.ink,
            }}
          >
            Mateusz Łagocki
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 28, color: "#6b665c" }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 80,
              fontWeight: 700,
              color: LOGO_COLORS.ink,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `2px solid ${LOGO_COLORS.ink}`,
            paddingTop: 20,
            fontSize: 24,
            color: "#6b665c",
          }}
        >
          programujzmateuszem.pl
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
