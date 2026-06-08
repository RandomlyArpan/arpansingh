"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { ScrollTrigger } from "@/lib/gsapConfig";
import { TrackLabel } from "@/components/fx/TrackLabel";
import { EditMarker } from "@/components/fx/EditMarker";

const WORKFLOW = [
  { id: "V1", title: "PRE-PRODUCTION", desc: "Script review, mood board, reference reel" },
  { id: "V2", title: "ROUGH CUT", desc: "Pacing structure, beat mapping, selects" },
  { id: "V3", title: "COLOUR GRADE", desc: "LUT application, scene consistency" },
  { id: "A1", title: "SOUND DESIGN", desc: "SFX, music sync, ambience layers" },
  { id: "A2", title: "FINAL EXPORT", desc: "Platform-optimised delivery" },
];

function DraggableRow({ step, index, setRef }: { step: any, index: number, setRef: (el: HTMLDivElement | null) => void }) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={setRef}
      className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 group"
    >
      <TrackLabel trackId={step.id} label={`STEP_0${index+1}`} className="w-32 shrink-0 pointer-events-none" />
      
      {/* Timeline Track Bg */}
      <div 
        ref={constraintsRef}
        className="flex-1 bg-surface border border-border/50 h-20 rounded relative flex items-center overflow-hidden pointer-events-auto"
      >
        {/* Horizontal Guide line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border/40 pointer-events-none" />

        <EditMarker className="absolute left-[10%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* The "Clip" block wrapper (animated by GSAP to avoid conflict with framer-motion) */}
        <div className="clip-block-wrapper w-[60%] md:w-[70%] h-full flex items-center ml-[10%]">
          <motion.div 
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
            whileDrag={{ scale: 1.01, zIndex: 50 }}
            className="w-full h-[70%] relative z-10 bg-accent/10 border border-accent/30 p-3 rounded flex flex-col justify-center hover:bg-accent/20 transition-colors cursor-grab active:cursor-grabbing pointer-events-auto shadow-xl"
          >
            <h3 className="font-mono text-sm text-text-hi pointer-events-none">{step.title}</h3>
            <p className="font-mono text-[10px] text-text-mid mt-1 pointer-events-none">{step.desc}</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const rows = rowsRef.current;
    rows.forEach((row) => {
      if (!row) return; // Guard against unmounted refs
      const block = row.querySelector(".clip-block-wrapper");
      if (!block) return; // Guard against missing elements
      
      gsap.from(block, {
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        },
        x: 300,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 w-full bg-bg relative" id="process">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-text-mid pointer-events-none">[ 01 / WORKFLOW ]</span>
          <div className="flex-1 h-px bg-border pointer-events-none" />
        </div>

        <div className="flex flex-col gap-4">
          {WORKFLOW.map((step, i) => (
            <DraggableRow 
              key={i} 
              step={step} 
              index={i} 
              setRef={(el) => { if (el) rowsRef.current[i] = el; }} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
