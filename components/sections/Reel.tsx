"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";
import { TrackLabel } from "@/components/fx/TrackLabel";

export function Reel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const [videoDuration, setVideoDuration] = useState(10); // default fallback
  const [isMuted, setIsMuted] = useState(true);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration || 10);
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 0.5,
        pin: true,
      }
    });

    // Move the playhead across the timeline UI
    tl.to(playheadRef.current, {
      left: "100%",
      ease: "none",
    }, 0);

  }, { scope: containerRef, dependencies: [videoDuration] });

  return (
    <section ref={containerRef} className="h-[100dvh] w-full bg-bg flex flex-col pt-24" id="reel">
      {/* Video Monitor */}
      <div className="flex-1 w-full max-w-6xl mx-auto px-4 relative flex flex-col justify-center">
        <div className="relative aspect-video w-full bg-black rounded-sm border border-border overflow-hidden shadow-2xl group">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/videos/compressed/3.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
          />
          {/* Monitor HUD */}
          <div className="absolute top-4 left-4 font-mono text-[10px] text-text-hi bg-black/50 px-2 py-1 rounded">
            SOURCE: SHOWREEL_FINAL_HQ.mp4
          </div>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 right-4 font-mono text-[10px] text-text-hi bg-black/50 hover:bg-accent hover:text-bg border border-border/50 px-3 py-1 rounded transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            [ {isMuted ? "UNMUTE" : "MUTE"} ]
          </button>

          <div className="absolute bottom-4 right-4 font-mono text-[10px] text-red bg-black/50 px-2 py-1 rounded flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red animate-pulse" />
            REC
          </div>
        </div>
      </div>

      {/* Editor Timeline UI */}
      <div className="h-64 w-full border-t border-border bg-surface p-4 flex flex-col gap-1 relative overflow-hidden">
        
        {/* Playhead */}
        <div ref={playheadRef} className="absolute top-0 bottom-0 w-[1px] bg-red z-50 left-0">
          <div className="w-3 h-4 bg-red -translate-x-1" />
        </div>

        {/* Ruler */}
        <div className="h-6 flex items-end mb-2 relative">
          <div className="absolute inset-0 flex justify-between px-16 text-[10px] font-mono text-text-mid">
            <span>00:00</span><span>00:15</span><span>00:30</span><span>00:45</span><span>01:00</span>
          </div>
          <div className="w-full border-b border-border" />
        </div>

        {/* Tracks */}
        <div className="flex flex-col gap-1 overflow-y-hidden">
          <div className="flex gap-4 items-center h-10">
            <TrackLabel trackId="V2" label="B-ROLL" className="w-24 shrink-0" />
            <div className="flex-1 bg-[#2a2a2a] rounded flex items-center px-2 text-[10px] font-mono text-text-mid overflow-hidden">
              <div className="h-full bg-accent/20 border-l border-r border-accent/40 text-accent flex items-center px-2" style={{ width: '40%', marginLeft: '10%' }}>
                OVERLAY_01
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 items-center h-10">
            <TrackLabel trackId="V1" label="MAIN" className="w-24 shrink-0" />
            <div className="flex-1 bg-[#2a2a2a] rounded flex items-center px-0 text-[10px] font-mono text-text-mid overflow-hidden">
              <div className="h-full bg-blue-500/20 border-l border-r border-blue-500/40 text-blue-400 flex items-center px-2" style={{ width: '30%' }}>CLIP_A</div>
              <div className="h-full bg-blue-500/20 border-l border-r border-blue-500/40 text-blue-400 flex items-center px-2" style={{ width: '45%' }}>CLIP_B</div>
              <div className="h-full bg-blue-500/20 border-l border-r border-blue-500/40 text-blue-400 flex items-center px-2" style={{ width: '25%' }}>CLIP_C</div>
            </div>
          </div>

          <div className="flex gap-4 items-center h-10">
            <TrackLabel trackId="A1" label="AUDIO" className="w-24 shrink-0" />
            <div className="flex-1 bg-[#1a2a1a] rounded flex items-center px-0 text-[10px] font-mono text-text-mid overflow-hidden">
              <div className="h-full bg-green-500/20 border-l border-r border-green-500/40 text-green-400 flex items-center justify-center w-full relative">
                 {/* Fake audio waveform bars via CSS bg */}
                 <div className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(74, 222, 128, 0.2) 2px, rgba(74, 222, 128, 0.2) 4px)' }} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
