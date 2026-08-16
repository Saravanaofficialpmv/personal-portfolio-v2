"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop, Sparkles, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";
import AppIconsDock from "@/components/AppIconsDock";

interface HardwareItem {
  id: string;
  title: string;
  specs: string;
  badge: string;
  badgeColor?: string;
  imageSrc: string;
  featured?: boolean;
  detailedSpecs?: string[];
}

interface AppToolItem {
  id: string;
  name: string;
  category: string;
  imageSrc?: string;
  lucideIcon?: React.ReactNode;
  description?: string;
  link?: string;
}

interface DevCraftTool {
  id: string;
  name: string;
  category: string;
  imageSrc: string;
  tagline: string;
  description: string;
  accentGlow: string;
  badge: string;
  specs: string[];
}

const hardwareList: HardwareItem[] = [
  {
    id: "pc-setup",
    title: "Custom AMD Ryzen 5 Desktop PC Rig",
    specs: "AMD Ryzen 5 5500GT • MSI A520M-A Pro MB • 32GB DDR4 3600MHz RAM • 1TB NVMe SSD • Ant Esports VS450L PSU • ViewSonic 27\" Display",
    badge: "DESKTOP RIG",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    imageSrc: "/gear/final-setup.jpg",
    featured: true,
  },
  {
    id: "macbook-air-m4",
    title: "MacBook Air M4",
    specs: "Apple M4 Chip • 16GB Unified Memory • 512GB NVMe SSD • Liquid Retina Display",
    badge: "LAPTOP",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    imageSrc: "/gear/macbook-setup.png",
  },
];

const devCraftToolsExtended: DevCraftTool[] = [
  {
    id: "figma",
    name: "Figma",
    category: "UI/UX & Systems",
    imageSrc: "/app-icons/figma.png",
    tagline: "Interface & Design System Engine",
    description: "Architecting design systems, component libraries, variable auto-layouts, and high-fidelity interactive web and mobile prototypes.",
    accentGlow: "from-rose-500/10 via-purple-500/10 to-amber-500/10",
    badge: "DESIGN SYSTEM",
    specs: ["Auto Layout 5.0", "Token Variables", "Interactive Prototypes"],
  },
  {
    id: "xcode",
    name: "Xcode",
    category: "iOS Development",
    imageSrc: "/app-icons/xcode.png",
    tagline: "Native iOS & Swift Workspace",
    description: "Building native iOS and iPadOS applications with SwiftUI, Metal rendering, core animation physics, and TestFlight deployments.",
    accentGlow: "from-blue-500/15 via-cyan-500/10 to-sky-600/10",
    badge: "iOS SDK",
    specs: ["SwiftUI 6.0", "Combine Framework", "Instruments & Metal"],
  },
  {
    id: "antigravity",
    name: "Antigravity IDE",
    category: "AI Code Editor",
    imageSrc: "/app-icons/antigravity.png",
    tagline: "Agentic AI Pair Programmer & IDE",
    description: "Next-gen workspace driven by agentic AI for deep contextual code editing, refactoring, and multi-file code generation.",
    accentGlow: "from-sky-500/15 via-blue-600/15 to-indigo-500/10",
    badge: "PRIMARY IDE",
    specs: ["Agentic AI Engine", "Multi-file Editing", "Contextual Synthesis"],
  },
  {
    id: "androidstudio",
    name: "Android Studio",
    category: "Android SDK",
    imageSrc: "/app-icons/andriodstudio.png",
    tagline: "Kotlin & Jetpack Compose Development",
    description: "Crafting modern Android mobile software using Kotlin, Jetpack Compose UI declarative paradigms, and native SDK performance tuning.",
    accentGlow: "from-emerald-500/15 via-teal-500/10 to-green-600/10",
    badge: "ANDROID SDK",
    specs: ["Jetpack Compose", "Kotlin Coroutines", "Gradle Build System"],
  },
  {
    id: "codex",
    name: "Codex / Warp",
    category: "Terminal & CLI Workspace",
    imageSrc: "/app-icons/codex-color.svg",
    tagline: "Command Line & Synthesis Engine",
    description: "High-speed terminal workspace for orchestrating local Next.js servers, executing Git version control, deploying builds to Vercel, and managing node modules.",
    accentGlow: "from-violet-500/15 via-purple-600/10 to-fuchsia-500/10",
    badge: "SYNTHESIS ENGINE",
    specs: ["Next.js Dev Server", "Git Version Control", "Vercel Deployments"],
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "Liquid & E-Commerce",
    imageSrc: "/app-icons/shopify.png",
    tagline: "Custom Storefronts & Liquid Architecture",
    description: "Developing custom Liquid themes, Hydrogen headless storefronts, GraphQL Storefront API integrations, and checkout extensions.",
    accentGlow: "from-lime-500/15 via-emerald-600/10 to-green-500/10",
    badge: "E-COMMERCE",
    specs: ["Liquid Templates", "Storefront GraphQL", "Headless Hydrogen"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "AI Ideation & Copy",
    imageSrc: "/app-icons/chatgpt.png",
    tagline: "Brainstorming & Copywriting Assistant",
    description: "Utilized for rapid conceptual brainstorming, copywriting iterations, data parsing, and quick logic validation during product exploration.",
    accentGlow: "from-emerald-500/15 via-teal-500/10 to-green-600/10",
    badge: "AI ASSISTANT",
    specs: ["Product Ideation", "UX Copy & Content", "Logic Validation"],
  },
  {
    id: "claude",
    name: "Claude Code",
    category: "AI Systems Architecture",
    imageSrc: "/app-icons/claude.webp",
    tagline: "Architectural Reasoning & Problem Solving",
    description: "Deep reasoning engine utilized for backend logic design, state management strategy, algorithm optimization, and complex bug isolation.",
    accentGlow: "from-amber-600/15 via-orange-500/10 to-yellow-600/10",
    badge: "AI REASONING",
    specs: ["Claude 3.7 Sonnet", "Extended Thinking", "System Architecture"],
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    category: "Multimodal AI & Research",
    imageSrc: "/app-icons/gemini.webp",
    tagline: "Multimodal Vision & Speed Synthesis",
    description: "Leveraged for multimodal visual image analysis, speed research synthesis, document understanding, and Google cloud integration.",
    accentGlow: "from-blue-500/15 via-indigo-500/10 to-sky-500/10",
    badge: "MULTIMODAL AI",
    specs: ["Image Analysis", "Research Synthesis", "Document Parsing"],
  },
  {
    id: "github",
    name: "GitHub",
    category: "Version Control",
    imageSrc: "/app-icons/github.png",
    tagline: "Collaborative Git & Automated CI/CD",
    description: "Managing code revision trees, pull request reviews, automated CI/CD deployment pipelines, and release versioning.",
    accentGlow: "from-zinc-500/15 via-slate-600/10 to-neutral-700/10",
    badge: "CI/CD & GIT",
    specs: ["Actions Workflows", "Branch Protections", "Package Registry"],
  },
  {
    id: "canva",
    name: "Canva",
    category: "Graphics & Media Assets",
    imageSrc: "/app-icons/canva.png",
    tagline: "Rapid Layouts & Visual Collaterals",
    description: "Quick-turnaround design platform for generating social media graphics, presentation slides, brand collaterals, and rapid visual assets.",
    accentGlow: "from-cyan-500/15 via-sky-500/10 to-blue-500/10",
    badge: "MEDIA ASSETS",
    specs: ["Presentation Decks", "Social Media Assets", "Brand Collateral"],
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "Audio & Focus Soundtracks",
    imageSrc: "/app-icons/spotify.png",
    tagline: "Deep Work Audio & Focus",
    description: "Powers long deep-focus engineering and design sessions with lo-fi beats, synthwave, ambient soundscapes, and engineering podcasts.",
    accentGlow: "from-emerald-500/15 via-teal-500/10 to-green-600/10",
    badge: "FOCUS SOUNDTRACKS",
    specs: ["Deep Focus Playlists", "Lo-Fi & Synthwave", "Tech Podcasts"],
  },
];

export default function ToolsPage() {
  const [activeToolId, setActiveToolId] = useState<string>("figma");
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

  const activeTool =
    devCraftToolsExtended.find((tool) => tool.id === activeToolId) ||
    devCraftToolsExtended[0];

  return (
    <div className="w-full bg-[#FBFBFB] text-[#171717] min-h-screen pt-28 md:pt-36 relative overflow-hidden font-sans selection:bg-[#E8342A] selection:text-white">
      {/* Background Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col gap-16 md:gap-24 pb-32 relative z-10">
        
        {/* Header Hero Section */}
        <div className="w-full border-b border-[#E0E0E0] pb-12 flex flex-col items-center text-center gap-4 relative">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono tracking-[0.25em] text-[#E8342A] uppercase font-semibold flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-[#E8342A] animate-pulse" />
            THE GEAR &amp; ENVIRONMENT
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-notch text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#171717] flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            <span>What Powers</span>{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-purple-600 via-pink-600 to-[#E8342A] bg-clip-text text-transparent">
              My Work
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#5C5C5C] font-light max-w-xl text-center leading-relaxed"
          >
            An inside look at the workstation setup, dev environments, command-line utilities, and AI models driving my daily workflow.
          </motion.p>
        </div>

        {/* SECTION 01: Craft. Dev Environment */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-4 border-t border-[#E0E0E0]">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-3 sticky top-28 self-start">
            <span className="text-xs font-mono text-[#A3A3A3] font-semibold tracking-wider">
              01
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-[#171717]">
              Craft.
            </h2>
            <p className="font-serif italic text-lg text-[#5C5C5C] font-normal">
              Dev Environment
            </p>
            <p className="text-xs font-sans text-[#737373] leading-relaxed pt-2 hidden md:block">
              An interactive dark macOS vertical dock bar. Hover or click any icon on the dock to inspect key workflow details and engine specifications.
            </p>
          </div>

          {/* Right Column: Dark Vertical macOS Dock Showcase */}
          <div className="md:col-span-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-1">
              <span className="w-2 h-2 rounded-full bg-[#E8342A] animate-pulse" />
              <span className="text-xs font-mono text-[#737373] tracking-wide uppercase font-semibold">
                Tools Which I Use
              </span>
            </div>

            {/* DARK VERTICAL macOS DOCK PILL BAR SHOWCASE */}
            <div className="w-full bg-white border border-[#E0E0E0] rounded-3xl p-4 sm:p-7 shadow-xs flex flex-row items-stretch gap-4 sm:gap-8 relative overflow-hidden">
              {/* Authentic Dark macOS Vertical Dock Pill Bar */}
              <div className="flex-shrink-0 flex items-center">
                <AppIconsDock
                  orientation="vertical"
                  activeToolId={activeToolId}
                  onSelectTool={(tool) => setActiveToolId(tool.id)}
                />
              </div>

              {/* Active Tool Showcase Stage (Side-by-side Full Height Stretch) */}
              <div className="flex-1 w-full h-full self-stretch bg-gradient-to-br from-[#FAF9F6] via-[#F6F5F8] to-[#F1F0F5] border border-[#E5E5E8] rounded-2xl p-4 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[520px] sm:min-h-[560px]">
                <div
                  className={`absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-gradient-to-br ${activeTool.accentGlow} blur-3xl opacity-75 pointer-events-none transition-all duration-700`}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTool.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col justify-between h-full min-h-full gap-6 relative z-10"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-black border border-neutral-800 p-2.5 shadow-md flex items-center justify-center flex-shrink-0">
                          <Image
                            src={activeTool.imageSrc}
                            alt={activeTool.name}
                            width={52}
                            height={52}
                            className="object-contain bg-black rounded-xl"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-mono text-[#E8342A] font-semibold tracking-wider uppercase flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-[#E8342A]" />
                            {activeTool.category}
                          </span>
                          <h3 className="font-notch text-3xl sm:text-4xl font-bold text-[#171717]">
                            {activeTool.name}
                          </h3>
                          <p className="text-xs font-mono text-[#5C5C5C] pt-0.5">
                            {activeTool.tagline}
                          </p>
                        </div>
                      </div>

                      <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#E0E0E0] text-xs font-mono font-semibold text-[#171717] shadow-2xs">
                        {activeTool.badge}
                      </span>
                    </div>

                    {/* Expanded Full Height Description Box */}
                    <div className="bg-white/85 backdrop-blur-xs border border-[#E0E0E0] rounded-2xl p-5 sm:p-6 shadow-2xs flex-1 flex flex-col justify-center my-2">
                      <p className="text-base sm:text-lg text-[#262626] leading-relaxed font-sans">
                        {activeTool.description}
                      </p>
                    </div>

                    {/* Tech Specs & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {activeTool.specs.map((spec) => (
                          <span
                            key={spec}
                            className="text-xs font-mono bg-white/90 border border-[#E0E0E0] text-[#171717] px-3.5 py-1.5 rounded-xl shadow-2xs flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8342A]" />
                            {spec}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-[#737373] bg-white/80 border border-[#E0E0E0] px-3.5 py-1.5 rounded-xl shadow-2xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">Active Engine</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: Rig. Hardware Engine */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-[#E0E0E0]">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-[#A3A3A3] font-semibold tracking-wider">
              02
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-[#171717]">
              Rig.
            </h2>
            <p className="font-serif italic text-lg text-[#5C5C5C] font-normal">
              Hardware Engine
            </p>
            <p className="text-xs font-sans text-[#737373] leading-relaxed pt-2 hidden md:block">
              Physical workstation equipment, high-refresh displays, and studio audio gear powering daily software development.
            </p>
          </div>

          {/* Right Column: Hardware Cards */}
          <div className="md:col-span-8 flex flex-col gap-6">
            {hardwareList.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-white border border-[#E0E0E0] hover:border-[#171717] rounded-3xl p-5 sm:p-7 flex flex-col gap-5 sm:gap-6 transition-all duration-300 shadow-2xs hover:shadow-md relative overflow-hidden group cursor-pointer"
              >
                {/* Full-Size / Full-Width Cover Image Container */}
                <div className="w-full h-60 sm:h-80 md:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-[#E5E5E8] bg-black group-hover:scale-[1.01] transition-transform duration-500 shadow-sm">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    priority={item.id === "pc-setup" || item.id === "macbook-air-m4"}
                  />
                </div>

                {/* Info Content */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-semibold ${item.badgeColor || "bg-sky-50 text-sky-700 border-sky-200"}`}>
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-emerald-600 flex items-center gap-1.5 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      ONLINE
                    </span>
                  </div>

                  <h3 className="font-notch text-2xl sm:text-3xl font-bold text-[#171717] group-hover:text-[#E8342A] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono text-[#5C5C5C] leading-relaxed">
                    {item.specs}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#737373] pt-3 border-t border-[#F0F0F2] mt-1">
                    <Laptop className="w-4 h-4 text-[#E8342A]" />
                    <span>Primary Workstation Hardware</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
