"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FrameProps {
  num: number;
}

function SingleFrame({ num }: FrameProps) {
  const [imgSrc, setImgSrc] = useState<string>(`/${num}.png`);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    if (imgSrc.endsWith(".png")) {
      setImgSrc(`/${num}.jpg`);
    } else if (imgSrc.endsWith(".jpg")) {
      setImgSrc(`/${num}.jpeg`);
    } else if (imgSrc.endsWith(".jpeg")) {
      setImgSrc(`/${num}.webp`);
    } else {
      setHasError(true);
    }
  };

  return (
    <div className="relative w-full h-48 sm:h-80 md:h-[360px] rounded-2xl sm:rounded-[24px] overflow-hidden group border border-[#E2E2E6] bg-[#F6F6F8] flex flex-col items-center justify-center transition-all duration-300 hover:border-[#D0D0D6]">
      {!hasError ? (
        <Image
          src={imgSrc}
          alt={`Frame ${num}`}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          onError={handleError}
          priority
        />
      ) : (
        /* Exact Match to Reference Placeholder Design */
        <div className="inset-0 w-full h-full flex flex-col items-center justify-center gap-1.5 p-4 text-center select-none bg-[#F6F6F8]">
          <div className="flex items-center gap-1.5 font-notch font-bold text-sm sm:text-base md:text-lg text-[#171717] tracking-tight">
            <span className="text-[#E8342A] text-xs sm:text-sm pt-0.5">✦</span>
            <span>FRAME {num}</span>
          </div>

          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#A3A3A3] font-medium pt-0.5">
            IMAGE PLACEHOLDER
          </span>
        </div>
      )}
    </div>
  );
}

export default function AboutPhotoFrames() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="w-full grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 pt-4"
    >
      {[1, 2, 3].map((num) => (
        <SingleFrame key={num} num={num} />
      ))}
    </motion.div>
  );
}
