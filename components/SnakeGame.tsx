"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RefreshCw, Trophy } from "lucide-react";

const GRID = 20;
const CELL = 16;
const TICK = 100;

type Pos = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeRef = useRef<Pos[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<Dir>("right");
  const foodRef = useRef<Pos>({ x: 5, y: 5 });
  const tickRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const animRef = useRef<number>(0);

  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(0);
  const [state, setState] = useState<"idle" | "playing" | "over">("idle");

  useEffect(() => {
    try {
      const h = parseInt(localStorage.getItem("snake:high") || "0", 10);
      if (!isNaN(h)) setHigh(h);
    } catch {}
  }, []);

  const placeFood = () => {
    const occupied = new Set(snakeRef.current.map((p) => `${p.x},${p.y}`));
    while (true) {
      const x = Math.floor(Math.random() * GRID);
      const y = Math.floor(Math.random() * GRID);
      if (!occupied.has(`${x},${y}`)) {
        foodRef.current = { x, y };
        return;
      }
    }
  };

  const reset = () => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = "right";
    placeFood();
    setScore(0);
    setState("playing");
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "rgba(10, 10, 15, 1)";
    ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);

    ctx.strokeStyle = "rgba(168, 85, 247, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, GRID * CELL);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(GRID * CELL, i * CELL);
      ctx.stroke();
    }

    const food = foodRef.current;
    ctx.fillStyle = "#ec4899";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ec4899";
    ctx.beginPath();
    ctx.arc(
      food.x * CELL + CELL / 2,
      food.y * CELL + CELL / 2,
      CELL / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    snakeRef.current.forEach((p, i) => {
      const hue = 260 + i * 4;
      ctx.fillStyle = `hsl(${hue}, 80%, ${i === 0 ? 70 : 55}%)`;
      ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2);
    });
  };

  useEffect(() => {
    if (state !== "playing") {
      draw();
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      const d = dirRef.current;
      if (e.key === "ArrowUp" && d !== "down") dirRef.current = "up";
      else if (e.key === "ArrowDown" && d !== "up") dirRef.current = "down";
      else if (e.key === "ArrowLeft" && d !== "right") dirRef.current = "left";
      else if (e.key === "ArrowRight" && d !== "left") dirRef.current = "right";
      if (e.key.startsWith("Arrow")) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);

    const step = (t: number) => {
      if (t - lastTickRef.current >= TICK) {
        lastTickRef.current = t;
        tickRef.current++;

        const head = snakeRef.current[0];
        const d = dirRef.current;
        const nx = head.x + (d === "right" ? 1 : d === "left" ? -1 : 0);
        const ny = head.y + (d === "down" ? 1 : d === "up" ? -1 : 0);

        if (nx < 0 || ny < 0 || nx >= GRID || ny >= GRID) {
          setState("over");
          setScore((s) => {
            setHigh((h) => {
              const newH = Math.max(h, s);
              try {
                localStorage.setItem("snake:high", String(newH));
              } catch {}
              return newH;
            });
            return s;
          });
          return;
        }
        if (snakeRef.current.some((p) => p.x === nx && p.y === ny)) {
          setState("over");
          setScore((s) => {
            setHigh((h) => {
              const newH = Math.max(h, s);
              try {
                localStorage.setItem("snake:high", String(newH));
              } catch {}
              return newH;
            });
            return s;
          });
          return;
        }

        const newHead = { x: nx, y: ny };
        snakeRef.current = [newHead, ...snakeRef.current];

        if (nx === foodRef.current.x && ny === foodRef.current.y) {
          setScore((s) => s + 1);
          placeFood();
        } else {
          snakeRef.current.pop();
        }
      }

      draw();
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("keydown", onKey);
    };
  }, [state]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-6 text-sm font-mono">
        <span className="text-slate-400">
          Wynik: <span className="text-white font-bold">{score}</span>
        </span>
        <span className="text-slate-400 inline-flex items-center gap-1">
          <Trophy size={12} className="text-orange-400" />
          Rekord: <span className="text-white font-bold">{high}</span>
        </span>
      </div>

      <div className="relative rounded-xl overflow-hidden border border-white/10">
        <canvas
          ref={canvasRef}
          width={GRID * CELL}
          height={GRID * CELL}
          className="block"
        />
        {state === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <p className="text-sm text-slate-400 mb-3 text-center">
              Steruj strzałkami ← ↑ → ↓
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              <Play size={14} />
              Zagraj
            </button>
          </div>
        )}
        {state === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <p className="text-lg font-bold mb-1 text-gradient">Koniec gry</p>
            <p className="text-sm text-slate-400 mb-3">
              Wynik: {score} · Rekord: {high}
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              <RefreshCw size={14} />
              Jeszcze raz
            </button>
          </div>
        )}
      </div>

      <p className="text-[10px] text-slate-600 font-mono">
        Steruj strzałkami · zjedz różowe kropki
      </p>
    </div>
  );
}
