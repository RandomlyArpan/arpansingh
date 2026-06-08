"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LetterboxProps {
  className?: string;
  isCinematic?: boolean;
}

export function Letterbox({ className, isCinematic = false }: LetterboxProps) {
  // We use framer-motion to easily animate the height if we toggle cinematic mode
  return (
    <div className={cn("pointer-events-none fixed inset-0 z-30 h-full w-full", className)}>
      {/* Top Bar */}
      <motion.div
        initial={false}
        animate={{ height: isCinematic ? "12vh" : "0vh" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // power3.out equivalent
        className="absolute top-0 left-0 w-full bg-bg"
      />
      {/* Bottom Bar */}
      <motion.div
        initial={false}
        animate={{ height: isCinematic ? "12vh" : "0vh" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-full bg-bg"
      />
    </div>
  );
}
