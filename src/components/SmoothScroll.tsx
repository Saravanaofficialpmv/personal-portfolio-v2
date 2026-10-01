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
    // Controlled, calm scrolling speed with balanced deceleration
    const lenis = new Lenis({
      lerp: 0.11,             // Balanced: stops cleanly without floating or dragging
      wheelMultiplier: 0.6,   // Significantly lowers distance per wheel tick so it doesn't fly too fast
      touchMultiplier: 0.8,   // Calmer touch/gesture speed
      smoothWheel: true,      // Smooth interpolation for mouse wheel
      syncTouch: false,       // Native fluid 120Hz trackpad physics without double-speed
      autoResize: true,       // Recalculate dimensions on content load
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
