"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Terminal,
  Cpu,
  Wrench,
  Sparkles,
  Layers,
  ExternalLink,
  Code2,
  CheckCircle2,
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
    badgeColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    imageSrc: "/gear/macbook-setup.png",
    featured: true,
  },
  {
    id: "dual-monitors",
    title: "Dual 4K Displays",
    specs: "15.6\" Portable • 1080p • 144 Hz • USB-C Passthrough",
    badge: "144 HZ",
    badgeColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    imageSrc: "/gear/dual-monitors.png",
  },
  {
    id: "dynamic-mic",
    title: "Kreo Kast Dynamic Studio Mic",
    specs: "Dynamic Broadcast Microphone • XLR / USB-C",
    badge: "XLR / AUDIO",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
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
  { id: "zsh", name: "Zsh / Oh My Zsh", category: "Shell", lucideIcon: <Terminal className="w-5 h-5 text-emerald-400" /> },
  { id: "lazygit", name: "LazyGit", category: "Git TUI", lucideIcon: <Code2 className="w-5 h-5 text-purple-400" /> },
  { id: "tmux", name: "tmux", category: "Terminal Multiplexer", lucideIcon: <Layers className="w-5 h-5 text-sky-400" /> },
  { id: "docker", name: "Docker CLI", category: "Containers", lucideIcon: <Cpu className="w-5 h-5 text-cyan-400" /> },
  { id: "starship", name: "Starship", category: "Prompt Theme", lucideIcon: <Sparkles className="w-5 h-5 text-amber-400" /> },
  { id: "homebrew", name: "Homebrew", category: "Package Manager", lucideIcon: <Wrench className="w-5 h-5 text-orange-400" /> },
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
    <div className="w-full bg-[#0A0A0C] text-neutral-100 min-h-screen pt-28 md:pt-36 relative overflow-hidden font-sans selection:bg-[#E8342A] selection:text-white">
      {/* Background Subtle Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col gap-16 md:gap-24 pb-32 relative z-10">
        
        {/* Header Hero Section */}
        <div className="w-full border-b border-[#1F1F23] pb-12 flex flex-col items-center text-center gap-4 relative">
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
            className="font-notch text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          >
            <span>What Powers</span>{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-purple-400 via-pink-400 to-[#E8342A] bg-clip-text text-transparent">
              My Work
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-400 font-light max-w-xl text-center leading-relaxed"
          >
            An inside look at the workstation setup, dev environments, command-line utilities, and AI models driving my daily workflow.
          </motion.p>
        </div>

        {/* SECTION 01: Setup. The Hardware */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-4 border-t border-[#1F1F23]">
          {/* Left Column: Number & Section Title */}
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-neutral-500 font-semibold tracking-wider">
              01
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-white">
              Setup.
            </h2>
            <p className="font-serif italic text-lg text-neutral-400 font-normal">
              The Hardware
            </p>
          </div>

          {/* Right Column: Hardware Showcase Cards */}
          <div className="md:col-span-8 flex flex-col gap-6">
            {/* Featured Hardware (MacBook Pro) */}
            {hardwareList.slice(0, 1).map((item) => (
              <div
                key={item.id}
                className="w-full bg-[#121215] border border-[#26262B] rounded-3xl p-6 sm:p-8 flex flex-col gap-6 group hover:border-[#E8342A]/50 transition-all duration-300 shadow-2xl relative overflow-hidden"
              >
                {/* Background Ambient Glow */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#E8342A]/15 transition-all duration-500" />

                <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10 pt-2">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-notch text-xl sm:text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-neutral-400 font-light">
                      {item.specs}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border self-start sm:self-auto ${
                      item.badgeColor || "bg-white/10 text-white border-white/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}

            {/* Peripherals 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {hardwareList.slice(1).map((item) => (
                <div
                  key={item.id}
                  className="bg-[#121215] border border-[#26262B] rounded-3xl p-5 flex flex-col gap-4 group hover:border-neutral-600 transition-all duration-300 shadow-lg"
                >
                  <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-notch text-base font-bold text-white truncate">
                        {item.title}
                      </h4>
                      <span
                        className={`text-[9px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${
                          item.badgeColor || "bg-white/10 text-white border-white/20"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-neutral-400 font-light leading-relaxed">
                      {item.specs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 02: Craft. Dev Environment */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-[#1F1F23]">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-neutral-500 font-semibold tracking-wider">
              02
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-white">
              Craft.
            </h2>
            <p className="font-serif italic text-lg text-neutral-400 font-normal">
              Dev Environment
            </p>
          </div>

          {/* Right Column: 4-Column Grid of App Icon Cards */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {devCraftTools.map((tool) => {
              const isHovered = hoveredToolId === tool.id;
              return (
                <motion.div
                  key={tool.id}
                  onMouseEnter={() => setHoveredToolId(tool.id)}
                  onMouseLeave={() => setHoveredToolId(null)}
                  whileHover={{ y: -4 }}
                  className="bg-[#121215] border border-[#26262B] hover:border-white/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 transition-all duration-300 relative group cursor-pointer shadow-md"
                >
                  <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center p-2.5 shadow-inner group-hover:scale-110 transition-transform duration-300">
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
                    <span className="font-notch font-bold text-sm text-white group-hover:text-[#E8342A] transition-colors">
                      {tool.name}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 tracking-tight pt-0.5">
                      {tool.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* SECTION 03: CLI. Keyboard First */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-[#1F1F23]">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-neutral-500 font-semibold tracking-wider">
              03
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-white">
              CLI.
            </h2>
            <p className="font-serif italic text-lg text-neutral-400 font-normal">
              Keyboard First
            </p>
          </div>

          {/* Right Column: CLI Tools Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {cliTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-[#121215] border border-[#26262B] hover:border-emerald-500/40 rounded-2xl p-5 flex flex-col items-center text-center justify-center gap-3 transition-all duration-300 group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {tool.lucideIcon}
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-notch font-bold text-sm text-white">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase pt-0.5">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 04: AI Models & Productivity */}
        <section className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 border-t border-[#1F1F23]">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-2 sticky top-28 self-start">
            <span className="text-xs font-mono text-neutral-500 font-semibold tracking-wider">
              04
            </span>
            <h2 className="font-notch text-3xl md:text-4xl font-bold tracking-tight text-white">
              Intelligence.
            </h2>
            <p className="font-serif italic text-lg text-neutral-400 font-normal">
              AI &amp; Productivity
            </p>
          </div>

          {/* Right Column: AI Tools Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aiCloudTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-[#121215] border border-[#26262B] hover:border-purple-500/40 rounded-2xl p-5 flex flex-col items-center text-center justify-center gap-3 transition-all duration-300 group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
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
                  <span className="font-notch font-bold text-sm text-white">
                    {tool.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase pt-0.5">
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
