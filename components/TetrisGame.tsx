"use client";

import { useEffect, useRef, useState } from "react";
import { Play, RefreshCw, Trophy } from "lucide-react";

const COLS = 10;
const ROWS = 20;
const CELL = 18;

type Cell = number;
type Board = Cell[][];

const SHAPES: number[][][] = [
  [[1, 1, 1, 1]],
  [
    [2, 0, 0],
    [2, 2, 2],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
  ],
  [
    [4, 4],
    [4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
  ],
];

const COLORS: Record<number, string> = {
  1: "#06b6d4",
  2: "#3b82f6",
  3: "#f97316",
  4: "#eab308",
  5: "#22c55e",
  6: "#a855f7",
  7: "#ec4899",
};

function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
}

function rotate(shape: number[][]): number[][] {
  const h = shape.length;
  const w = shape[0].length;
  const r: number[][] = Array.from({ length: w }, () => Array(h).fill(0));
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      r[x][h - 1 - y] = shape[y][x];
    }
  }
  return r;
}

function collides(
  board: Board,
  shape: number[][],
  ox: number,
  oy: number
): boolean {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (!shape[y][x]) continue;
      const nx = ox + x;
      const ny = oy + y;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}

function merge(board: Board, shape: number[][], ox: number, oy: number) {
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (shape[y][x] && oy + y >= 0) {
        board[oy + y][ox + x] = shape[y][x];
      }
    }
  }
}

export default function TetrisGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<Board>(emptyBoard());
  const shapeRef = useRef<number[][]>([]);
  const posRef = useRef({ x: 4, y: 0 });
  const dropTimerRef = useRef<number>(0);
  const animRef = useRef<number>(0);

  const [score, setScore] = useState(0);
  const [high, setHigh] = useState(0);
  const [state, setState] = useState<"idle" | "playing" | "over">("idle");

  useEffect(() => {
    try {
      const h = parseInt(localStorage.getItem("tetris:high") || "0", 10);
      if (!isNaN(h)) setHigh(h);
    } catch {}
  }, []);

  const spawn = () => {
    const s = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    shapeRef.current = s.map((r) => [...r]);
    posRef.current = {
      x: Math.floor((COLS - s[0].length) / 2),
      y: -1,
    };
    if (collides(boardRef.current, shapeRef.current, posRef.current.x, 0)) {
      setState("over");
      setScore((s) => {
        setHigh((h) => {
          const n = Math.max(h, s);
          try {
            localStorage.setItem("tetris:high", String(n));
          } catch {}
          return n;
        });
        return s;
      });
    }
  };

  const clearLines = () => {
    const board = boardRef.current;
    let cleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
      if (board[y].every((c) => c !== 0)) {
        board.splice(y, 1);
        board.unshift(Array(COLS).fill(0));
        cleared++;
        y++;
      }
    }
    if (cleared > 0) {
      const points = [0, 100, 300, 500, 800][cleared] || 0;
      setScore((s) => s + points);
    }
  };

  const drop = () => {
    const p = posRef.current;
    if (!collides(boardRef.current, shapeRef.current, p.x, p.y + 1)) {
      p.y++;
    } else {
      merge(boardRef.current, shapeRef.current, p.x, p.y);
      clearLines();
      spawn();
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "rgba(10, 10, 15, 1)";
    ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

    ctx.strokeStyle = "rgba(168, 85, 247, 0.05)";
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, ROWS * CELL);
      ctx.stroke();
    }
    for (let i = 0; i <= ROWS; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(COLS * CELL, i * CELL);
      ctx.stroke();
    }

    const drawCell = (x: number, y: number, color: number) => {
      if (y < 0) return;
      ctx.fillStyle = COLORS[color];
      ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
    };

    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        if (boardRef.current[y][x]) {
          drawCell(x, y, boardRef.current[y][x]);
        }
      }
    }

    const s = shapeRef.current;
    const p = posRef.current;
    for (let y = 0; y < s.length; y++) {
      for (let x = 0; x < s[0].length; x++) {
        if (s[y][x]) drawCell(p.x + x, p.y + y, s[y][x]);
      }
    }
  };

  const reset = () => {
    boardRef.current = emptyBoard();
    setScore(0);
    spawn();
    setState("playing");
  };

  useEffect(() => {
    if (state !== "playing") {
      draw();
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      const p = posRef.current;
      if (e.key === "ArrowLeft") {
        if (!collides(boardRef.current, shapeRef.current, p.x - 1, p.y))
          p.x--;
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        if (!collides(boardRef.current, shapeRef.current, p.x + 1, p.y))
          p.x++;
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        drop();
        e.preventDefault();
      } else if (e.key === "ArrowUp" || e.key === " ") {
        const r = rotate(shapeRef.current);
        if (!collides(boardRef.current, r, p.x, p.y)) {
          shapeRef.current = r;
        }
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", onKey);

    const step = (t: number) => {
      if (t - dropTimerRef.current >= 600) {
        dropTimerRef.current = t;
        drop();
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
          width={COLS * CELL}
          height={ROWS * CELL}
          className="block"
        />
        {state === "idle" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <p className="text-xs text-slate-400 mb-3 text-center px-4">
              ← → ruch · ↓ szybciej · ↑ / spacja obrót
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
    </div>
  );
}
