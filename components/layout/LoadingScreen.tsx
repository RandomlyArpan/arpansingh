"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FilmGrain } from "@/components/fx/FilmGrain";

export function LoadingScreen() {
  const [count, setCount] = useState<number | string>(3);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const sequence = [
      { time: 1000, value: 2 },
      { time: 2000, value: 1 },
      { time: 3000, value: "▶" },
      { time: 4000, action: () => setIsVisible(false) },
    ];

    const timeouts = sequence.map((step) =>
      setTimeout(() => {
        if (step.action) step.action();
        else if (step.value !== undefined) setCount(step.value as number);
      }, step.time)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
        >
          <FilmGrain />

          <motion.div 
            className="relative flex h-64 w-64 items-center justify-center rounded-full border-2 border-text-mid/30 overflow-hidden bg-surface/20 backdrop-blur-sm"
          >
            {/* Inner concentric ring */}
            <div className="absolute inset-0 m-auto h-[75%] w-[75%] rounded-full border border-text-mid/20" />

            {/* The Clapper crosshairs */}
            <div className="absolute inset-0 m-auto h-[2px] w-full bg-text-mid/30" />
            <div className="absolute inset-0 m-auto h-full w-[2px] bg-text-mid/30" />
            
            {/* Slow Sweeping Radar */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 m-auto h-full w-full rounded-full border-t-2 border-l-2 border-text-mid/30 mix-blend-overlay"
            />

            <motion.div
              key={count}
              initial={{ opacity: 0, scale: 1.8, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 flex items-center justify-center font-bebas text-[160px] leading-none text-text-hi pt-6"
            >
              {count === "▶" ? (
                <span className="text-[120px] ml-4 pb-4">{count}</span>
              ) : (
                count
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
