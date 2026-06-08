"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";

export function TrackCollapse() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        gsap.fromTo(containerRef.current, 
          { scaleY: 2, opacity: 0 }, 
          { scaleY: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-[5vh] w-full bg-border flex items-center justify-center overflow-hidden">
      <div className="w-full h-px bg-text-lo" />
    </div>
  );
}
