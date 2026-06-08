"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";

export function TimelineZoom() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        // Visual indicator of a zoom edit
        gsap.fromTo(containerRef.current, 
          { scaleY: 0.1, opacity: 0 }, 
          { scaleY: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-[15vh] w-full flex items-center justify-center overflow-hidden relative border-t border-b border-border/30 bg-bg">
      <div className="font-mono text-[10px] tracking-[0.3em] text-text-mid">ZOOMING TO SEQUENCE...</div>
    </div>
  );
}
