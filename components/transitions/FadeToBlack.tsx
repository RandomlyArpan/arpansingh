"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";

export function FadeToBlack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const finRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    tl.to(containerRef.current, { backgroundColor: "#000" }, 0);
    
    // Flash FIN for exactly 1 frame visually
    tl.to(finRef.current, { opacity: 1, duration: 0.01 }, 0.5);
    tl.to(finRef.current, { opacity: 0, duration: 0.01 }, 0.52);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-[20vh] w-full flex items-center justify-center relative bg-bg">
    </div>
  );
}
