"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const GRADES = [
  { id: "default", label: "RAW / DEFAULT", css: "" },
  { id: "cinematic", label: "TEAL & ORANGE", css: "bg-[linear-gradient(45deg,rgba(0,150,255,0.15),rgba(255,100,0,0.15))] mix-blend-color" },
  { id: "bw", label: "B&W FILM", css: "bg-black/20 backdrop-grayscale backdrop-contrast-125" },
  { id: "cyberpunk", label: "NEON / 2077", css: "bg-[linear-gradient(180deg,rgba(255,0,255,0.1),rgba(0,255,255,0.1))] mix-blend-color" },
];

export function ColorGradeHUD() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGrade, setActiveGrade] = useState(GRADES[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Global Filter Overlay */}
      <div 
        className={`fixed inset-0 pointer-events-none z-[100] transition-all duration-1000 ${activeGrade.css}`}
        style={{ 
          // Use CSS backdrop-filter for B&W to affect all layers below it
          backdropFilter: activeGrade.id === "bw" ? "grayscale(100%) contrast(120%)" : "none",
          WebkitBackdropFilter: activeGrade.id === "bw" ? "grayscale(100%) contrast(120%)" : "none"
        }}
      />

      {/* UI Control */}
      <div className="fixed bottom-6 right-6 z-[110] font-mono text-[10px]">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 bg-surface/90 backdrop-blur-md border border-border/50 p-2 flex flex-col gap-1 w-40 shadow-2xl origin-bottom-right"
            >
              <div className="text-text-mid px-2 py-1 border-b border-border/50 mb-1 tracking-widest flex justify-between items-center">
                <span>LUMETRI.LUT</span>
                <button onClick={() => setIsOpen(false)} className="hover:text-red">×</button>
              </div>
              {GRADES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setActiveGrade(g);
                    setIsOpen(false);
                  }}
                  className={`text-left px-2 py-2 hover:bg-accent hover:text-bg transition-colors ${
                    activeGrade.id === g.id ? "text-accent bg-accent/10" : "text-text-hi"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`border bg-bg/80 backdrop-blur px-3 py-2 transition-colors flex items-center gap-2 ${
            isOpen ? "border-accent text-accent" : "border-border/50 text-text-hi hover:border-accent hover:text-accent"
          }`}
        >
          <div className="w-3 h-3 rounded-full overflow-hidden flex">
            <div className="w-1/2 h-full bg-[#00f]" />
            <div className="w-1/2 h-full bg-[#f00]" />
          </div>
          <span className="tracking-widest">GRADE: {activeGrade.id.toUpperCase()}</span>
        </button>
      </div>
    </>
  );
}
