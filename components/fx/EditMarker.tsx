"use client";

import { cn } from "@/lib/utils";

interface EditMarkerProps {
  className?: string;
  label?: string;
  color?: "accent" | "red" | "white";
}

export function EditMarker({ className, label, color = "accent" }: EditMarkerProps) {
  const bgColors = {
    accent: "bg-accent",
    red: "bg-red",
    white: "bg-white",
  };

  const textColors = {
    accent: "text-accent",
    red: "text-red",
    white: "text-white",
  };

  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Marker Diamond */}
      <div className={cn("w-2 h-2 rotate-45 mb-1", bgColors[color])} />
      
      {/* Vertical Line */}
      <div className={cn("w-[1px] h-full opacity-50", bgColors[color])} />
      
      {/* Label */}
      {label && (
        <span className={cn("absolute top-3 whitespace-nowrap font-mono text-[10px] ml-2 left-full", textColors[color])}>
          {label}
        </span>
      )}
    </div>
  );
}
