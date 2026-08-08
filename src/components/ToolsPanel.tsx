"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  Laptop,
  Cpu,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

export interface DetailedTool {
  id: string;
  name: string;
  category: "Hardware" | "Software" | "AI & Workflow" | "Infrastructure";
  role: string;
  iconSrc?: string;
  lucideIcon?: React.ReactNode;
  explanation: string;
  frequency: "Daily Driver" | "Core Engine" | "Primary IDE" | "Essential Hardware";
  tags: string[];
  link?: string;
  specs?: string;
}

const toolsList: DetailedTool[] = [
  {
    id: "macbook-pro",
    name: "MacBook Pro M-Series",
    category: "Hardware",
    role: "Core Workstation",
    lucideIcon: <Laptop className="w-5 h-5 text-[#E8342A]" />,
    explanation:
      "My primary development machine powered by Apple Silicon. Handles concurrent Flutter builds, Xcode simulators, local Next.js servers, and heavy Figma files without spinning fans or throttling.",
    frequency: "Essential Hardware",
    tags: ["Apple Silicon", "Dual 4K Displays", "macOS Sequoia"],
    specs: "32GB Unified Memory • 1TB NVMe Storage",
  },
  {
    id: "figma",
    name: "Figma",
    category: "Software",
    role: "UI/UX & System Design",
    iconSrc: "/app-icons/figma.png",
    explanation:
      "Where every project begins. Used for wireframing, crafting responsive design systems, high-fidelity UI mockups, auto-layout components, and interactive prototypes before coding.",
    frequency: "Daily Driver",
    tags: ["Design Systems", "Auto-Layout", "Prototyping", "Vector Craft"],
    link: "https://figma.com",
    specs: "Desktop App • Custom Plugins",
  },
  {
    id: "antigravity-vscode",
    name: "Antigravity / VS Code",
    category: "Software",
    role: "Primary AI Code Editor",
    iconSrc: "/app-icons/antigravity.png",
    explanation:
      "My main IDE for writing Next.js, React, TypeScript, and Flutter code. Enhanced with agentic AI coding assistants for ultra-fast component generation and rapid bug diagnosis.",
    frequency: "Primary IDE",
    tags: ["TypeScript", "Next.js", "Flutter", "AI Pair Programming"],
    specs: "Custom Dark Theme • ESLint • Prettier",
  },
  {
    id: "xcode-androidstudio",
    name: "Xcode & Android Studio",
    category: "Software",
    role: "Native Mobile Engine",
    iconSrc: "/app-icons/xcode.png",
    explanation:
      "Essential native development environments for compiling, profiling, and deploying iOS & Android mobile applications. Used for simulator testing and App Store distribution.",
    frequency: "Core Engine",
    tags: ["iOS Development", "Android SDK", "Flutter Mobile", "Build Automation"],
    specs: "iOS Simulator • Android Emulator",
  },
  {
    id: "shopify-liquid",
    name: "Shopify & Liquid",
    category: "Software",
    role: "E-Commerce Architecture",
    iconSrc: "/app-icons/shopify.png",
    explanation:
      "Specialized platform and templating engine used to build custom, high-converting e-commerce stores, custom sections, liquid code snippets, and automated store workflows.",
    frequency: "Daily Driver",
    tags: ["Liquid Snippets", "Storefront API", "Theme Customization"],
    link: "https://shopify.com",
    specs: "Shopify CLI • Liquid Theme Engine",
  },
  {
    id: "claude-chatgpt",
    name: "Claude & ChatGPT",
    category: "AI & Workflow",
    role: "AI Thought Partner",
    iconSrc: "/app-icons/claude.webp",
    explanation:
      "Leveraged daily for high-level architecture planning, mathematical formula modeling, code refactoring, and drafting comprehensive technical specifications.",
    frequency: "Daily Driver",
    tags: ["Claude 3.5 Sonnet", "GPT-4o", "Prompt Engineering", "System Logic"],
    specs: "API Integration • Custom Prompts",
  },
  {
    id: "github-vercel",
    name: "GitHub & Vercel",
    category: "Infrastructure",
    role: "Version Control & Edge Deployment",
    iconSrc: "/app-icons/github.png",
    explanation:
      "Central hub for version control, code review, automated CI/CD build actions, and instant global edge deployments with zero-downtime rollouts.",
    frequency: "Core Engine",
    tags: ["Git Version Control", "CI/CD Actions", "Vercel Edge Network"],
    link: "https://github.com",
    specs: "Global CDN • Serverless Edge",
  },
];

const categories = ["All", "Hardware", "Software", "AI & Workflow", "Infrastructure"] as const;

export default function ToolsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedToolId, setExpandedToolId] = useState<string | null>(toolsList[0].id);

  const filteredTools = toolsList.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedToolId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Section Header Card matching Reference Image Aesthetics */}
      <div className="w-full bg-[#18181B] text-white rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E8342A]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          {/* Dark Wrench Icon Box matching User Screenshot */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-inner shrink-0">
            <Wrench className="w-7 h-7 stroke-[2.2] text-[#E8342A]" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="font-notch text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Tools Which I Use
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light tracking-wide">
              Hardware, software &amp; daily workflow breakdown
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap relative z-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#E8342A] text-white border-[#E8342A] font-medium shadow-md shadow-[#E8342A]/25"
                    : "bg-white/5 text-neutral-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="w-full relative">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tools, hardware specs, frameworks..."
          className="w-full pl-11 pr-4 py-3 bg-white border border-[#E0E0E0] rounded-2xl text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#E8342A] transition-colors shadow-2xs font-light"
        />
      </div>

      {/* Vertical Panel List */}
      <div className="w-full flex flex-col gap-4">
        {filteredTools.map((tool) => {
          const isExpanded = expandedToolId === tool.id;

          return (
            <motion.div
              key={tool.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "bg-white border-[#E8342A]/40 shadow-md ring-1 ring-[#E8342A]/20"
                  : "bg-white border-[#E0E0E0] hover:border-neutral-300 shadow-2xs"
              }`}
            >
              {/* Tool Card Header Row (Click to toggle expand) */}
              <div
                onClick={() => toggleExpand(tool.id)}
                className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Tool Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 relative overflow-hidden shadow-2xs">
                    {tool.iconSrc ? (
                      <Image
                        src={tool.iconSrc}
                        alt={tool.name}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    ) : (
                      tool.lucideIcon
                    )}
                  </div>

                  {/* Tool Title & Role */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="font-notch font-bold text-base sm:text-lg text-neutral-900 truncate">
                        {tool.name}
                      </h4>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                        {tool.category}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 font-light truncate">
                      {tool.role}
                    </span>
                  </div>
                </div>

                {/* Status Pill & Expand Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-[#E8342A] bg-[#E8342A]/8 px-3 py-1 rounded-full border border-[#E8342A]/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{tool.frequency}</span>
                  </span>
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-200">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#E8342A]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expandable Explanation Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-neutral-100 bg-neutral-50/50 p-5 sm:p-6 flex flex-col gap-4"
                  >
                    {/* Why I use this (Explanation) */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#E8342A] font-semibold">
                        WHY I USE THIS
                      </span>
                      <p className="text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                        {tool.explanation}
                      </p>
                    </div>

                    {/* Specs / Detail Row */}
                    {tool.specs && (
                      <div className="text-xs font-mono text-neutral-500 bg-white border border-neutral-200/80 px-3.5 py-2 rounded-xl inline-block self-start shadow-2xs">
                        <span className="text-neutral-400">SPECS: </span>
                        <span>{tool.specs}</span>
                      </div>
                    )}

                    {/* Tags List */}
                    <div className="flex items-center gap-2 flex-wrap pt-1">
                      {tool.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-mono bg-white text-neutral-600 border border-neutral-200 px-2.5 py-1 rounded-md shadow-2xs"
                        >
                          ✦ {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
