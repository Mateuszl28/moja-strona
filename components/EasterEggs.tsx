"use client";

import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const styles = [
      "color: #a855f7",
      "font-size: 18px",
      "font-weight: bold",
      "font-family: monospace",
    ].join(";");

    console.log(
      "%c👋 Hej! Skoro zaglądasz w konsolę, pewnie jesteś jednym z nas.",
      styles
    );
    console.log(
      "%cKod tej strony: https://github.com/Mateuszl28/moja-strona",
      "color: #ec4899; font-family: monospace;"
    );
    console.log(
      "%cSpróbuj Konami code: ↑ ↑ ↓ ↓ ← → ← → B A",
      "color: #94a3b8; font-family: monospace; font-style: italic;"
    );

    let sequence: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      sequence.push(e.key);
      if (sequence.length > KONAMI.length) sequence.shift();
      if (sequence.join(",") === KONAMI.join(",")) {
        setKonamiActive(true);
        sequence = [];
        setTimeout(() => setKonamiActive(false), 6000);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!konamiActive) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" />
      <div className="relative text-center animate-fade-in">
        <div className="text-8xl mb-4 animate-bounce">🎮</div>
        <p className="text-4xl font-bold text-gradient mb-2">
          Konami Code Unlocked!
        </p>
        <p className="text-slate-300 font-mono text-sm">
          Nice. Welcome to the club.
        </p>
      </div>
    </div>
  );
}
