"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

interface LogoItem {
  id: number;
  src: string;
  title: string;
  category?: string;
  isDark?: boolean;
}

const logoItems: LogoItem[] = [
  { id: 1, src: "/logowork/1.svg", title: "Brand Identity Mark 01", category: "Vector Emblem" },
  { id: 2, src: "/logowork/2.svg", title: "Brand Identity Mark 02", category: "Monogram Mark" },
  { id: 3, src: "/logowork/3.svg", title: "Brand Identity Mark 03", isDark: true, category: "Dark Mode Emblem" },
  { id: 5, src: "/logowork/5.svg", title: "Brand Identity Mark 04", category: "Brand Symbol" },
  { id: 6, src: "/logowork/6.svg", title: "Brand Identity Mark 05", isDark: true, category: "Monogram Mark" },
  { id: 7, src: "/logowork/7.svg", title: "Brand Identity Mark 06", category: "Minimal Icon" },
  { id: 8, src: "/logowork/8.svg", title: "Brand Identity Mark 07", category: "Corporate Emblem" },
  { id: 9, src: "/logowork/9.svg", title: "Brand Identity Mark 08", isDark: true, category: "App Emblem" },
];

interface LogoShowcaseProps {
  viewMode?: "grid" | "list";
}

export default function LogoShowcase({ viewMode = "grid" }: LogoShowcaseProps) {
  const [selectedLogo, setSelectedLogo] = useState<LogoItem | null>(null);

  return (
    <section className="w-full max-w-[1168px] flex flex-col gap-8 pt-12 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E0E0E0] pb-8">
        <div className="flex flex-col items-start gap-2 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#E8342A] font-semibold">
            ✦ BESPOKE BRAND IDENTITIES
          </span>
          <h2 className="font-notch font-medium text-3xl md:text-5xl text-[#171717] tracking-tight">
            Logo & Brand Marks.
          </h2>
        </div>
        <p className="text-xs md:text-sm text-[#5C5C5C] font-light max-w-md leading-relaxed">
          Custom vector brand marks, emblems, and corporate identity symbols designed for standout recognition. Click any mark for high-resolution inspection.
        </p>
      </div>

      {/* Logo Grid or List Container */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {logoItems.map((logo, idx) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedLogo(logo)}
              className={`group relative flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                logo.isDark
                  ? "bg-[#121212] border-[#2A2A2A] hover:border-[#E8342A] hover:shadow-xl"
                  : "bg-white border-[#E0E0E0] hover:border-[#E8342A] hover:shadow-xl shadow-xs"
              }`}
            >
              <div className="relative w-full h-36 sm:h-44 flex items-center justify-center p-2">
                <Image
                  src={logo.src}
                  alt={logo.title}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Logo Name / Title Label */}
              <div className="w-full pt-3 border-t border-dashed border-neutral-200 dark:border-neutral-800 flex flex-col items-center gap-0.5 text-center z-10">
                <span className={`font-notch font-medium text-xs sm:text-sm tracking-tight ${logo.isDark ? "text-white" : "text-[#171717]"}`}>
                  {logo.title}
                </span>
                <span className="text-[10px] text-[#A3A3A3] uppercase tracking-wider font-mono">
                  {logo.category || "Logo & Brand Mark"}
                </span>
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-medium uppercase tracking-wider z-20">
                <Maximize2 className="w-4 h-4 text-[#E8342A]" />
                <span>Inspect Vector</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* List View Layout */
        <div className="flex flex-col divide-y divide-[#E0E0E0] border-t border-b border-[#E0E0E0]">
          {logoItems.map((logo, idx) => (
            <motion.div
              key={logo.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => setSelectedLogo(logo)}
              className="py-4 px-2 sm:px-4 flex flex-row items-center justify-between gap-4 group hover:bg-[#F7F7F7] transition-colors cursor-pointer rounded-xl"
            >
              {/* Thumbnail + Title */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl border flex items-center justify-center shrink-0 p-2.5 transition-transform duration-300 group-hover:scale-105 ${
                    logo.isDark
                      ? "bg-[#121212] border-[#2A2A2A]"
                      : "bg-white border-[#E0E0E0] shadow-2xs"
                  }`}
                >
                  <Image
                    src={logo.src}
                    alt={logo.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="font-notch font-medium text-base sm:text-lg text-[#171717] group-hover:text-[#E8342A] transition-colors truncate">
                    {logo.title}
                  </h3>
                  <span className="text-xs text-[#5C5C5C] font-mono uppercase tracking-wider">
                    {logo.category || "Logo & Brand Mark"}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline-block text-xs font-mono text-[#A3A3A3] uppercase">
                  Vector Mark
                </span>
                <div className="p-2 rounded-lg bg-[#F7F7F7] border border-[#E0E0E0] text-[#171717] group-hover:bg-[#E8342A] group-hover:text-white group-hover:border-[#E8342A] transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox / High-Res Preview Modal */}
      <AnimatePresence>
        {selectedLogo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLogo(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-2xl p-8 md:p-12 rounded-3xl flex flex-col items-center gap-6 border shadow-2xl ${
                selectedLogo.isDark ? "bg-[#171717] border-[#333333]" : "bg-white border-[#E0E0E0]"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedLogo(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-5 h-5 text-current" />
              </button>

              <span className="text-xs uppercase tracking-widest text-[#E8342A] font-semibold font-mono">
                {selectedLogo.title}
              </span>

              <div className="relative w-full h-[320px] md:h-[400px] flex items-center justify-center p-6">
                <Image
                  src={selectedLogo.src}
                  alt={selectedLogo.title}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
