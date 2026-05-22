import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";
import LoadingScreen from "@/components/LoadingScreen";
import AIChatbot from "@/components/AIChatbot";
import Analytics from "@/components/Analytics";
import { I18nProvider } from "@/components/I18nProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://85.215.197.199";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Mateusz Łagocki — Junior Frontend Developer",
    template: "%s — Mateusz Łagocki",
  },
  description:
    "Portfolio Mateusza Łagockiego — junior frontend developer. React, Next.js, TypeScript, Tailwind. Sentra AI, Rapidsoc, praca inżynierska i więcej.",
  keywords: [
    "Mateusz Łagocki",
    "portfolio",
    "junior developer",
    "frontend",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "programista",
  ],
  authors: [{ name: "Mateusz Łagocki", url: BASE_URL }],
  creator: "Mateusz Łagocki",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: BASE_URL,
    siteName: "Mateusz Łagocki — Portfolio",
    title: "Mateusz Łagocki — Junior Frontend Developer",
    description:
      "Portfolio juniora frontendu. React, Next.js, TypeScript. Projekty konkursowe, praca inżynierska i bieżące eksperymenty.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mateusz Łagocki — Junior Frontend Developer",
    description:
      "Portfolio juniora frontendu. React, Next.js, TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": `${BASE_URL}/feed.xml`,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mateusz Łagocki",
  jobTitle: "Junior Frontend Developer",
  url: BASE_URL,
  email: "lagockimateusz6@gmail.com",
  sameAs: ["https://github.com/Mateuszl28"],
  knowsAbout: [
    "Frontend Development",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "AI Integration",
    "Gemini API",
  ],
  description:
    "Junior frontend developer z pasją do budowania rzeczy w internecie. React, Next.js, TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <I18nProvider>
            <LoadingScreen />
            {children}
            <CommandPalette />
            <AIChatbot />
            <Analytics />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
