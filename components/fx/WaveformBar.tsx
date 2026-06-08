"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface WaveformBarProps {
  className?: string;
  bars?: number;
  animated?: boolean;
}

export const WaveformBar = memo(function WaveformBar({ 
  className, 
  bars = 40,
  animated = false
}: WaveformBarProps) {
  return (
    <div className={cn("flex items-end gap-[2px] h-8", className)}>
      {Array.from({ length: bars }).map((_, i) => {
        // Deterministic pseudo-random generation to prevent hydration mismatch
        const seed = i + 1;
        const pseudoRand1 = Math.abs(Math.sin(seed * 1.1) * 10000) % 1;
        const pseudoRand2 = Math.abs(Math.sin(seed * 2.2) * 10000) % 1;
        const pseudoRand3 = Math.abs(Math.sin(seed * 3.3) * 10000) % 1;

        const heightPercent = 20 + Math.abs(Math.sin(i * 0.5) * 60) + pseudoRand1 * 20;
        
        return (
          <div
            key={i}
            suppressHydrationWarning
            className="w-1 bg-text-hi/40 rounded-t-sm"
            style={{
              height: `${heightPercent.toFixed(2)}%`,
              ...(animated && {
                animationName: "pulse",
                animationDuration: `${(1 + pseudoRand2).toFixed(2)}s`,
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                animationDelay: `${pseudoRand3.toFixed(2)}s`,
              }),
            }}
          />
        );
      })}
    </div>
  );
});
