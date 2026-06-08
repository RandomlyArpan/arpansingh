"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsapConfig";
import { WaveformBar } from "@/components/fx/WaveformBar";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timecodeRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds countdown
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  useGSAP(() => {
    // Title Reveal line by line
    const lines = titleRef.current?.querySelectorAll(".line-wrapper");
    if (lines) {
      gsap.from(lines, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out"
      });
    }

    // Fade out waveform
    gsap.to(waveformRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
      },
      opacity: 0.1,
      height: 2,
      duration: 3,
      delay: 1,
      ease: "power2.out"
    });

    // Start timecode countdown when in view
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 50%",
      once: true,
      onEnter: () => {
        let current = 5 * 24; // 5 seconds at 24fps
        const timer = setInterval(() => {
          current--;
          if (current <= 0) {
            clearInterval(timer);
            setTimeLeft(0);
          } else {
            setTimeLeft(current / 24);
          }
        }, 1000 / 24);
      }
    });

  }, { scope: containerRef });

  const formatCountdown = (time: number) => {
    if (time <= 0) return "00:00:00:00";
    const sec = Math.floor(time);
    const frames = Math.floor((time % 1) * 24);
    return `00:00:0${sec}:${frames.toString().padStart(2, "0")}`;
  };

  return (
    <section ref={containerRef} className="min-h-[100dvh] w-full bg-black relative flex flex-col justify-between py-12 px-6 md:px-12" id="contact">

      <div className="flex-1 flex flex-col items-center justify-center">

        <h2 ref={titleRef} className="font-bebas text-[10vw] md:text-[8vw] leading-none text-center text-text-hi mb-8">
          <div className="overflow-hidden"><div className="line-wrapper">YOUR FOOTAGE</div></div>
          <div className="overflow-hidden"><div className="line-wrapper">DESERVES BETTER.</div></div>
        </h2>

        <div ref={waveformRef} className="w-full max-w-2xl overflow-hidden transition-all duration-1000 flex justify-center mb-12">
          <WaveformBar bars={40} animated className="h-16 w-full" />
        </div>

        <div className="min-h-[300px] flex flex-col justify-center items-center w-full">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="border border-border bg-surface px-8 py-4 font-mono text-sm tracking-widest hover:bg-accent hover:text-bg hover:border-accent transition-colors duration-300 relative group"
            >
              [ START A PROJECT ]
              <div className="absolute inset-0 border border-accent scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </button>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormState("submitting");

                const formData = new FormData(e.currentTarget);
                const name = formData.get("name");
                const email = formData.get("email");
                const details = formData.get("details");

                const mailtoLink = `mailto:singharpan700@email.com?subject=New Project Inquiry from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AProject Details:%0D%0A${details}`;

                setTimeout(() => {
                  window.location.href = mailtoLink;
                  setFormState("success");
                }, 1000);
              }}
              className="w-full max-w-md flex flex-col gap-4 font-mono text-xs animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {formState === "success" ? (
                <div className="text-center text-text-hi py-12 border border-border bg-surface flex flex-col gap-4 items-center animate-in fade-in zoom-in-95 duration-500">
                  <span className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 text-lg">✓</span>
                  [ TRANSMISSION RECEIVED. STAND BY. ]
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-text-mid tracking-widest">NAME</label>
                    <input name="name" required className="bg-surface border border-border/50 p-3 text-text-hi focus:border-accent focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-text-mid tracking-widest">EMAIL</label>
                    <input name="email" required type="email" className="bg-surface border border-border/50 p-3 text-text-hi focus:border-accent focus:outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-text-mid tracking-widest">PROJECT DETAILS</label>
                    <textarea name="details" required rows={4} className="bg-surface border border-border/50 p-3 text-text-hi focus:border-accent focus:outline-none transition-colors resize-none" />
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button type="button" onClick={() => setShowForm(false)} className="px-6 py-3 border border-border/50 text-text-mid hover:text-text-hi transition-colors w-1/3">
                      [ CANCEL ]
                    </button>
                    <button type="submit" disabled={formState === "submitting"} className="flex-1 bg-accent text-bg font-bold tracking-widest hover:bg-white transition-colors py-3 disabled:opacity-50">
                      {formState === "submitting" ? "ENCODING..." : "[ SEND DISPATCH ]"}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>

      </div>

      <div className="w-full">
        <div className="w-full h-px bg-border/30 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs tracking-widest text-text-mid">

          <a href="mailto:singharpan700@email.com" className="hover:text-text-hi transition-colors">
            singharpan700@email.com
          </a>

          <div className="flex gap-6">
            <a href="https://www.instagram.com/smplyarpan" className="hover:text-text-hi transition-colors">INSTAGRAM</a>
            {/* <a href="#" className="hover:text-text-hi transition-colors">YT</a>
            <a href="#" className="hover:text-text-hi transition-colors">LI</a>
            <a href="#" className="hover:text-text-hi transition-colors">BE</a> */}
          </div>

        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-end md:items-center gap-4 font-mono text-[10px] text-text-lo uppercase">
          <div className="flex flex-col gap-1">
            <div>A film by Arpan Singh. © 2025</div>
            <div >MADE WITH LOVE BY SUJAL</div>
          </div>

          <div className="flex items-center gap-4 text-red">
            <div ref={timecodeRef}>TIMECODE: {formatCountdown(timeLeft)}</div>
            {timeLeft <= 0 && <div className="animate-pulse">END OF SEQUENCE ■</div>}
          </div>
        </div>
      </div>

    </section>
  );
}
