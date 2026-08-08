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
  },
];

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

  // Authentic macOS fisheye wave curve: default 48px grow to 78px when mouse is near
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 78, 48]);

  // Spring animation for smooth natural movement
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 190,
    damping: 14,
  });

  return (
    <div
      className="relative shrink-0 flex flex-col items-center justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Tooltip on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: -14, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute -top-11 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap bg-[#171717] text-white text-[11px] font-notch font-medium px-2.5 py-1 rounded-md shadow-md border border-white/10"
          >
            {tool.name}
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#171717]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* macOS Dock Icon with Fisheye Magnification */}
      <motion.div
        ref={ref}
        style={{ width, height: width }}
        whileTap={{ scale: 0.9 }}
        className="relative shrink-0 rounded-[13px] sm:rounded-[15px] overflow-hidden cursor-pointer flex items-center justify-center p-0.5 opacity-90 hover:opacity-100 transition-opacity"
      >
        <Image
          src={tool.image}
          alt={tool.name}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-[11px] sm:rounded-[13px]"
          priority
        />
      </motion.div>
    </div>
  );
}

export default function AppIconsDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="w-full flex justify-center py-2">
      {/* Centered Horizontal macOS Dock Bar with authentic fisheye magnification */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="inline-flex items-end gap-2 sm:gap-2.5 p-2 sm:p-2.5 px-3 sm:px-4 bg-[#18181B] border border-white/10 rounded-2xl sm:rounded-[22px] shadow-[0_12px_36px_rgba(0,0,0,0.4)] max-w-full overflow-x-auto md:overflow-visible scrollbar-none select-none"
      >
        {toolsData.map((tool) => (
          <DockIconItem key={tool.id} tool={tool} mouseX={mouseX} />
        ))}
      </motion.div>
    </div>
  );
}

