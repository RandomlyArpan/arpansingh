"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { ScrollTrigger } from "@/lib/gsapConfig";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Refresh ScrollTrigger on route change (if any) to ensure markers are aligned
    ScrollTrigger.refresh();
  }, [pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
