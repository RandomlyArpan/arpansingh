"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimecodeProps {
  className?: string;
  startSeconds?: number;
  isLive?: boolean;
}

function formatTimecode(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  // Simulate 24fps
  const frames = Math.floor((totalSeconds % 1) * 24);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${frames
    .toString()
    .padStart(2, "0")}`;
}

export function Timecode({ className, startSeconds = 3600, isLive = true }: TimecodeProps) {
  const [time, setTime] = useState(startSeconds);

  useEffect(() => {
    if (!isLive) return;
    
    // Update every frame (~1/24th of a second for visual fidelity)
    let animationFrameId: number;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      setTime(startSeconds + elapsed);
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isLive, startSeconds]);

  return (
    <div className={cn("font-mono text-xs tracking-wider text-text-hi opacity-80", className)}>
      {formatTimecode(time)}
      <span className="ml-2 text-red-500 animate-pulse-slow">REC ●</span>
    </div>
  );
}
