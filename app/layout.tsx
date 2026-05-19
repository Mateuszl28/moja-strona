import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mateusz Łagocki — Developer Portfolio",
  description:
    "Portfolio Mateusza Łagockiego — początkujący programista, pasjonat nowoczesnych technologii webowych. React, TypeScript, Next.js.",
  keywords: [
    "Mateusz Łagocki",
    "portfolio",
    "developer",
    "programista",
    "React",
    "Next.js",
    "TypeScript",
    "frontend",
  ],
  authors: [{ name: "Mateusz Łagocki" }],
  openGraph: {
    title: "Mateusz Łagocki — Developer Portfolio",
    description: "Portfolio początkującego programisty",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
