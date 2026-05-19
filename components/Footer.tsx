"use client";

import { Github, Linkedin, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-mono text-lg font-bold text-gradient mb-1">
              &lt;ML/&gt;
            </p>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Mateusz Łagocki. Wszystkie prawa
              zastrzeżone.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              aria-label="GitHub"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#contact"
              aria-label="Email"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>

          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            Zbudowane z <Heart size={14} className="text-pink-500 fill-pink-500" /> i
            Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
