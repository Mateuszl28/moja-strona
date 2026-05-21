import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mateusz Łagocki — Portfolio",
    short_name: "ML Portfolio",
    description: "Portfolio Mateusza Łagockiego — junior frontend developer.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0f",
    theme_color: "#a855f7",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
