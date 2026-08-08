"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

export default function AppIconsDock() {
  const [selectedId, setSelectedId] = useState<string>("figma");

  const activeTool =
    toolsData.find((t) => t.id === selectedId) || toolsData[0];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
      {/* Left Vertical macOS Dock Panel */}
      <div className="md:col-span-3 lg:col-span-3 w-full flex md:flex-col items-center justify-start gap-2.5 sm:gap-3 p-3 sm:p-3.5 bg-[#18181B] border border-white/10 rounded-2xl md:rounded-[28px] shadow-[0_12px_36px_rgba(0,0,0,0.35)] overflow-x-auto md:overflow-x-visible scrollbar-none select-none">
        <span className="hidden md:block text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold px-2 py-1 text-center border-b border-white/10 w-full mb-1">
          DOCK PANELS
        </span>

        {toolsData.map((tool) => {
          const isSelected = selectedId === tool.id;

          return (
            <motion.button
              key={tool.id}
              onClick={() => setSelectedId(tool.id)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`relative shrink-0 w-11 h-11 sm:w-13 sm:h-13 rounded-[14px] sm:rounded-[16px] overflow-hidden transition-all cursor-pointer flex items-center justify-center p-0.5 ${
                isSelected
                  ? "ring-2 ring-[#E8342A] ring-offset-2 ring-offset-[#18181B] shadow-lg shadow-[#E8342A]/20 scale-105"
                  : "opacity-70 hover:opacity-100 hover:bg-white/10"
              }`}
              title={tool.name}
            >
              <Image
                src={tool.image}
                alt={tool.name}
                width={56}
                height={56}
                className="w-full h-full object-cover rounded-[12px] sm:rounded-[14px]"
                priority
              />
              {isSelected && (
                <motion.div
                  layoutId="activeDockDot"
                  className="absolute -right-1 md:right-auto md:left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E8342A] shadow-[0_0_8px_#E8342A]"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Right Explanation Display Card */}
      <div className="md:col-span-9 lg:col-span-9 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTool.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-2xl md:rounded-[28px] p-6 sm:p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden shadow-xs min-h-[320px] justify-between"
          >
            {/* Top Bar Header */}
            <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-md shrink-0 border border-neutral-200 bg-white p-1">
                  <Image
                    src={activeTool.image}
                    alt={activeTool.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8342A] font-bold">
                    {activeTool.category}
                  </span>
                  <h3 className="font-notch font-bold text-2xl sm:text-3xl text-[#171717]">
                    {activeTool.name}
                  </h3>
                </div>
              </div>

              <span className="bg-[#171717] text-white text-xs font-mono px-3.5 py-1.5 rounded-full shadow-xs whitespace-nowrap">
                {activeTool.role}
              </span>
            </div>

            {/* Main Description */}
            <p className="text-sm sm:text-base text-[#383838] font-light leading-relaxed">
              {activeTool.description}
            </p>

            {/* Workflow Highlights */}
            <div className="flex flex-col gap-2.5 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#A3A3A3] font-mono font-semibold">
                KEY WORKFLOW &amp; USES
              </span>
              <div className="flex flex-wrap gap-2 pt-0.5">
                {activeTool.highlights.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#E0E0E0] text-xs font-medium text-[#171717] shadow-2xs"
                  >
                    <span className="text-[#E8342A]">✦</span>
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

