"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface ToolItem {
  id: string;
  name: string;
  image?: string;
  bgColor?: string;
  iconSvg?: React.ReactNode;
}

const toolsData: ToolItem[] = [
  {
    id: "figma",
    name: "Figma",
    image: "/app-icons/figma.png",
  },
  {
    id: "xcode",
    name: "Xcode",
    image: "/app-icons/xcode.png",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    image: "/app-icons/antigravity.png",
  },
  {
    id: "androidstudio",
    name: "Android Studio",
    image: "/app-icons/andriodstudio.png",
  },
  {
    id: "codex",
    name: "Codex",
    image: "/app-icons/codex-color.svg",
  },
  {
    id: "shopify",
    name: "Shopify",
    image: "/app-icons/shopify.png",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    image: "/app-icons/chatgpt.png",
  },
  {
    id: "claude",
    name: "Claude",
    image: "/app-icons/claude.webp",
  },
  {
    id: "gemini",
    name: "Gemini",
    image: "/app-icons/gemini.webp",
  },
  {
    id: "github",
    name: "GitHub",
    image: "/app-icons/github.png",
  },
  {
    id: "canva",
    name: "Canva",
    image: "/app-icons/canva.png",
  },
  {
    id: "spotify",
    name: "Spotify",
    image: "/app-icons/spotify.png",
  },
];

export default function AppIconsDock() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full flex justify-center py-2">
      {/* Sleek Dark Black macOS Dock Container */}
      <div className="inline-flex items-center gap-2 sm:gap-2.5 p-2 sm:p-2.5 px-3 sm:px-4 bg-[#18181B] border border-white/10 rounded-2xl sm:rounded-[26px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] max-w-full overflow-x-auto scrollbar-none">
        {toolsData.map((tool) => {
          const isHovered = hoveredId === tool.id;

          return (
            <div
              key={tool.id}
              className="relative shrink-0"
              onMouseEnter={() => setHoveredId(tool.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap bg-[#171717] text-white text-[11px] font-notch font-medium px-2.5 py-1 rounded-md shadow-md border border-white/10"
                  >
                    {tool.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#171717]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon Container Squircle (Exact 1:1 macOS shape matching reference image) */}
              <motion.div
                whileHover={{ y: -6, scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 450, damping: 24 }}
                className={`relative w-11 h-11 sm:w-13 sm:h-13 rounded-[13px] sm:rounded-[15px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex items-center justify-center transition-shadow hover:shadow-xl ${tool.bgColor || "bg-transparent"
                  }`}
              >
                {tool.image ? (
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-[13px] sm:rounded-[15px]"
                    priority
                  />
                ) : (
                  tool.iconSvg
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
