import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // single, warm accent — calm and human (zsynchronizowany z --accent w globals.css)
        accent: {
          DEFAULT: "#e0a96d",
          soft: "#efc79a",
          strong: "#c98a4b",
        },
        ink: {
          DEFAULT: "#f3f0e9",
          soft: "#9b968a",
        },
        paper: {
          DEFAULT: "#14120f",
          soft: "#201d18",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      maxWidth: {
        content: "64rem",
      },
    },
  },
  plugins: [],
};

export default config;
