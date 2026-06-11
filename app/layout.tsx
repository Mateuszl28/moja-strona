import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://85.215.197.199";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Mateusz Łagocki — Frontend Developer",
  description:
    "Portfolio Mateusza Łagockiego — frontend developer. React, Next.js, TypeScript, Tailwind.",
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: BASE_URL,
    siteName: "Mateusz Łagocki",
    title: "Mateusz Łagocki — Frontend Developer",
    description:
      "Portfolio Mateusza Łagockiego — frontend developer. React, Next.js, TypeScript.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${inter.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
