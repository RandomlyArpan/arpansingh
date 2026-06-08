"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";

const PROJECTS = [
  { id: "01", title: "FIGURING OUT", desc: "Fast-paced beat-sync edit with dynamic cuts", videoSrc: "/videos/compressed/1.mp4" },
  { id: "02", title: "KTK BTS", desc: "Behind-the-scenes event wrap-up reel", videoSrc: "/videos/compressed/2.mp4" },
  { id: "03", title: "RADIOHEAD MV", desc: "Cinematic music video shot and edited independently", videoSrc: "/videos/compressed/3.mp4" },
  { id: "04", title: "STILL ALIVE", desc: "Personal montage compilation of memories and experiences", videoSrc: "/videos/compressed/4.mp4" },
  { id: "05", title: "MOTION GRAPHICS", desc: "Beat-sync motion graphics with animated typography and visual effects", videoSrc: "/videos/compressed/5.mp4" },
];

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Query the DOM for the panels instead of relying on React refs, 
    // which can sometimes be empty on the very first layout effect tick in Strict Mode
    const panels = gsap.utils.toArray(".work-panel") as HTMLElement[];
    if (panels.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${panels.length * 150}%`,
        pin: true,
        scrub: 1,
      }
    });

    // We start with panel 0 fully visible.
    // Add a pause at the very beginning so the user can watch Video 1 (Panel 0) before the scrolling action starts wiping over it
    tl.to({}, { duration: 0.8 });

    // As user scrolls, panel 1 wipes over panel 0, then 2 over 1, etc.
    panels.forEach((panel, i) => {
      if (i === 0) return;
      // Start hidden on the right
      gsap.set(panel, { clipPath: "inset(0 100% 0 0)" });
      
      tl.to(panel, {
        clipPath: "inset(0 0% 0 0)",
        ease: "power2.inOut",
        duration: 1,
      });
      
      // HOLD state: this creates empty scroll space where the video just plays and stays fully visible!
      tl.to(panel, {
        duration: 0.8, // Holds for 80% of the wipe duration
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-[100dvh] w-full relative bg-bg" id="work">
      {PROJECTS.map((project, i) => (
        <div 
          key={project.id}
          className="work-panel absolute inset-0 h-full w-full flex flex-col justify-end p-6 md:p-12 z-10 isolate bg-bg"
          style={{ zIndex: i + 10 }} // Higher index for later panels
        >
          {/* Cinematic Video Background for the project */}
          <div className="absolute inset-0 z-0 bg-surface overflow-hidden">
             <video 
               src={project.videoSrc}
               autoPlay 
               muted 
               loop 
               playsInline
               className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent mix-blend-multiply" />
          </div>

          {/* Project Content */}
          <div className="relative z-10 flex flex-col gap-2 pointer-events-none">
            <div className="flex items-end gap-6 border-b border-border/50 pb-4">
              <span className="font-bebas text-[15vw] leading-[0.8] text-text-hi opacity-80 mix-blend-overlay">
                {project.id}
              </span>
              <div className="flex flex-col mb-2 md:mb-4">
                <h2 className="font-bebas text-5xl md:text-8xl tracking-tight text-text-hi">{project.title}</h2>
                <div className="font-mono text-xs md:text-sm tracking-[0.2em] text-text-mid flex items-center gap-4 mt-2 max-w-xl leading-relaxed uppercase">
                  <span>{project.desc}</span>
                </div>
              </div>
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] text-text-lo uppercase mt-2">
              ↓ SCROLL FOR NEXT PROJECT
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
