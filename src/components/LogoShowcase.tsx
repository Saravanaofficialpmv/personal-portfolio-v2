"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2 } from "lucide-react";

interface LogoItem {
  id: number;
  src: string;
  title: string;
  isDark?: boolean;
}

const logoItems: LogoItem[] = [
  { id: 1, src: "/logowork/1.svg", title: "Brand Identity Mark 01" },
  { id: 2, src: "/logowork/2.svg", title: "Brand Identity Mark 02" },
  { id: 3, src: "/logowork/3.svg", title: "Brand Identity Mark 03", isDark: true },
  { id: 5, src: "/logowork/5.svg", title: "Brand Identity Mark 04" },
  { id: 6, src: "/logowork/6.svg", title: "Brand Identity Mark 05", isDark: true },
  { id: 7, src: "/logowork/7.svg", title: "Brand Identity Mark 06" },
  { id: 8, src: "/logowork/8.svg", title: "Brand Identity Mark 07" },
  { id: 9, src: "/logowork/9.svg", title: "Brand Identity Mark 08", isDark: true },
];

export default function LogoShowcase() {
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

      {/* Logo Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {logoItems.map((logo, idx) => (
          <motion.div
            key={logo.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            onClick={() => setSelectedLogo(logo)}
            className={`group relative flex items-center justify-center p-4 sm:p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 cursor-pointer aspect-[1.2/1] overflow-hidden ${
              logo.isDark
                ? "bg-[#121212] border-[#2A2A2A] hover:border-[#E8342A] hover:shadow-xl"
                : "bg-white border-[#E0E0E0] hover:border-[#E8342A] hover:shadow-xl shadow-xs"
            }`}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <Image
                src={logo.src}
                alt={logo.title}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-medium uppercase tracking-wider">
              <Maximize2 className="w-4 h-4 text-[#E8342A]" />
              <span>Inspect Vector</span>
            </div>
          </motion.div>
        ))}
      </div>

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

              <span className="text-xs uppercase tracking-widest text-[#E8342A] font-semibold">
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
