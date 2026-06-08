import type { Metadata } from "next";
import { Inter, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { FilmGrain } from "@/components/fx/FilmGrain";
import { ScanLines } from "@/components/fx/ScanLines";
import { Letterbox } from "@/components/fx/Letterbox";
import { ColorGradeHUD } from "@/components/fx/ColorGradeHUD";
import { ScrollProgress } from "@/components/fx/ScrollProgress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arpan Singh | Video Editor",
  description: "Your footage deserves better. Professional video editing portfolio.",
  openGraph: {
    title: "Arpan Singh | Video Editor",
    description: "Your footage deserves better. Professional video editing portfolio.",
    type: "website",
  }
};

export const viewport = {
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${dmMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text-hi selection:bg-accent selection:text-bg">
        <SmoothScrollProvider>
          {/* Global Post-Production FX */}
          <FilmGrain />
          <ScanLines />
          <Letterbox isCinematic={false} />
          <ColorGradeHUD />
          
          {/* Global UI */}
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          <ScrollProgress />

          {/* Sequence Timeline */}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
