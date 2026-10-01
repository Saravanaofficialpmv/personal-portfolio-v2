"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

export interface ToolItem {
  id: string;
  name: string;
  category: string;
  role: string;
  description: string;
  highlights: string[];
  image: string;
  hideOnMobile?: boolean;
}

const toolsData: ToolItem[] = [
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX & DESIGN SYSTEM",
    role: "Primary Design Workspace",
    description:
      "My daily canvas for designing user interfaces, crafting component libraries, prototyping interactive user flows, and creating design specifications for developer handoffs.",
    highlights: [
      "Design Systems & Libraries",
      "High-Fidelity Wireframes",
      "Interactive Prototypes",
      "Developer Handoff",
    ],
    image: "/app-icons/figma.png",
  },
  {
    id: "xcode",
    name: "Xcode",
    category: "NATIVE IOS ENGINEERING",
    role: "Apple Mobile Build Engine",
    description:
      "Essential IDE for compiling, debugging, and profiling native iOS applications, Swift components, and Flutter iOS build pipelines for Apple App Store releases.",
    highlights: [
      "iOS Simulator Testing",
      "Swift & Flutter Builds",
      "Performance Profiling",
      "App Store Packaging",
    ],
    image: "/app-icons/xcode.png",
  },
  {
    id: "antigravity",
    name: "Antigravity",
    category: "AI CODING & WORKSPACE",
    role: "Agentic AI Pair Programmer",
    description:
      "Advanced AI coding assistant environment for deep codebase navigation, automated refactoring, project planning, and multi-file code editing.",
    highlights: [
      "Autonomous Code Execution",
      "Deep Codebase Search",
      "Multi-file Editing",
      "System Refactoring",
    ],
    image: "/app-icons/antigravity.png",
  },
  {
    id: "androidstudio",
    name: "Android Studio",
    category: "MOBILE EMULATION & BUILD",
    role: "Android Virtual Engine",
    description:
      "Used to configure Gradle build scripts, run high-performance Android virtual device emulators, and debug native Android dependencies for Flutter apps.",
    highlights: [
      "Android Emulator",
      "Gradle Configuration",
      "Logcat & Device Debugging",
      "APK/AAB Bundles",
    ],
    image: "/app-icons/andriodstudio.png",
  },
  {
    id: "codex",
    name: "Codex / Warp",
    category: "TERMINAL & CLI WORKSPACE",
    role: "Command Line Engine",
    description:
      "High-speed terminal workspace for orchestrating local Next.js servers, executing Git version control, deploying builds to Vercel, and managing node modules.",
    highlights: [
      "Next.js Dev Server",
      "Git Branching & Pushing",
      "NPM & Package Scripts",
      "Vercel CLI Deployments",
    ],
    image: "/app-icons/codex-color.svg",
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "E-COMMERCE ARCHITECTURE",
    role: "Storefront Development",
    description:
      "Platform for engineering custom Liquid themes, headless store integrations, B2B e-commerce platforms, and merchant inventory setup.",
    highlights: [
      "Custom Liquid Themes",
      "Storefront API",
      "E-commerce Optimization",
      "Merchant Setup",
    ],
    image: "/app-icons/shopify.png",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "AI IDEATION & COPY",
    role: "Brainstorming Assistant",
    description:
      "Utilized for rapid conceptual brainstorming, copywriting iterations, data parsing, and quick logic validation during product exploration.",
    highlights: [
      "Product Ideation",
      "UX Copy & Content",
      "Logic Validation",
      "Data Transformations",
    ],
    image: "/app-icons/chatgpt.png",
  },
  {
    id: "claude",
    name: "Claude",
    category: "REASONING & TECHNICAL ANALYSIS",
    role: "System Architecture Partner",
    description:
      "Go-to AI model for complex software architecture analysis, deep code reviews, technical documentation drafting, and algorithm optimization.",
    highlights: [
      "Architecture Planning",
      "Deep Code Analysis",
      "Technical Spec Writing",
      "Refactoring Logic",
    ],
    image: "/app-icons/claude.webp",
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "MULTIMODAL AI & RESEARCH",
    role: "Visual & Data Synthesis",
    description:
      "Leveraged for multimodal visual image analysis, speed research synthesis, document understanding, and Google cloud integration.",
    highlights: [
      "Multimodal Image Analysis",
      "Fast Research Synthesis",
      "Document Parsing",
      "Google Cloud Integration",
    ],
    image: "/app-icons/gemini.webp",
  },
  {
    id: "github",
    name: "GitHub",
    category: "VERSION CONTROL & REPOS",
    role: "Source Code Management",
    description:
      "Central repository hosting for version history, pull request workflows, CI/CD automated deployments, and open-source project management.",
    highlights: [
      "Git Version Control",
      "Vercel Auto-Deploys",
      "Code Repositories",
      "Issue Tracking",
    ],
    image: "/app-icons/github.png",
  },
  {
    id: "canva",
    name: "Canva",
    category: "QUICK GRAPHICS & ASSETS",
    role: "Rapid Media Design",
    description:
      "Quick-turnaround design platform for generating social media graphics, presentation slides, brand collaterals, and rapid visual assets.",
    highlights: [
      "Presentation Decks",
      "Social Media Assets",
      "Brand Collateral",
      "Quick Layouts",
    ],
    image: "/app-icons/canva.png",
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "AUDIO & FOCUS SOUNDS",
    role: "Deep Work Soundtrack",
    description:
      "Powers long deep-focus engineering and design sessions with lo-fi beats, synthwave, ambient soundscapes, and engineering podcasts.",
    highlights: [
      "Deep Focus Playlists",
      "Lo-Fi & Synthwave",
      "Tech Podcasts",
      "Ambient Soundscapes",
    ],
    image: "/app-icons/spotify.png",
    hideOnMobile: true,
  },
];

interface VerticalDockItemProps {
  tool: ToolItem;
  mouseY: MotionValue<number>;
  isSelected?: boolean;
  onSelect?: (tool: ToolItem) => void;
}

function VerticalDockIconItem({
  tool,
  mouseY,
  isSelected,
  onSelect,
}: VerticalDockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate distance between mouse Y and vertical center of this icon
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    const windowScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    return val - (bounds.top + bounds.height / 2 + windowScrollY);
  });

  // Continuous bell-curve distance for smooth multi-icon wave [-150, 0, 150] -> [40, 62, 40]
  const sizeSync = useTransform(distance, [-150, 0, 150], [40, 62, 40]);

  // Feather-light spring physics matching authentic macOS Dock behavior
  const size = useSpring(sizeSync, {
    mass: 0.08,
    stiffness: 170,
    damping: 14,
  });

  return (
    <div
      ref={ref}
      className="relative shrink-0 flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect?.(tool)}
    >
      {/* Floating Tooltip on Hover to the Right */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -4, scale: 0.9 }}
            animate={{ opacity: 1, x: 8, scale: 1 }}
            exit={{ opacity: 0, x: -2, scale: 0.9 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute left-full top-1/2 -translate-y-1/2 z-40 pointer-events-none whitespace-nowrap bg-[#171717] text-white text-xs font-mono font-medium px-3 py-1.5 rounded-lg shadow-xl border border-white/10 flex items-center gap-2"
          >
            <span>{tool.name}</span>
            <span className="text-[10px] text-[#A3A3A3] border-l border-neutral-700 pl-2">
              {tool.category}
            </span>
            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#171717]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Animated Icon Box */}
      <motion.div
        style={{ width: size, height: size }}
        whileTap={{ scale: 0.9 }}
        className={`relative shrink-0 rounded-[12px] sm:rounded-[14px] overflow-hidden flex items-center justify-center p-0.5 transition-all shadow-sm bg-black ${
          isSelected
            ? "ring-2 ring-white ring-offset-2 ring-offset-[#18181B] opacity-100"
            : "opacity-90 hover:opacity-100"
        }`}
      >
        <Image
          src={tool.image}
          alt={tool.name}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-[10px] sm:rounded-[12px] bg-black"
          priority
        />
      </motion.div>
    </div>
  );
}

interface DockIconItemProps {
  tool: ToolItem;
  mouseX: MotionValue<number>;
  isActive: boolean;
  onHover: (tool: ToolItem) => void;
  onLeave: () => void;
  onSelect: (tool: ToolItem) => void;
}

function DockIconItem({
  tool,
  mouseX,
  isActive,
  onHover,
  onLeave,
  onSelect,
}: DockIconItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance between mouse X and center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.left + bounds.width / 2);
  });

  // Continuous bell-curve distance for smooth multi-icon wave [-150, 0, 150] -> [38, 62, 38]
  const widthSync = useTransform(distance, [-150, 0, 150], [38, 62, 38]);

  // Feather-light spring physics matching authentic macOS Dock behavior
  const width = useSpring(widthSync, {
    mass: 0.08,
    stiffness: 170,
    damping: 14,
  });

  return (
    <div
      ref={ref}
      className={`relative shrink-0 ${
        tool.hideOnMobile ? "hidden sm:flex" : "flex"
      } flex-col items-center justify-end cursor-pointer select-none`}
      onMouseEnter={() => onHover(tool)}
      onMouseLeave={onLeave}
      onClick={() => onSelect(tool)}
    >
      {/* Dynamic Animated Icon Box */}
      <motion.div
        style={{ width, height: width }}
        whileTap={{ scale: 0.88 }}
        className={`relative shrink-0 rounded-[11px] sm:rounded-[14px] overflow-hidden flex items-center justify-center p-0.5 transition-all shadow-sm bg-black ${
          isActive
            ? "ring-2 ring-white/80 ring-offset-2 ring-offset-[#18181B] opacity-100 scale-105"
            : "opacity-90 hover:opacity-100"
        }`}
      >
        <Image
          src={tool.image}
          alt={tool.name}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-[9px] sm:rounded-[12px] bg-black pointer-events-none"
          priority
        />
      </motion.div>
    </div>
  );
}

export interface AppIconsDockProps {
  orientation?: "horizontal" | "vertical";
  activeToolId?: string;
  onSelectTool?: (tool: ToolItem) => void;
}

export default function AppIconsDock({
  orientation = "horizontal",
  activeToolId,
  onSelectTool,
}: AppIconsDockProps) {
  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);
  const [activeTooltipTool, setActiveTooltipTool] = useState<ToolItem | null>(null);

  if (orientation === "vertical") {
    return (
      <div className="flex justify-center p-2">
        {/* Authentic Dark Vertical macOS Dock Capsule Bar */}
        <motion.div
          onMouseMove={(e) => mouseY.set(e.pageY)}
          onMouseLeave={() => mouseY.set(Infinity)}
          className="inline-flex flex-col items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 bg-[#18181B] border border-white/10 rounded-2xl sm:rounded-[26px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] select-none"
        >
          {toolsData.map((tool) => (
            <VerticalDockIconItem
              key={tool.id}
              tool={tool}
              mouseY={mouseY}
              isSelected={activeToolId === tool.id}
              onSelect={onSelectTool}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center py-2 px-1 sm:px-2">
      {/* Floating Tooltip Pill Above Dock (Unclipped on Mobile & Desktop) */}
      <div className="h-7 sm:h-8 flex items-center justify-center mb-1.5">
        <AnimatePresence mode="wait">
          {activeTooltipTool ? (
            <motion.div
              key={activeTooltipTool.id}
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.95 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#18181B] border border-white/10 text-white shadow-lg text-xs select-none"
            >
              <span className="font-notch font-medium text-white">
                {activeTooltipTool.name}
              </span>
              <span className="text-[#5C5C5C]">•</span>
              <span className="text-[10px] text-[#A3A3A3] font-mono tracking-wide">
                {activeTooltipTool.category}
              </span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-[#8C8C8C] font-medium tracking-wide select-none flex items-center gap-1"
            >
              <span className="hidden sm:inline">Hover to preview tools</span>
              <span className="sm:hidden text-[10px] text-[#A3A3A3]">Tap or swipe to explore tools</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Centered Dock Capsule with Scrollable Mobile Track */}
      <div className="w-full max-w-full flex justify-center">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            setActiveTooltipTool(null);
          }}
          className="relative max-w-full bg-[#18181B] border border-white/10 rounded-2xl sm:rounded-[22px] shadow-[0_12px_36px_rgba(0,0,0,0.4)] p-1.5 sm:p-2.5 px-2 sm:px-5 select-none"
        >
          {/* Subtle edge fade hints on mobile to indicate scrollability */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#18181B] to-transparent sm:hidden z-10 rounded-l-2xl" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-[#18181B] to-transparent sm:hidden z-10 rounded-r-2xl" />

          {/* Inner Track: smooth horizontal swipe on mobile, centered on desktop */}
          <div
            data-lenis-prevent
            className="w-full overflow-x-auto no-scrollbar touch-pan-x flex items-center sm:items-end gap-1.5 sm:gap-2 px-1 py-0.5"
          >
            {toolsData.map((tool) => (
              <DockIconItem
                key={tool.id}
                tool={tool}
                mouseX={mouseX}
                isActive={activeTooltipTool?.id === tool.id}
                onHover={(t) => setActiveTooltipTool(t)}
                onLeave={() => setActiveTooltipTool(null)}
                onSelect={(t) => {
                  setActiveTooltipTool((prev) => (prev?.id === t.id ? null : t));
                  onSelectTool?.(t);
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


