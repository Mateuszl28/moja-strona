import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  const title = post?.title ?? "Blog";
  const excerpt = post?.excerpt ?? "";
  const date = post?.date ? formatDate(post.date) : "";
  const tags = post?.tags?.slice(0, 4) ?? [];
  const readingTime = post?.readingTime ?? 1;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #2d0a3e 100%)",
          padding: "70px",
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
            background:
              "linear-gradient(90deg, #a855f7 0%, #ec4899 50%, #f97316 100%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: "#a855f7",
              fontFamily: "monospace",
              fontWeight: 700,
            }}
          >
            &lt;ML/&gt;
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#94a3b8",
              fontSize: 22,
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                background: "rgba(168, 85, 247, 0.2)",
                color: "#c084fc",
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: 18,
              }}
            >
              BLOG
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: 24,
          }}
        >
          <h1
            style={{
              fontSize: title.length > 50 ? 56 : 72,
              fontWeight: 800,
              color: "#f8fafc",
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          {excerpt && (
            <p
              style={{
                fontSize: 26,
                color: "#94a3b8",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: 900,
              }}
            >
              {excerpt.length > 130 ? excerpt.slice(0, 130) + "…" : excerpt}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#64748b",
            fontFamily: "monospace",
            fontSize: 20,
          }}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {date && <span>{date}</span>}
            {date && (
              <span style={{ color: "#a855f7" }}>·</span>
            )}
            <span>{readingTime} min</span>
            {tags.length > 0 && (
              <>
                <span style={{ color: "#a855f7" }}>·</span>
                <div style={{ display: "flex", gap: 8 }}>
                  {tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "4px 12px",
                        borderRadius: 999,
                        fontSize: 16,
                      }}
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
          <span style={{ color: "#475569" }}>Mateusz Łagocki</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
