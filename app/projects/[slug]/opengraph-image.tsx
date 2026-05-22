import { ImageResponse } from "next/og";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/projects";

export const alt = "Project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  const title = project?.title ?? "Project";
  const subtitle = project?.subtitle ?? "";
  const excerpt = project?.excerpt ?? "";
  const tech = project?.tech?.slice(0, 5) ?? [];
  const emoji = project?.emoji ?? "✨";
  const gradient = project?.gradient ?? "from-purple-600 to-pink-600";

  const gradientMap: Record<string, [string, string]> = {
    "from-purple-600 to-pink-600": ["#9333ea", "#db2777"],
    "from-blue-600 to-cyan-500": ["#2563eb", "#06b6d4"],
    "from-orange-500 to-pink-500": ["#f97316", "#ec4899"],
    "from-orange-500 to-pink-600": ["#f97316", "#db2777"],
    "from-cyan-500 to-teal-500": ["#06b6d4", "#14b8a6"],
    "from-pink-600 to-purple-600": ["#db2777", "#9333ea"],
  };
  const [c1, c2] = gradientMap[gradient] || ["#a855f7", "#ec4899"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0f",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: `linear-gradient(90deg, ${c1}, ${c2})`,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "70px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: "#94a3b8",
              fontFamily: "monospace",
            }}
          >
            <span
              style={{
                fontSize: 28,
                color: "#a855f7",
                fontWeight: 700,
              }}
            >
              &lt;ML/&gt;
            </span>
            <span style={{ color: "#475569" }}>/</span>
            <span>projects</span>
            <span style={{ color: "#475569" }}>/</span>
            <span style={{ color: "#f8fafc" }}>{params.slug}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {subtitle && (
              <p
                style={{
                  fontSize: 22,
                  color: "#c084fc",
                  margin: 0,
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {subtitle}
              </p>
            )}
            <h1
              style={{
                fontSize: 84,
                fontWeight: 800,
                color: "#f8fafc",
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h1>
            {excerpt && (
              <p
                style={{
                  fontSize: 24,
                  color: "#94a3b8",
                  lineHeight: 1.4,
                  margin: 0,
                  maxWidth: 700,
                }}
              >
                {excerpt.length > 120 ? excerpt.slice(0, 120) + "…" : excerpt}
              </p>
            )}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {tech.map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  color: "#cbd5e1",
                  padding: "8px 16px",
                  borderRadius: 999,
                  fontSize: 18,
                  fontFamily: "monospace",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            width: 460,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${c1}, ${c2})`,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 240,
              filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.3))",
            }}
          >
            {emoji}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
