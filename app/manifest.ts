import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mateusz Łagocki — Frontend Developer",
    short_name: "Łagocki",
    description:
      "Portfolio Mateusza Łagockiego — React, Next.js, TypeScript. Strony, sklepy i aplikacje.",
    start_url: "/",
    display: "standalone",
    lang: "pl",
    background_color: "#f3f0e8",
    theme_color: "#f3f0e8",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
