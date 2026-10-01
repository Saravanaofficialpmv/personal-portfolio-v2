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
      autoToggle: false,      // Prevent Lenis from self-locking based on temporary DOM style changes
    });

    lenisRef.current = lenis;

    // Make lenis globally accessible for components like ScrollStack and modals
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Observe document.body to guarantee Lenis recalibrates its scroll limit whenever images load or DOM expands
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && document.body) {
      resizeObserver = new ResizeObserver(() => {
        lenis.resize();
      });
      resizeObserver.observe(document.body);
    }

    // Window load and orientation changes should also refresh dimensions
    const handleRecalibrate = () => {
      lenis.resize();
      if (lenis.isStopped && document.body.style.overflow !== "hidden") {
        lenis.start();
      }
    };

    window.addEventListener("load", handleRecalibrate);
    window.addEventListener("resize", handleRecalibrate, { passive: true });
    window.addEventListener("orientationchange", handleRecalibrate, { passive: true });
    document.addEventListener("visibilitychange", handleRecalibrate);
    window.addEventListener("focus", handleRecalibrate);

    // Resilient RAF loop: never dies if an unhandled subscriber error occurs
    let rafId: number;
    let isRunning = true;
    const raf = (time: number) => {
      if (!isRunning) return;
      try {
        lenis.raf(time);
      } catch (err) {
        console.error("Lenis RAF error caught safely:", err);
      }
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      window.removeEventListener("load", handleRecalibrate);
      window.removeEventListener("resize", handleRecalibrate);
      window.removeEventListener("orientationchange", handleRecalibrate);
      document.removeEventListener("visibilitychange", handleRecalibrate);
      window.removeEventListener("focus", handleRecalibrate);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // When route changes, recalibrate dimensions and scroll smoothly/immediately to top
  useEffect(() => {
    if (lenisRef.current) {
      const lenis = lenisRef.current;
      lenis.start();
      requestAnimationFrame(() => {
        lenis.resize();
        lenis.scrollTo(0, { immediate: true });
      });
    }
  }, [pathname]);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
