"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  ExternalLink,
  Search,
  Folder,
  Palette,
  Code,
  FileText,
  Sparkles,
  Download,
  Share2,
  Check,
  Layers,
} from "lucide-react";
import Footer from "@/components/Footer";

const MASTER_DRIVE_LINK =
  "https://drive.google.com/drive/folders/1AdiiflFptylyoADX1GtlFQqXyzQtNRtI?usp=share_link";

interface Asset {
  id: string;
  title: string;
  category: "Design Templates" | "UI Kits" | "Icons & Graphics" | "Dev Starters";
  description: string;
  tags: string[];
  fileType: string;
  format: "Figma" | "Code" | "Drive" | "Zip";
  driveUrl: string;
  featured?: boolean;
}

const assetsList: Asset[] = [
  {
    id: "shopify-liquid-codes-150",
    title: "150+ Liquid Codes for Shopify",
    category: "Dev Starters",
    description:
      "A curated collection of 150+ custom Liquid code snippets, theme modifications, section presets, and ecommerce utilities for Shopify stores.",
    tags: ["Shopify", "Liquid", "E-commerce", "Snippets"],
    fileType: "Shopify Code Pack",
    format: "Code",
    driveUrl: "https://drive.google.com/drive/folders/1AdiiflFptylyoADX1GtlFQqXyzQtNRtI",
    featured: true,
  },
];

const categories = [
  "All",
  "Design Templates",
  "UI Kits",
  "Icons & Graphics",
  "Dev Starters",
] as const;

export default function UsefulAssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAssets = assetsList.filter((asset) => {
    const matchesCategory =
      selectedCategory === "All" || asset.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleShare = (id: string, title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${title} - ${MASTER_DRIVE_LINK}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full bg-[#FBFBFB] text-neutral-900 min-h-screen pt-28 md:pt-36 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col items-center gap-10 md:gap-14 pb-28 relative z-10">
        {/* Hero Header */}
        <div className="w-full flex flex-col items-center text-center gap-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-mono tracking-wider uppercase shadow-xs"
          >
            <Package className="w-3.5 h-3.5 text-[#E8342A]" />
            <span>DESIGN & DEV VAULT</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-notch text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900"
          >
            Useful Assets & <br />
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#E8342A] via-[#FF5E62] to-[#FF9966] bg-clip-text text-transparent inline-block pr-2">
              Free Resources
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed max-w-2xl"
          >
            Curated Figma templates, UI kits, code starters, and graphical elements crafted to accelerate your build process. Free to browse and download directly.
          </motion.p>

          {/* Direct Master Drive CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2"
          >
            <a
              href={MASTER_DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#171717] text-white text-sm font-medium hover:bg-[#333333] transition-all shadow-md group cursor-pointer"
            >
              <Folder className="w-4 h-4 text-[#E8342A]" />
              <span>Open Master Google Drive Folder</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-neutral-400" />
            </a>
          </motion.div>
        </div>

        {/* Filter & Search Bar */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-200/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-neutral-900 text-white shadow-xs"
                      : "bg-white text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 border border-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search assets or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200 rounded-full text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-all"
            />
          </div>
        </div>

        {/* Assets Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset, idx) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={`flex flex-col justify-between p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden ${
                asset.featured
                  ? "border-neutral-900 shadow-md ring-1 ring-neutral-900/10"
                  : "border-neutral-200/90 hover:border-neutral-300 shadow-xs"
              }`}
            >
              {/* Featured Badge */}
              {asset.featured && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8342A]/10 border border-[#E8342A]/20 text-[10px] font-mono font-semibold text-[#E8342A]">
                  <Sparkles className="w-3 h-3" />
                  <span>FEATURED</span>
                </div>
              )}

              {/* Card Header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-200/80 text-neutral-800 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                    {asset.format === "Figma" ? (
                      <Palette className="w-4 h-4" />
                    ) : asset.format === "Code" ? (
                      <Code className="w-4 h-4" />
                    ) : (
                      <Folder className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                      {asset.fileType}
                    </span>
                    <h3 className="font-notch font-bold text-base text-neutral-900 leading-snug group-hover:text-[#E8342A] transition-colors">
                      {asset.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed pt-1">
                  {asset.description}
                </p>

                {/* Tag Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2">
                  {asset.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200/60 text-[11px] text-neutral-600 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-neutral-100">
                <button
                  onClick={() => handleShare(asset.id, asset.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                  title="Copy asset link"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <a
                  href={asset.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-900 text-white text-xs font-semibold hover:bg-[#E8342A] transition-colors shadow-xs cursor-pointer"
                >
                  <span>Open Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredAssets.length === 0 && (
          <div className="w-full py-16 text-center flex flex-col items-center justify-center gap-3 bg-white rounded-2xl border border-neutral-200">
            <Package className="w-8 h-8 text-neutral-300" />
            <h3 className="font-notch text-base font-semibold text-neutral-800">
              No matching assets found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              Try adjusting your search keywords or select another category filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-2 text-xs text-[#E8342A] font-semibold underline underline-offset-4 cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="w-full rounded-2xl bg-neutral-900 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex flex-col gap-2 max-w-xl text-center md:text-left">
            <h3 className="font-notch text-2xl sm:text-3xl font-bold tracking-tight">
              Looking for a custom template or asset?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Leave a note on the Guestbook wall or reach out directly to request custom UI components, icon packs, or templates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/guestbook"
              className="px-5 py-3 rounded-full bg-white text-neutral-900 text-xs sm:text-sm font-semibold hover:bg-neutral-100 transition-colors shadow-xs whitespace-nowrap"
            >
              Drop a Request on Guestbook
            </Link>
          </div>
        </div>
      </div>

      <Footer ctaVerb="design" />
    </div>
  );
}
