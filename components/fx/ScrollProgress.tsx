"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[200] pointer-events-none bg-surface">
      <motion.div
        className="h-full w-full origin-left bg-red shadow-[0_0_10px_rgba(255,0,0,0.8)]"
        style={{ scaleX }}
      />
    </div>
  );
}
