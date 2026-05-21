"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useI18n } from "./I18nProvider";
import LanguageToggle from "./LanguageToggle";
import ThemeSwitcher from "./ThemeSwitcher";

type LinkItem = {
  href: string;
  key: keyof ReturnType<typeof useI18n>["dict"]["nav"];
  sectionId?: string;
};

const links: LinkItem[] = [
  { href: "/#home", key: "home", sectionId: "home" },
  { href: "/#about", key: "about", sectionId: "about" },
  { href: "/#skills", key: "skills", sectionId: "skills" },
  { href: "/#projects", key: "projects", sectionId: "projects" },
  { href: "/teraz", key: "teraz" },
  { href: "/blog", key: "blog" },
  { href: "/#contact", key: "contact", sectionId: "contact" },
];

export default function Navbar() {
  const { dict } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["home", "about", "skills", "projects", "timeline", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isLinkActive = (link: LinkItem): boolean => {
    if (link.href === "/teraz") return pathname === "/teraz";
    if (link.href === "/blog") return pathname.startsWith("/blog");
    if (link.sectionId && pathname === "/") return activeSection === link.sectionId;
    return false;
  };

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
          href={pathname === "/" ? "#home" : "/"}
          className="font-mono text-lg font-bold text-gradient"
        >
          &lt;ML/&gt;
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {links.map((link) => {
            const active = isLinkActive(link);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm transition-colors relative group ${
                    active ? "text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {dict.nav[link.key]}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <ThemeSwitcher />
          <LanguageToggle />
          <a
            href="/#contact"
            className="inline-flex px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            {dict.nav.cta}
          </a>
        </div>

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
            {links.map((link) => {
              const active = isLinkActive(link);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block transition-colors ${
                      active ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {dict.nav[link.key]}
                  </a>
                </li>
              );
            })}
            <li className="pt-2 border-t border-white/5">
              <LanguageToggle />
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
