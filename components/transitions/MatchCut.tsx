"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";

export function MatchCut() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // A cinematic hard-cut wipe
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        // Flash effect or hard snap
        gsap.fromTo(containerRef.current, 
          { backgroundColor: "#fff" }, 
          { backgroundColor: "transparent", duration: 0.1 }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-[10vh] w-full flex items-center justify-center relative">
      <div className="absolute w-full h-[1px] bg-red shadow-[0_0_10px_rgba(255,45,32,0.8)] z-10 top-1/2 -translate-y-1/2" />
      <div className="font-mono text-[10px] text-red absolute right-4 top-1/2 -translate-y-[150%] bg-bg px-2 z-20">CUT_POINT_01</div>
    </div>
  );
}
