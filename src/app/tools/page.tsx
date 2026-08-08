"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Laptop,
  Terminal,
  Cpu,
  Wrench,
  Sparkles,
  Layers,
  Code2,
} from "lucide-react";
import Footer from "@/components/Footer";

interface HardwareItem {
  id: string;
  title: string;
  specs: string;
  badge: string;
  badgeColor?: string;
  imageSrc: string;
  featured?: boolean;
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

const hardwareList: HardwareItem[] = [
  {
    id: "macbook-pro",
    title: "MacBook Pro M-Series",
    specs: "32GB Unified Memory • 1TB NVMe SSD • Apple Silicon",
    badge: "WORKSTATION",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
    imageSrc: "/gear/macbook-setup.png",
    featured: true,
  },
  {
    id: "dual-monitors",
    title: "Dual 4K Displays",
    specs: "15.6\" Portable • 1080p • 144 Hz • USB-C Passthrough",
    badge: "144 HZ",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    imageSrc: "/gear/dual-monitors.png",
  },
  {
    id: "dynamic-mic",
    title: "Kreo Kast Dynamic Studio Mic",
    specs: "Dynamic Broadcast Microphone • XLR / USB-C",
    badge: "XLR / AUDIO",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    imageSrc: "/gear/dynamic-mic.png",
  },
];

const devCraftTools: AppToolItem[] = [
  { id: "figma", name: "Figma", category: "UI/UX & Systems", imageSrc: "/app-icons/figma.png" },
  { id: "antigravity", name: "Antigravity IDE", category: "AI Code Editor", imageSrc: "/app-icons/antigravity.png" },
  { id: "xcode", name: "Xcode", category: "iOS Development", imageSrc: "/app-icons/xcode.png" },
  { id: "androidstudio", name: "Android Studio", category: "Android SDK", imageSrc: "/app-icons/andriodstudio.png" },
  { id: "claude", name: "Claude Code", category: "AI Systems Architecture", imageSrc: "/app-icons/claude.webp" },
  { id: "shopify", name: "Shopify", category: "Liquid & E-Commerce", imageSrc: "/app-icons/shopify.png" },
  { id: "github", name: "GitHub", category: "Version Control", imageSrc: "/app-icons/github.png" },
  { id: "codex", name: "Codex Engine", category: "Code Synthesis", imageSrc: "/app-icons/codex-color.svg" },
];

const cliTools: AppToolItem[] = [
  { id: "zsh", name: "Zsh / Oh My Zsh", category: "Shell", lucideIcon: <Terminal className="w-5 h-5 text-emerald-600" /> },
  { id: "lazygit", name: "LazyGit", category: "Git TUI", lucideIcon: <Code2 className="w-5 h-5 text-purple-600" /> },
  { id: "tmux", name: "tmux", category: "Terminal Multiplexer", lucideIcon: <Layers className="w-5 h-5 text-sky-600" /> },
  { id: "docker", name: "Docker CLI", category: "Containers", lucideIcon: <Cpu className="w-5 h-5 text-cyan-600" /> },
  { id: "starship", name: "Starship", category: "Prompt Theme", lucideIcon: <Sparkles className="w-5 h-5 text-amber-600" /> },
  { id: "homebrew", name: "Homebrew", category: "Package Manager", lucideIcon: <Wrench className="w-5 h-5 text-orange-600" /> },
];

const aiCloudTools: AppToolItem[] = [
  { id: "chatgpt", name: "ChatGPT", category: "AI Assistant", imageSrc: "/app-icons/chatgpt.png" },
  { id: "gemini", name: "Gemini Pro", category: "Multimodal AI", imageSrc: "/app-icons/gemini.webp" },
  { id: "canva", name: "Canva", category: "Graphics Assets", imageSrc: "/app-icons/canva.png" },
  { id: "spotify", name: "Spotify", category: "Focus Soundtracks", imageSrc: "/app-icons/spotify.png" },
];

export default function ToolsPage() {
  const [hoveredToolId, setHoveredToolId] = useState<string | null>(null);

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
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-[#A3A3A3] font-semibold tracking-wider">
              01
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-[#171717]">
              Craft.
            </h2>
            <p className="font-serif italic text-lg text-[#5C5C5C] font-normal">
              Dev Environment
            </p>
          </div>

          {/* Right Column: 4-Column Grid of App Icon Cards */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {devCraftTools.map((tool) => {
              return (
                <motion.div
                  key={tool.id}
                  onMouseEnter={() => setHoveredToolId(tool.id)}
                  onMouseLeave={() => setHoveredToolId(null)}
                  whileHover={{ y: -4 }}
                  className="bg-white border border-[#E0E0E0] hover:border-[#171717] rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 relative group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#F7F7F8] border border-[#E5E5E5] flex items-center justify-center p-2.5 shadow-2xs group-hover:scale-110 transition-transform duration-300">
                    {tool.imageSrc && (
                      <Image
                        src={tool.imageSrc}
                        alt={tool.name}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="font-notch font-bold text-sm text-[#171717] group-hover:text-[#E8342A] transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#737373] tracking-tight pt-0.5">
                      {tool.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 03: CLI. Keyboard First */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-[#E0E0E0]">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-[#A3A3A3] font-semibold tracking-wider">
              03
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-[#171717]">
              CLI.
            </h2>
            <p className="font-serif italic text-lg text-[#5C5C5C] font-normal">
              Keyboard First
            </p>
          </div>

          {/* Right Column: CLI Tools Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cliTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white border border-[#E0E0E0] hover:border-[#171717] rounded-2xl p-5 flex flex-col items-center text-center justify-center gap-3 transition-all duration-300 group shadow-2xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7F7F8] border border-[#E5E5E5] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {tool.lucideIcon}
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-notch font-bold text-sm text-[#171717]">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#737373] tracking-wider uppercase pt-0.5">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 04: AI Models & Productivity */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-[#E0E0E0]">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-[#A3A3A3] font-semibold tracking-wider">
              04
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-[#171717]">
              Intelligence.
            </h2>
            <p className="font-serif italic text-lg text-[#5C5C5C] font-normal">
              AI &amp; Productivity
            </p>
          </div>

          {/* Right Column: AI Tools Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aiCloudTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white border border-[#E0E0E0] hover:border-[#171717] rounded-2xl p-5 flex flex-col items-center text-center justify-center gap-3 transition-all duration-300 group shadow-2xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7F7F8] border border-[#E5E5E5] flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                  {tool.imageSrc && (
                    <Image
                      src={tool.imageSrc}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-notch font-bold text-sm text-[#171717]">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#737373] tracking-wider uppercase pt-0.5">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
