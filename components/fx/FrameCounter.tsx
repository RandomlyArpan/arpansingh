"use client";

import { useEffect, useState } from "react";
import { useScroll } from "motion/react";
import { cn } from "@/lib/utils";

interface FrameCounterProps {
  className?: string;
  totalFrames?: number;
}

export function FrameCounter({ className, totalFrames = 2997 }: FrameCounterProps) {
  const { scrollYProgress } = useScroll();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setFrame(Math.floor(latest * totalFrames));
    });
    return () => unsubscribe();
  }, [scrollYProgress, totalFrames]);

  return (
    <div className={cn("font-mono text-xs tracking-wider text-text-hi opacity-80", className)}>
      FRAME {frame.toString().padStart(4, "0")} / {totalFrames.toString().padStart(4, "0")}
    </div>
  );
}
