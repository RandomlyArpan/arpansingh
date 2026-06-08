import { Hero } from "@/components/sections/Hero";
import { MatchCut } from "@/components/transitions/MatchCut";
import { Reel } from "@/components/sections/Reel";
import { TimelineZoom } from "@/components/transitions/TimelineZoom";
import { Work } from "@/components/sections/Work";
import { TrackCollapse } from "@/components/transitions/TrackCollapse";
import { Process } from "@/components/sections/Process";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { FadeToBlack } from "@/components/transitions/FadeToBlack";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-bg w-full overflow-hidden">
      {/* 
        This is the main cinematic edit sequence.
        Every section is a "clip" and every transition is a "cut".
      */}
      <Hero />
      <MatchCut />
      <Reel />
      <TimelineZoom />
      <Work />
      <TrackCollapse />
      <Process />
      <Skills />
      <Testimonials />
      <FadeToBlack />
      <Contact />
    </main>
  );
}
