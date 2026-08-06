"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink, Images } from "lucide-react";

interface SlideItem {
  id: number;
  src: string;
  title: string;
  caption: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    src: "/ss-wholesale/mockup1.png",
    title: "Clean Front View Mockup",
    caption: "High-resolution front presentation of SS Wholesale ordering interface on iPhone 17 Pro.",
  },
  {
    id: 2,
    src: "/ss-wholesale/mockup2.png",
    title: "Soft Shadows Perspective",
    caption: "Perspective angle showcasing real-time inventory management UI and modern typography.",
  },
  {
    id: 3,
    src: "/ss-wholesale/mockup3.png",
    title: "Hand-Held Minimal View",
    caption: "Ergonomic handheld view demonstrating real-world mobile app user experience.",
  },
  {
    id: 4,
    src: "/ss-wholesale.png",
    title: "Complete App Layout",
    caption: "Wholesale ordering dashboard with inventory, offline sync, and customer management.",
  },
];

interface SSWholesaleSlideshowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SSWholesaleSlideshowModal({
  isOpen,
  onClose,
}: SSWholesaleSlideshowModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen) return null;

  const currentSlide = slides[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none"
      >
        {/* Top Header Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 z-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8342A]/10 border border-[#E8342A]/20 flex items-center justify-center text-[#E8342A]">
              <Images className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-notch font-bold text-white text-base md:text-lg flex items-center gap-2">
                SS Wholesale Showcase
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-normal">
                  {currentIndex + 1} / {slides.length}
                </span>
              </h3>
              <p className="text-xs text-white/60 font-light hidden sm:block">
                {currentSlide.caption}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close slideshow"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Stage */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl mx-auto flex-1 my-4 flex items-center justify-center overflow-hidden"
        >
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 z-20 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-black/80 hover:scale-105 transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Slide Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-h-[70vh] flex items-center justify-center"
            >
              <Image
                src={currentSlide.src}
                alt={currentSlide.title}
                fill
                priority
                className="object-contain p-2 md:p-6 drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 z-20 p-3 rounded-full bg-black/50 text-white border border-white/10 hover:bg-black/80 hover:scale-105 transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Control & Thumbnail Navigation Bar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4 z-10"
        >
          {/* Thumbnails Row */}
          <div className="flex items-center gap-3 overflow-x-auto p-2 max-w-full scrollbar-none">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? "border-[#E8342A] scale-105 shadow-lg shadow-[#E8342A]/20"
                      : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between w-full text-xs text-white/50 border-t border-white/10 pt-3">
            <span>Use Left/Right arrow keys to navigate</span>
            <a
              href="https://github.com/Saravanaofficialpmv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white hover:text-[#E8342A] transition-colors"
            >
              <span>View Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
