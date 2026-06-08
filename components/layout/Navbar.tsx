"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Hide nav if scrolling down, show if scrolling up
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    setScrolled(latest > 50);
  });

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 transition-colors duration-300",
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-border/50" : "bg-transparent"
      )}
    >
      <div className="font-bebas text-2xl tracking-wider text-text-hi">
        ARPAN<span className="text-accent">.</span>
      </div>

      <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-widest text-text-mid">
        {["Reel", "Work", "Process", "Contact"].map((item) => (
          <button
            key={item}
            onClick={() => handleScrollTo(item.toLowerCase())}
            className="hover:text-text-hi transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
