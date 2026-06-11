import { ImageResponse } from "next/og";

export const alt = "Mateusz Łagocki — Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf8f4",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#1c1b19" }}>
            ML
          </span>
          <span style={{ fontSize: 28, fontWeight: 700, color: "#c98a4b" }}>
            .
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              color: "#1c1b19",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Buduję przejrzyste, szybkie strony i aplikacje we frontendzie.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 30,
              color: "#c98a4b",
            }}
          >
            Mateusz Łagocki — Frontend Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#6b685e",
            fontFamily: "monospace",
          }}
        >
          React / Next.js / TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}
