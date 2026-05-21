"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  User,
  Code2,
  FolderGit2,
  Clock,
  BookOpen,
  Mail,
  Github,
  Copy,
  ExternalLink,
  Command,
} from "lucide-react";

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: typeof Home;
  shortcut?: string;
  perform: () => void;
  group: "Nawigacja" | "Linki" | "Akcje";
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const scrollTo = (hash: string) => {
    setOpen(false);
    if (window.location.pathname !== "/") {
      router.push(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("lagockimateusz6@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const actions: Action[] = useMemo(
    () => [
      {
        id: "home",
        label: "Strona główna",
        hint: "Hero",
        icon: Home,
        perform: () => scrollTo("#home"),
        group: "Nawigacja",
      },
      {
        id: "about",
        label: "O mnie",
        hint: "Sekcja About",
        icon: User,
        perform: () => scrollTo("#about"),
        group: "Nawigacja",
      },
      {
        id: "skills",
        label: "Umiejętności",
        hint: "Tech stack",
        icon: Code2,
        perform: () => scrollTo("#skills"),
        group: "Nawigacja",
      },
      {
        id: "projects",
        label: "Projekty",
        hint: "Portfolio prac",
        icon: FolderGit2,
        perform: () => scrollTo("#projects"),
        group: "Nawigacja",
      },
      {
        id: "timeline",
        label: "Moja droga",
        hint: "Timeline",
        icon: Clock,
        perform: () => scrollTo("#timeline"),
        group: "Nawigacja",
      },
      {
        id: "teraz",
        label: "Teraz",
        hint: "Co aktualnie robię",
        icon: Clock,
        perform: () => {
          setOpen(false);
          router.push("/teraz");
        },
        group: "Nawigacja",
      },
      {
        id: "blog",
        label: "Blog",
        hint: "Wszystkie posty",
        icon: BookOpen,
        perform: () => {
          setOpen(false);
          router.push("/blog");
        },
        group: "Nawigacja",
      },
      {
        id: "contact",
        label: "Kontakt",
        hint: "Formularz kontaktowy",
        icon: Mail,
        perform: () => scrollTo("#contact"),
        group: "Nawigacja",
      },
      {
        id: "github",
        label: "Otwórz GitHub",
        hint: "github.com/Mateuszl28",
        icon: Github,
        perform: () => {
          window.open("https://github.com/Mateuszl28", "_blank");
          setOpen(false);
        },
        group: "Linki",
      },
      {
        id: "repo",
        label: "Kod tej strony",
        hint: "moja-strona repo",
        icon: ExternalLink,
        perform: () => {
          window.open(
            "https://github.com/Mateuszl28/moja-strona",
            "_blank"
          );
          setOpen(false);
        },
        group: "Linki",
      },
      {
        id: "copy-email",
        label: copied ? "Skopiowane!" : "Skopiuj mój email",
        hint: "lagockimateusz6@gmail.com",
        icon: Copy,
        perform: copyEmail,
        group: "Akcje",
      },
      {
        id: "mail",
        label: "Napisz email",
        hint: "Otwórz klienta pocztowego",
        icon: Mail,
        perform: () => {
          window.location.href = "mailto:lagockimateusz6@gmail.com";
          setOpen(false);
        },
        group: "Akcje",
      },
    ],
    [copied]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return actions;
    const q = query.toLowerCase();
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.hint?.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q)
    );
  }, [query, actions]);

  const grouped = useMemo(() => {
    const g: Record<string, Action[]> = {};
    filtered.forEach((a) => {
      g[a.group] ||= [];
      g[a.group].push(a);
    });
    return g;
  }, [filtered]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(filtered.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[activeIndex]?.perform();
      }
    };
    window.addEventListener("keydown", onNav);
    return () => window.removeEventListener("keydown", onNav);
  }, [open, filtered, activeIndex]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full glass glass-hover text-xs font-mono text-slate-400 hover:text-white transition-all shadow-lg group"
        aria-label="Open command palette"
      >
        <Command size={14} className="group-hover:text-purple-400" />
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] font-mono">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[15vh] bg-black/60 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#13131a]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Search size={18} className="text-slate-500" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Wpisz akcję lub nazwę sekcji..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                />
                <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-slate-500">
                  ESC
                </kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-slate-500">
                    Nic nie pasuje. Spróbuj innego zapytania.
                  </div>
                ) : (
                  Object.entries(grouped).map(([group, list]) => (
                    <div key={group} className="px-2 py-1">
                      <p className="px-3 py-1.5 text-[10px] uppercase tracking-wider font-mono text-slate-500">
                        {group}
                      </p>
                      {list.map((a) => {
                        const globalIndex = filtered.indexOf(a);
                        const isActive = globalIndex === activeIndex;
                        return (
                          <button
                            key={a.id}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            onClick={() => a.perform()}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                              isActive
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                                : ""
                            }`}
                          >
                            <a.icon
                              size={16}
                              className={
                                isActive ? "text-purple-400" : "text-slate-500"
                              }
                            />
                            <span className="flex-1">
                              <span
                                className={`block text-sm ${isActive ? "text-white" : "text-slate-300"}`}
                              >
                                {a.label}
                              </span>
                              {a.hint && (
                                <span className="block text-[11px] text-slate-500 mt-0.5">
                                  {a.hint}
                                </span>
                              )}
                            </span>
                            {isActive && (
                              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-400">
                                ↵
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-t border-white/5 text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-white/5">↑</kbd>
                    <kbd className="px-1 py-0.5 rounded bg-white/5">↓</kbd>
                    Nawigacja
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded bg-white/5">↵</kbd>
                    Wybierz
                  </span>
                </div>
                <span>{filtered.length} wyników</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
