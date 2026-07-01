import { ImageResponse } from "next/og";

// Wspólny generator obrazków OG (podgląd przy udostępnianiu). Ciemny motyw,
// jeden amberowy akcent. Uwaga: w next/og każdy element flex musi mieć jawne
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
          background: "#14120f",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#f3f0e9" }}>
            ML
          </span>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#e0a96d" }}>
            .
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#e0a96d",
              letterSpacing: 4,
              fontFamily: "monospace",
            }}
          >
            {eyebrow.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 72,
              fontWeight: 700,
              color: "#f3f0e9",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#9b968a",
            fontFamily: "monospace",
          }}
        >
          Mateusz Łagocki — Frontend Developer
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
