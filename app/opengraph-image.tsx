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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 26,
            fontFamily: "monospace",
            color: "#6b685e",
          }}
        >
          <span style={{ color: "#1c1b19", fontWeight: 700 }}>ML</span>
          <span style={{ color: "#c98a4b" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#1c1b19",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Buduję przejrzyste, szybkie interfejsy{" "}
            <span style={{ color: "#c98a4b" }}>we frontendzie.</span>
          </div>
          <div style={{ fontSize: 30, color: "#6b685e" }}>
            Mateusz Łagocki — Frontend Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            fontSize: 24,
            color: "#6b685e",
            fontFamily: "monospace",
          }}
        >
          <span>React</span>
          <span style={{ color: "#c98a4b" }}>·</span>
          <span>Next.js</span>
          <span style={{ color: "#c98a4b" }}>·</span>
          <span>TypeScript</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
