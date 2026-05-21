import { ImageResponse } from "next/og";

export const alt = "Mateusz Łagocki — Developer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #2d0a3e 100%)",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #f97316 100%)",
          }}
        />

        <div
          style={{
            fontSize: 36,
            color: "#a855f7",
            fontFamily: "monospace",
            marginBottom: 24,
          }}
        >
          &lt;ML/&gt;
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#94a3b8",
            fontSize: 36,
            marginBottom: 12,
          }}
        >
          Cześć, jestem
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            backgroundImage:
              "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          Mateusz Łagocki
        </div>

        <div
          style={{
            display: "flex",
            color: "#cbd5e1",
            fontSize: 36,
            marginBottom: 48,
          }}
        >
          Junior Frontend Developer
        </div>

        <div
          style={{
            display: "flex",
            gap: 16,
            color: "#94a3b8",
            fontFamily: "monospace",
            fontSize: 24,
          }}
        >
          <span>React</span>
          <span style={{ color: "#a855f7" }}>·</span>
          <span>Next.js</span>
          <span style={{ color: "#a855f7" }}>·</span>
          <span>TypeScript</span>
          <span style={{ color: "#a855f7" }}>·</span>
          <span>Tailwind</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
