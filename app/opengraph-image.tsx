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
              fontSize: 62,
              fontWeight: 700,
              color: "#f3f0e9",
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
              color: "#e0a96d",
            }}
          >
            Mateusz Łagocki — Frontend Developer
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
          React / Next.js / TypeScript
        </div>
      </div>
    ),
    { ...size }
  );
}
