"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { WaveformBar } from "@/components/fx/WaveformBar";

const TESTIMONIALS = [
  { quote: "Arpan's cuts hit different. Every frame intentional.", client: "Alex R.", company: "Studio A" },
  { quote: "Delivered our brand film in 3 days. Flawless execution.", client: "Priya M.", company: "Agency B" },
  { quote: "The beat sync on our music video was insane. Pure craft.", client: "Sam K.", company: "Label C" },
];

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const dragX = useMotionValue(0);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -50) {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    } else if (x >= 50) {
      setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    }
    animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <section className="py-24 w-full bg-bg relative overflow-hidden flex flex-col items-center justify-center min-h-[60vh]" id="testimonials">
      <div className="font-mono text-xs tracking-widest text-text-mid mb-12">[ 02 / REVIEWS ]</div>

      <div className="relative w-full max-w-2xl h-[400px] perspective-[1000px]">
        {TESTIMONIALS.map((t, i) => {
          const isActive = i === activeIdx;
          const isPrev = i === (activeIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
          const isNext = i === (activeIdx + 1) % TESTIMONIALS.length;

          let rotateY = 0;
          let x = "0%";
          let z = 0;
          let opacity = 0;

          if (isActive) {
            rotateY = 0; x = "0%"; z = 0; opacity = 1;
          } else if (isPrev) {
            rotateY = 15; x = "-30%"; z = -100; opacity = 0.3;
          } else if (isNext) {
            rotateY = -15; x = "30%"; z = -100; opacity = 0.3;
          }

          return (
            <motion.div
              key={i}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              animate={{ rotateY, x, z, opacity }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="absolute top-0 left-0 right-0 mx-auto w-[80%] h-full cursor-grab active:cursor-grabbing transform-style-3d"
              style={{
                x: isActive ? dragX : 0,
                // Prevent z-fighting and clicks on hidden cards
                pointerEvents: isActive ? "auto" : "none",
                zIndex: isActive ? 10 : 0
              }}
            >
              {/* Monitor Frame */}
              <div className="w-full h-full bg-surface border border-border/50 rounded-lg shadow-2xl flex flex-col relative overflow-hidden">
                
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-5" style={{ background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))", backgroundSize: "100% 2px, 3px 100%" }} />

                {/* Header */}
                <div className="bg-border/30 px-4 py-2 border-b border-border/50 font-mono text-[10px] text-text-mid flex justify-between">
                  <span>SOURCE: {t.company.toUpperCase().replace(" ", "_")}.mp4</span>
                  <span>00:00:04:12</span>
                </div>

                {/* Quote (Subtitle style) */}
                <div className="flex-1 flex flex-col justify-end p-6 md:p-8 pb-10 md:pb-12 relative z-10">
                  <p className="font-bebas text-2xl md:text-4xl text-text-hi text-center text-shadow-glow leading-tight">
                    "{t.quote}"
                  </p>
                  <p className="font-mono text-xs text-text-mid text-center mt-4 tracking-widest">
                    — {t.client}
                  </p>
                </div>

                {/* VU Meter Accent */}
                <div className="absolute bottom-4 right-4">
                  <WaveformBar bars={6} animated className="h-4 opacity-50" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination dots */}
      <div className="flex gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setActiveIdx(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === activeIdx ? 'bg-accent' : 'bg-border'}`}
          />
        ))}
      </div>
    </section>
  );
}
