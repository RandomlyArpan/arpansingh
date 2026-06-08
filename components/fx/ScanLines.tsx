"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

export const ScanLines = memo(function ScanLines({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.03]",
        className
      )}
      style={{
        background: `linear-gradient(
          to bottom,
          transparent 50%,
          rgba(0, 0, 0, 0.5) 51%
        )`,
        backgroundSize: "100% 4px",
      }}
    />
  );
});
