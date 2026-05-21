"use client";

import { motion } from "framer-motion";

type Props = {
  number: string;
  position?: "left" | "right";
};

export default function SectionNumber({ number, position = "right" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      aria-hidden
      className={`absolute -z-0 top-1/2 -translate-y-1/2 select-none pointer-events-none font-mono font-black text-[12rem] md:text-[18rem] lg:text-[22rem] leading-none whitespace-nowrap ${
        position === "right"
          ? "right-0 translate-x-1/4 md:translate-x-1/3"
          : "left-0 -translate-x-1/4 md:-translate-x-1/3"
      }`}
      style={{
        background:
          "linear-gradient(135deg, rgba(168,85,247,0.04) 0%, rgba(236,72,153,0.02) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextStroke: "1px rgba(168,85,247,0.08)",
        color: "transparent",
      }}
    >
      {number}
    </motion.div>
  );
}
