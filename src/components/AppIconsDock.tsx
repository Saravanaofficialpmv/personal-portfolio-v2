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

function DockIconItem({
  tool,
  mouseX,
}: {
  tool: ToolItem;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate distance between mouse X and center of this icon
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    return val - (bounds.left + bounds.width / 2);
  });

  // Continuous bell-curve distance for smooth multi-icon wave [-150, 0, 150] -> [40, 62, 40]
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 62, 40]);

  // Feather-light spring physics matching authentic macOS Dock behavior
  const width = useSpring(widthSync, {
    mass: 0.08,
    stiffness: 170,
    damping: 14,
  });

  return (
    <div
      ref={ref}
      className={`relative shrink-0 ${tool.hideOnMobile ? "hidden sm:flex" : "flex"} flex-col items-center justify-end`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: -12, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.9 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap bg-[#171717] text-white text-[11px] font-notch font-medium px-2.5 py-1 rounded-md shadow-md border border-white/10"
          >
            {tool.name}
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#171717]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Animated Icon Box */}
      <motion.div
        style={{ width, height: width }}
        whileTap={{ scale: 0.9 }}
        className="relative shrink-0 rounded-[12px] sm:rounded-[14px] overflow-hidden cursor-pointer flex items-center justify-center p-0.5 opacity-90 hover:opacity-100 transition-opacity shadow-sm bg-black"
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
    <div className="w-full flex justify-center py-4 px-2">
      {/* Centered Horizontal macOS Dock Bar with authentic fisheye magnification wave */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="inline-flex items-end gap-1 sm:gap-2 p-2 sm:p-2.5 px-3 sm:px-5 bg-[#18181B] border border-white/10 rounded-2xl sm:rounded-[22px] shadow-[0_12px_36px_rgba(0,0,0,0.4)] max-w-full overflow-hidden select-none"
      >
        {toolsData.map((tool) => (
          <DockIconItem key={tool.id} tool={tool} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}


