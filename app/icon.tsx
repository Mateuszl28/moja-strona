import { ImageResponse } from "next/og";
import { LOGO_COLORS, LOGO_L, LOGO_M, LOGO_STROKE, LOGO_VIEWBOX } from "@/lib/logo";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: LOGO_COLORS.ink,
          borderRadius: 14,
        }}
      >
        <svg width="64" height="64" viewBox={LOGO_VIEWBOX}>
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
    ),
    { ...size }
  );
}
