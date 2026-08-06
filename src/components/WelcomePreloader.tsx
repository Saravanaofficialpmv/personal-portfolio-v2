"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface GreetingItem {
  text: string;
  isTamil?: boolean;
}

const greetings: GreetingItem[] = [
  { text: "வணக்கம்", isTamil: true },
  { text: "Hello" },
  { text: "سلام" },
  { text: "नमस्ते" },
  { text: "Bonjour" },
  { text: "Hola" },
  { text: "Ciao" },
  { text: "こんにちは" },
];

export default function WelcomePreloader() {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  useEffect(() => {
    if (index === greetings.length - 1) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 300); // 300ms per word for crisp, responsive pacing

    return () => clearTimeout(timer);
  }, [index]);

  const currentGreeting = greetings[index];

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#0d0e0e] flex items-center justify-center text-white select-none pointer-events-auto overflow-hidden"
        >
          {/* Fixed-layout stage ensuring diamonds sit perfectly STILL without moving */}
          <div className="relative flex items-center justify-center gap-2 sm:gap-4 px-2 h-28 sm:h-36 md:h-44">
            {/* Left Diamond */}
            <span className="text-[#E8342A] text-2xl sm:text-4xl font-serif shrink-0 select-none">
              ✧
            </span>

            {/* Locked Fixed-Width Center Container - Stars never shift or jump */}
            <div className="w-72 sm:w-[440px] md:w-[540px] h-full flex items-center justify-center text-center overflow-hidden shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                  className="w-full flex items-center justify-center"
                >
                  {currentGreeting.isTamil ? (
                    <div className="h-20 sm:h-28 md:h-32 max-w-full w-auto flex items-center justify-center select-none pointer-events-none px-1">
                      <Image
                        src="/vanakkam.png"
                        alt="வணக்கம்"
                        width={480}
                        height={150}
                        className="max-h-full max-w-full w-auto h-auto object-contain filter brightness-0 invert scale-[1.55] sm:scale-[1.75] md:scale-[1.9]"
                        priority
                      />
                    </div>
                  ) : (
                    <h1 className="font-notch text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-none whitespace-nowrap">
                      {currentGreeting.text}
                    </h1>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Diamond */}
            <span className="text-[#E8342A] text-xl sm:text-3xl font-serif shrink-0 select-none">
              ✧
            </span>
          </div>

          {/* Bottom subtle progress line */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.7, ease: "linear" }}
              className="h-full bg-[#E8342A]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
