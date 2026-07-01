"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Scroll-reveal bez framer-motion: IntersectionObserver przełącza data-shown, resztę robi CSS
// ([data-reveal] w globals.css). Lżejsze i bez zależności od framer-motion.
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal
      data-shown={shown ? "true" : "false"}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
