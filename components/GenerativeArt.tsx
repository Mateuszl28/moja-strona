"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, Sparkles } from "lucide-react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  life: number;
  size: number;
};

const PALETTE_BASE_HUE = [270, 320, 30];

export default function GenerativeArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const seedRef = useRef(Math.random());
  const [seed, setSeed] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "rgba(10, 10, 15, 1)";
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    const seedRand = () => seedRef.current;

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const count = Math.min(120, Math.floor(rect.width / 8));
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        const base =
          PALETTE_BASE_HUE[
            Math.floor((seedRand() * 1000 + i) % PALETTE_BASE_HUE.length)
          ];
        particlesRef.current.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          hue: base + (Math.random() - 0.5) * 30,
          life: Math.random() * 100,
          size: 1 + Math.random() * 2,
        });
      }
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.fillStyle = "rgba(10, 10, 15, 0.08)";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const time = performance.now() * 0.0003;
      const mouse = mouseRef.current;

      for (const p of particlesRef.current) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.active && dist < 150) {
          const force = (1 - dist / 150) * 0.4;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        const angle =
          Math.sin((p.x + time * 100) * 0.005) * 0.5 +
          Math.cos((p.y + time * 100) * 0.005) * 0.5;
        p.vx += Math.cos(angle + time) * 0.02;
        p.vy += Math.sin(angle + time) * 0.02;

        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        p.life += 1;

        for (const other of particlesRef.current) {
          if (other === p) continue;
          const ddx = other.x - p.x;
          const ddy = other.y - p.y;
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < 80) {
            const alpha = (1 - dd / 80) * 0.15;
            ctx.strokeStyle = `hsla(${(p.hue + other.hue) / 2}, 90%, 65%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `hsl(${p.hue}, 90%, 65%)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, 0.8)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    initParticles();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [seed]);

  const reseed = () => {
    seedRef.current = Math.random();
    setSeed((s) => s + 1);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-sm text-purple-400 mb-2">
            {"// art"}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sztuka <span className="text-gradient">generatywna</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Każde załadowanie strony rysuje co innego. Najedź kursorem — cząsteczki
            uciekają. Kliknij <span className="text-white">&quot;nowa kompozycja&quot;</span>{" "}
            żeby zacząć od nowa.
          </p>
        </div>

        <div className="relative glass rounded-3xl overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-white/5 bg-black/30">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-xs font-mono text-slate-400">
                particles · noise field · seed: {seedRef.current.toFixed(4)}
              </span>
            </div>
            <button
              onClick={reseed}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
            >
              <RefreshCw size={11} />
              Nowa kompozycja
            </button>
          </div>
          <canvas
            ref={canvasRef}
            className="block w-full h-[460px] cursor-crosshair"
            aria-label="Generative art piece"
          />
        </div>

        <p className="text-center text-[11px] font-mono text-slate-600 mt-4">
          made with vanilla canvas — no libraries
        </p>
      </div>
    </section>
  );
}
