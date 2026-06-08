"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";

const PROJECTS = [
  { id: "01", title: "NEON FREQUENCY", client: "CLIENT A", genre: "MUSIC VIDEO", color: "bg-red" },
  { id: "02", title: "THE LONG GAME", client: "CLIENT B", genre: "LONG FORM", color: "bg-accent" },
  { id: "03", title: "60 SECONDS", client: "CLIENT C", genre: "COMMERCIAL", color: "bg-blue-500" },
  { id: "04", title: "BEAT DROP", client: "CLIENT D", genre: "BEAT SYNC", color: "bg-purple-500" },
  { id: "05", title: "FRAME BY FRAME", client: "CLIENT E", genre: "SHORT FILM", color: "bg-green-500" },
];

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    // Pin the container and reveal panels one by one via clipPath wipe
    const panels = panelsRef.current;
    if (panels.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${panels.length * 100}%`,
        pin: true,
        scrub: 1,
      }
    });

    // We start with panel 0 fully visible.
    // As user scrolls, panel 1 wipes over panel 0, then 2 over 1, etc.
    panels.forEach((panel, i) => {
      if (i === 0) return;
      // Start hidden on the right
      gsap.set(panel, { clipPath: "inset(0 100% 0 0)" });
      
      tl.to(panel, {
        clipPath: "inset(0 0% 0 0)",
        ease: "power2.inOut",
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-bg" id="work">
      {PROJECTS.map((project, i) => (
        <div 
          key={project.id}
          ref={(el) => { if (el) panelsRef.current[i] = el; }}
          className="absolute inset-0 h-full w-full flex flex-col justify-end p-6 md:p-12 z-10"
          style={{ zIndex: i + 10 }} // Higher index for later panels
        >
          {/* Fake Video Background for the project */}
          <div className="absolute inset-0 z-0 bg-surface">
             <div className="absolute inset-0 bg-black/60" />
             {/* A placeholder color to differentiate them easily while dev */}
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-20 ${project.color}`} />
          </div>

          {/* Project Content */}
          <div className="relative z-10 flex flex-col gap-2 pointer-events-none">
            <div className="flex items-end gap-6 border-b border-border/50 pb-4">
              <span className="font-bebas text-[15vw] leading-[0.8] text-text-hi opacity-80 mix-blend-overlay">
                {project.id}
              </span>
              <div className="flex flex-col mb-2 md:mb-4">
                <h2 className="font-bebas text-5xl md:text-8xl tracking-tight text-text-hi">{project.title}</h2>
                <div className="font-mono text-sm tracking-[0.2em] text-text-mid flex items-center gap-4 mt-2">
                  <span>{project.client}</span>
                  <span className="w-1 h-1 bg-accent/50 rounded-full" />
                  <span>{project.genre}</span>
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
