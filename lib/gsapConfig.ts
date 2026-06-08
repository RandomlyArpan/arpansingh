"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Normalize scroll to fix iOS/Android touch jumpiness with pinned sections
  ScrollTrigger.normalizeScroll(true);
}

export { gsap, ScrollTrigger };
