"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Tuned for a luxurious, buttery-smooth feel with controlled, non-aggressive scroll speed
    const lenis = new Lenis({
      lerp: 0.08,             // Buttery smooth deceleration curve
      wheelMultiplier: 0.8,   // Lowers speed per wheel step so scrolling doesn't fly or jump aggressively
      touchMultiplier: 1.0,   // Natural 1:1 touch response without acceleration jumps
      smoothWheel: true,      // Smoothly interpolate mouse wheel scrolls
      syncTouch: false,       // Use native fluid touch physics on mobile/trackpads
      autoResize: true,       // Dynamically update scroll height when images/DOM render
    });

    lenisRef.current = lenis;

    // Make lenis globally accessible for components like ScrollStack and modals
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // When route changes, scroll smoothly/immediately to top
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
