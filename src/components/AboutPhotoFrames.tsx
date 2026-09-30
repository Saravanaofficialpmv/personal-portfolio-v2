"use client";

import { motion } from "framer-motion";

interface AboutPhotoFramesProps {
  imageSrc?: string;
  className?: string;
  frameClassName?: string;
  objectPosition?: string;
}

export default function AboutPhotoFrames({
  imageSrc = "/about-full.webp",
  className = "",
  frameClassName = "",
  objectPosition = "object-[center_16%]",
}: AboutPhotoFramesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className={`w-full grid grid-cols-3 gap-3 sm:gap-5 md:gap-6 pt-2 sm:pt-4 [--gap:12px] sm:[--gap:20px] md:[--gap:24px] ${className}`}
    >
      {[0, 1, 2].map((index) => {
        const posX =
          index === 0
            ? "0px"
            : index === 1
            ? "calc(-100% - var(--gap))"
            : "calc(-200% - calc(var(--gap) * 2))";

        return (
          <div
            key={index}
            className={`relative w-full h-52 sm:h-80 md:h-[400px] lg:h-[440px] rounded-2xl sm:rounded-[24px] overflow-hidden group border border-[#E2E2E6] bg-[#F6F6F8] shadow-sm transition-all duration-300 hover:border-[#D0D0D6] hover:shadow-md ${frameClassName}`}
          >
            {/* Continuous panoramic slice with pixel-perfect window alignment */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={`Saravana portrait frame ${index + 1}`}
              className={`absolute top-0 h-full max-w-none object-cover ${objectPosition} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
              style={{
                width: "calc(300% + calc(var(--gap) * 2))",
                left: posX,
              }}
            />
          </div>
        );
      })}
    </motion.div>
  );
}
