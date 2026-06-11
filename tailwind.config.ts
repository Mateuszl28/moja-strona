import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // single, warm accent — calm and human
        accent: {
          DEFAULT: "#e0a96d",
          soft: "#ecc79b",
          strong: "#d0905a",
        },
        ink: {
          DEFAULT: "#1c1b19",
          soft: "#3a382f",
        },
        paper: {
          DEFAULT: "#faf8f4",
          soft: "#f1ede4",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        content: "64rem",
      },
    },
  },
  plugins: [],
};

export default config;
