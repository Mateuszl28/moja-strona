"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./HeroSceneClient"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 opacity-50 blur-xl animate-pulse" />
    </div>
  ),
});

export default function HeroScene() {
  return <Scene />;
}
