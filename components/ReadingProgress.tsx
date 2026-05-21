"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[55] h-[3px] origin-left bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
      />
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[54] h-[3px] origin-left bg-purple-500/30 blur-sm"
      />
    </>
  );
}
