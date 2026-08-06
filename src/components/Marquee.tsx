"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
}

export default function Marquee({
  children,
  speed = "normal",
  reverse = false,
}: MarqueeProps) {
  const speedClass =
    speed === "fast"
      ? "animate-marquee-fast"
      : speed === "slow"
      ? "animate-marquee"
      : "animate-marquee";

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
      <div className={`flex gap-12 py-2 ${speedClass} ${reverse ? "flex-row-reverse" : ""}`}>
        <div className="flex items-center gap-12 shrink-0">{children}</div>
        <div className="flex items-center gap-12 shrink-0">{children}</div>
        <div className="flex items-center gap-12 shrink-0">{children}</div>
      </div>
    </div>
  );
}
