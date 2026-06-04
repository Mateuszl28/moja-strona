"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./HeroSceneClient"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-accent-400 animate-spin" />
    </div>
  ),
});

export default function HeroScene() {
  return <Scene />;
}
