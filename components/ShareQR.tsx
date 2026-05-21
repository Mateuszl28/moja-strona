"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { Share2, Download, Copy, Check, QrCode } from "lucide-react";

type Props = {
  url?: string;
  title?: string;
};

export default function ShareQR({
  url = typeof window !== "undefined" ? window.location.origin : "",
  title = "Portfolio Mateusza Łagockiego",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || !url) return;
    QRCode.toCanvas(canvasRef.current, url, {
      width: 200,
      margin: 1,
      color: {
        dark: "#0a0a0f",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    }).catch((err) => console.error("QR error:", err));
  }, [url]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {}
    } else {
      copy();
    }
  };

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "mateusz-lagocki-portfolio-qr.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <QrCode size={16} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-sm">Podziel się portfolio</h3>
          <p className="text-[10px] text-slate-500 font-mono">
            Zeskanuj telefonem lub udostępnij link
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="bg-white rounded-xl p-2 shadow-lg shrink-0">
          <canvas
            ref={canvasRef}
            className="block"
            aria-label="QR code do strony"
          />
        </div>

        <div className="flex-1 w-full space-y-2">
          <code className="block w-full p-2.5 rounded-lg bg-white/5 text-[11px] font-mono text-slate-400 truncate">
            {url}
          </code>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={share}
              className="inline-flex flex-col items-center gap-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
            >
              <Share2 size={14} />
              {shared ? "Done!" : "Share"}
            </button>
            <button
              onClick={copy}
              className="inline-flex flex-col items-center gap-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Skopiowane" : "Kopiuj"}
            </button>
            <button
              onClick={download}
              className="inline-flex flex-col items-center gap-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
            >
              <Download size={14} />
              PNG
            </button>
          </div>

          <a
            href="/resume.json"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-[11px] font-mono text-purple-400 hover:text-purple-300 mt-2 pt-2 border-t border-white/5"
          >
            📄 CV jako JSON Resume → /resume.json
          </a>
        </div>
      </div>
    </div>
  );
}
