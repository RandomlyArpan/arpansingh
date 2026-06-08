"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLSpanElement[]>([]);
  const barsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Animate stats
    countersRef.current.forEach(counter => {
      const target = parseFloat(counter.innerText);
      gsap.fromTo(counter, 
        { innerText: 0 }, 
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          ease: "power2.out",
        }
      );
    });

    // Animate bars
    barsRef.current.forEach(bar => {
      const targetWidth = bar.getAttribute("data-width") || "0%";
      gsap.fromTo(bar,
        { width: "0%" },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          width: targetWidth,
          duration: 1.5,
          ease: "power3.out",
          delay: 0.2
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 w-full bg-bg font-mono text-sm" id="skills">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Panel Container */}
        <div className="border border-border bg-surface/50 rounded-sm overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="bg-border px-4 py-2 flex items-center justify-between border-b border-border">
            <span className="text-text-mid">EXPORT SETTINGS — ARPAN SINGH</span>
            <span className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red" />
              <div className="w-3 h-3 rounded-full bg-accent" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </span>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-8">
            
            {/* Top Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs uppercase tracking-widest text-text-mid">
              <div>
                <div className="mb-1">Codec:</div>
                <div className="text-text-hi">H.264 / ProRes 4444</div>
              </div>
              <div>
                <div className="mb-1">Experience:</div>
                <div className="text-text-hi flex items-center gap-2">
                  <span ref={el => { if (el) countersRef.current[0] = el; }}>5</span> YRS
                </div>
              </div>
              <div>
                <div className="mb-1">Projects:</div>
                <div className="text-text-hi flex items-center gap-2">
                  <span ref={el => { if (el) countersRef.current[1] = el; }}>200</span>+
                </div>
              </div>
              <div>
                <div className="mb-1">Clients:</div>
                <div className="text-text-hi flex items-center gap-2">
                  <span ref={el => { if (el) countersRef.current[2] = el; }}>30</span>+
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-border/50" />

            {/* Skills */}
            <div className="flex flex-col gap-4">
              <div className="text-xs text-text-mid mb-2">SKILLS OVERVIEW</div>
              
              {[
                { name: "Beat Sync", val: 95 },
                { name: "Long Form", val: 85 },
                { name: "Colour Grade", val: 80 },
                { name: "Sound Mix", val: 75 },
                { name: "Motion Gfx", val: 70 },
              ].map((skill, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-text-hi">{skill.name}</div>
                  <div className="flex-1 h-4 bg-bg border border-border/50 relative">
                    <div 
                      ref={el => { if (el) barsRef.current[i] = el; }}
                      data-width={`${skill.val}%`}
                      className="absolute top-0 left-0 h-full bg-text-mid/30" 
                    />
                  </div>
                  <div className="w-12 text-right text-text-mid">{skill.val}%</div>
                </div>
              ))}
            </div>

            <div className="w-full h-px bg-border/50" />

            {/* Software */}
            <div className="flex items-center gap-4 text-xs">
              <div className="text-text-mid">PRIMARY SOFTWARE</div>
              <div className="px-2 py-1 bg-[#31004A] text-[#E788FF] border border-[#E788FF]/30 rounded">
                [ Pr ] Adobe Premiere Pro
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
