"use client";

import { useI18n } from "./I18nProvider";
import { Globe } from "lucide-react";

export default function LanguageToggle({
  className = "",
}: {
  className?: string;
}) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full glass p-0.5 ${className}`}
    >
      <Globe size={12} className="ml-2 text-slate-500" />
      <button
        onClick={() => setLocale("pl")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all ${
          locale === "pl"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "text-slate-400 hover:text-white"
        }`}
        aria-label="Polski"
      >
        PL
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all ${
          locale === "en"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "text-slate-400 hover:text-white"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
