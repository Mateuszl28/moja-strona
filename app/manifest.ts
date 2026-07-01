import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mateusz Łagocki — Frontend Developer",
    short_name: "ML.",
    description:
      "Portfolio Mateusza Łagockiego — React, Next.js, TypeScript. Strony, sklepy i aplikacje.",
    start_url: "/",
    display: "standalone",
    lang: "pl",
    background_color: "#14120f",
    theme_color: "#14120f",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
    ],
  };
}
