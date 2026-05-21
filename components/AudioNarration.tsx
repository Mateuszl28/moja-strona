"use client";

import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Square,
  Volume2,
  Loader2,
  Headphones,
} from "lucide-react";

type Props = {
  text: string;
  lang?: string;
};

export default function AudioNarration({ text, lang = "pl-PL" }: Props) {
  const [supported, setSupported] = useState(true);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [voicesReady, setVoicesReady] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const pl = voices.find((v) => v.lang.startsWith("pl"));
      const en = voices.find((v) => v.lang.startsWith("en"));
      voiceRef.current =
        lang.startsWith("pl") ? pl ?? en ?? voices[0] : en ?? voices[0];
      setVoicesReady(voices.length > 0);
    };

    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [lang]);

  const cleanText = text
    .replace(/[#*_`~]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  const play = () => {
    if (!supported || !voicesReady) return;
    const synth = window.speechSynthesis;

    if (state === "paused" && synth.paused) {
      synth.resume();
      setState("playing");
      return;
    }

    synth.cancel();
    const u = new SpeechSynthesisUtterance(cleanText);
    u.lang = lang;
    if (voiceRef.current) u.voice = voiceRef.current;
    u.rate = 1;
    u.pitch = 1;
    u.onend = () => setState("idle");
    u.onerror = () => setState("idle");

    utteranceRef.current = u;
    synth.speak(u);
    setState("playing");
  };

  const pause = () => {
    if (!supported) return;
    window.speechSynthesis.pause();
    setState("paused");
  };

  const stop = () => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setState("idle");
  };

  if (!supported) {
    return (
      <div className="glass rounded-xl px-4 py-3 text-xs text-slate-500">
        Twoja przeglądarka nie wspiera czytania na głos.
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 glass rounded-full px-1.5 py-1.5">
      <div className="flex items-center gap-1.5 px-2 text-xs text-slate-400">
        <Headphones size={12} className="text-purple-400" />
        <span className="hidden sm:inline">Czytaj na głos</span>
      </div>

      {state === "idle" && (
        <button
          onClick={play}
          disabled={!voicesReady}
          aria-label="Play"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all disabled:opacity-30"
        >
          {voicesReady ? <Play size={14} /> : <Loader2 size={14} className="animate-spin" />}
        </button>
      )}

      {state === "playing" && (
        <>
          <button
            onClick={pause}
            aria-label="Pause"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Pause size={14} />
          </button>
          <button
            onClick={stop}
            aria-label="Stop"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Square size={12} />
          </button>
          <div className="flex items-center gap-1 px-2">
            <Volume2 size={12} className="text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono text-purple-400 hidden sm:inline">
              playing
            </span>
          </div>
        </>
      )}

      {state === "paused" && (
        <>
          <button
            onClick={play}
            aria-label="Resume"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white transition-all"
          >
            <Play size={14} />
          </button>
          <button
            onClick={stop}
            aria-label="Stop"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Square size={12} />
          </button>
          <span className="text-[10px] font-mono text-orange-400 px-2 hidden sm:inline">
            paused
          </span>
        </>
      )}
    </div>
  );
}
