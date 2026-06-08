"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { Timecode } from "@/components/fx/Timecode";
import { FrameCounter } from "@/components/fx/FrameCounter";
import { WaveformBar } from "@/components/fx/WaveformBar";
import { TrackLabel } from "@/components/fx/TrackLabel";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const lenis = useLenis();

  useGSAP(() => {
    if (!nameRef.current) return;
    
    // Animate letters in
    const chars = nameRef.current.querySelectorAll(".liquid-char");
    gsap.from(chars, {
      y: 120,
      opacity: 0,
      stagger: 0.04,
      duration: 1.2,
      ease: "power4.out",
      delay: 2.5, // After loading screen
    });

    // Slow zoom video
    gsap.to(".hero-video", {
      scale: 1.05,
      duration: 10,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!nameRef.current || !displacementRef.current || !turbulenceRef.current) return;
    
    const { left, top, width, height } = nameRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;

    // Magnetic pull for characters
    gsap.to(".liquid-char", {
      x: x * 30,
      y: y * 30,
      stagger: 0.01,
      duration: 0.6,
      ease: "power3.out"
    });

    // Liquid ripple effect intensity based on cursor
    gsap.to(displacementRef.current, {
      attr: { scale: 25 },
      duration: 0.4
    });
    
    // Shift turbulence base frequency slightly to simulate flowing water
    gsap.to(turbulenceRef.current, {
      attr: { baseFrequency: `${0.01 + Math.abs(x) * 0.02} ${0.01 + Math.abs(y) * 0.02}` },
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".liquid-char", {
      x: 0,
      y: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.3)"
    });

    gsap.to(displacementRef.current, {
      attr: { scale: 0 },
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-bg" id="hero">
      
      {/* SVG Liquid Filter Definition */}
      <svg className="hidden absolute w-0 h-0">
        <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence 
            ref={turbulenceRef}
            type="fractalNoise" 
            baseFrequency="0.01 0.01" 
            numOctaves="2" 
            result="noise" 
          />
          <feDisplacementMap 
            ref={displacementRef}
            in="SourceGraphic" 
            in2="noise" 
            scale="0" 
            xChannelSelector="R" 
            yChannelSelector="B" 
          />
        </filter>
      </svg>

      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          className="hero-video h-full w-full object-cover opacity-60"
          autoPlay 
          muted 
          loop 
          playsInline
          src="/videos/compressed/5.mp4"
        />
        {/* Color Grade Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,8,8,0.8)_100%)] mix-blend-multiply" />
      </div>

      {/* HUD Layer */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 pointer-events-none">
        
        {/* Top HUD */}
        <div className="flex justify-between items-start pt-16">
          <Timecode isLive startSeconds={3600} />
          <FrameCounter totalFrames={2997} />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-[100vw] overflow-hidden relative z-30">
          <h1 
            ref={nameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="font-bebas text-[20vw] sm:text-[18vw] md:text-[14vw] lg:text-[12vw] xl:text-[180px] leading-none tracking-tighter text-text-hi flex justify-center gap-6 md:gap-10 cursor-none pointer-events-auto"
            style={{ filter: "url(#liquid)" }}
          >
            <div className="flex pointer-events-none">
              {"ARPAN".split("").map((c, i) => (
                <span key={`first-${i}`} className="liquid-char inline-block origin-center text-shadow-glow">{c}</span>
              ))}
            </div>
            <div className="flex pointer-events-none">
              {"SINGH".split("").map((c, i) => (
                <span key={`last-${i}`} className="liquid-char inline-block origin-center text-shadow-glow">{c}</span>
              ))}
            </div>
          </h1>
          
          <p className="font-inter text-text-mid tracking-widest uppercase text-sm mt-4">
            Fast cuts. Long stories. No filler.
          </p>

          <div className="mt-12 flex flex-col items-center gap-6 pointer-events-auto">
            <WaveformBar bars={24} animated className="opacity-50" />
            
            <button 
              onClick={() => {
                if (lenis) {
                  lenis.scrollTo("#reel");
                } else {
                  const element = document.getElementById("reel");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="border border-text-mid/30 px-8 py-3 font-mono text-xs tracking-[0.2em] text-text-hi hover:bg-accent hover:text-bg transition-colors duration-300"
            >
              [ WATCH SHOWREEL ]
            </button>
          </div>
        </div>

        {/* Bottom HUD */}
        <div className="flex justify-between items-end pb-8">
          <TrackLabel trackId="V1" label="MAIN SEQUENCE" />
          <div className="font-mono text-xs text-text-mid tracking-widest">
            IN: 01:00:00:00
          </div>
        </div>
      </div>
    </section>
  );
}
