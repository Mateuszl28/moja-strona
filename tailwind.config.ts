import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // jeden akcent — cegła (zsynchronizowany z --accent w globals.css)
        accent: {
          DEFAULT: "#c2410c",
          soft: "#ea7a4b",
          strong: "#9a3412",
        },
        ink: {
          DEFAULT: "#171512",
          soft: "#6b665c",
        },
        paper: {
          DEFAULT: "#f3f0e8",
          soft: "#e9e4d8",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      // mniejsze promienie — mniej „bąbelkowego" wyglądu szablonów
      borderRadius: {
        xl: "0.5rem",
        "2xl": "0.625rem",
        "3xl": "0.875rem",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
