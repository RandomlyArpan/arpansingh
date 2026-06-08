"use client";

import { cn } from "@/lib/utils";

interface TrackLabelProps {
  className?: string;
  trackId: string; // e.g. "V1", "A1"
  label: string;
}

export function TrackLabel({ className, trackId, label }: TrackLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs", className)}>
      <span className="text-accent bg-accent/10 px-1 py-0.5 rounded border border-accent/20">
        [{trackId}]
      </span>
      <span className="text-text-mid uppercase tracking-widest">{label}</span>
    </div>
  );
}
