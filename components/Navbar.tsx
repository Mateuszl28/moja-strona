"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "O mnie" },
  { href: "/#skills", label: "Umiejętności" },
  { href: "/#projects", label: "Projekty" },
  { href: "/teraz", label: "Teraz" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="font-mono text-lg font-bold text-gradient"
        >
          &lt;ML/&gt;
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-slate-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Napisz do mnie
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-md border-b border-white/5"
        >
          <ul className="flex flex-col gap-4 px-6 py-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-slate-300 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
