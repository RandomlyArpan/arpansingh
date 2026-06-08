"use client";

import { motion, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface PlayheadLineProps {
  className?: string;
  progress?: MotionValue<number>; // Optional motion value to bind position
  fixed?: boolean; // If it should just be a static visual element
}

export function PlayheadLine({ className, progress, fixed = false }: PlayheadLineProps) {
  // If progress is provided, it expects a 0-1 value to map to 0-100% left
  
  return (
    <motion.div
      className={cn("absolute top-0 bottom-0 z-40 flex flex-col items-center w-px bg-red", className)}
      style={progress ? { left: progress, translateX: "-50%" } : {}}
    >
      {/* Playhead Cap */}
      <div className="w-3 h-4 bg-red rounded-sm -mt-2 shadow-[0_0_10px_rgba(255,45,32,0.5)]" />
    </motion.div>
  );
}
