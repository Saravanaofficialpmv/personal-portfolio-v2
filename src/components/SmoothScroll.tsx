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
    // Snappy and responsive: settles quickly without floaty drag or sluggish delay
    const lenis = new Lenis({
      lerp: 0.16,             // Snappy settling (eliminates floaty/sluggish inertia delay)
      wheelMultiplier: 1.0,   // Direct, tactile 1:1 wheel response
      touchMultiplier: 1.0,   // Natural 1:1 touch response
      smoothWheel: true,      // Smooth interpolation for mouse wheel
      syncTouch: false,       // Use native 120Hz trackpad/touch physics without drag
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
