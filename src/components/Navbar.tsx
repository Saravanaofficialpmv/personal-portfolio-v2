"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookACallModal from "@/components/BookACallModal";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Link2,
  BookOpen,
  CreditCard,
  X,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Globe,
  Briefcase,
  FileText,
  Package,
  Wrench,
} from "lucide-react";

const mainNavItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Work", path: "/works" },
  { name: "Resume", path: "/resume" },
];

const searchableItems = [
  { name: "Home", category: "Page", path: "/" },
  { name: "About Me", category: "Page", path: "/about" },
  { name: "Selected Works", category: "Page", path: "/works" },
  { name: "Resume & Education", category: "Page", path: "/resume" },
  { name: "Inka Billing App", category: "Project", path: "/works#inka" },
  { name: "SS Wholesale", category: "Project", path: "/works#ss-wholesale" },
  { name: "AquaWind IoT", category: "Project", path: "/works#aquawind" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsMoreOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMoreOpen(false);
    }, 200);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Keyboard shortcut (⌘K or /) for search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredSearchItems = searchQuery.trim()
    ? searchableItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchableItems;

  return (
    <>
      {/* Floating Dark Navigation Header */}
      <header className="fixed top-3 sm:top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 sm:gap-2 max-w-[calc(100vw-12px)] sm:max-w-max">
        {/* Main Capsule Navbar Container */}
        <div ref={dropdownRef} className="relative max-w-full">
          <nav
            aria-label="Main navigation"
            className="bg-[#121214]/90 backdrop-blur-xl border border-white/10 rounded-full p-1 sm:p-1.5 shadow-2xl flex items-center gap-0.5 sm:gap-1.5 overflow-x-auto scrollbar-none max-w-[calc(100vw-52px)] sm:max-w-none"
          >
            <ul className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              {mainNavItems.map((item) => {
                const isActive =
                  item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path);

                return (
                  <li
                    key={item.path}
                    className={`relative shrink-0 ${
                      item.name === "Resume" ? "hidden sm:block" : ""
                    }`}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsMoreOpen(false)}
                      className={`relative z-10 block px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wide transition-colors duration-200 rounded-full whitespace-nowrap ${
                        isActive
                          ? "text-white font-semibold"
                          : "text-neutral-400 hover:text-white"
                      }`}
                    >
                      {item.name}
                    </Link>

                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-active"
                        className="absolute inset-0 bg-white/15 border border-white/10 rounded-full z-0 shadow-inner"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </li>
                );
              })}

              {/* More Dropdown Toggle Button - Hover scoped strictly to More */}
              <li
                className="relative shrink-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`flex items-center gap-0.5 sm:gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wide rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    isMoreOpen
                      ? "text-white bg-white/15 border border-white/10"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  <span>More</span>
                  {isMoreOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-white transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 transition-transform duration-200" />
                  )}
                </button>
              </li>
            </ul>

            {/* Book a Call Action Pill Button */}
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm transition-all shadow-xs flex items-center gap-1 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <span>Book a Call</span>
            </button>
          </nav>

          {/* More ∨ Dropdown Rich Popover Panel */}
          <AnimatePresence>
            {isMoreOpen && (
              <motion.div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, scale: 0.96, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -6 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-full mt-2.5 left-1/2 -translate-x-1/2 w-[calc(100vw-24px)] max-w-2xl bg-[#141416]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl z-50 text-white origin-top max-h-[75vh] overflow-y-auto scrollbar-none before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {/* Card 1: Guestbook */}
                  <button
                    onClick={() => {
                      setIsMoreOpen(false);
                      setIsBookModalOpen(true);
                    }}
                    className="relative h-28 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-end p-3 sm:p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer text-left w-full"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
                      alt="Guestbook background"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="relative z-10 flex flex-col gap-0.5">
                      <h4 className="font-notch font-medium text-sm sm:text-base text-white">
                        Guestbook
                      </h4>
                      <p className="text-xs text-neutral-300 font-light truncate">
                        Let me know you were here
                      </p>
                    </div>
                  </button>

                  {/* Card 2: Bucket List */}
                  <Link
                    href="/about"
                    onClick={() => setIsMoreOpen(false)}
                    className="relative h-28 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-end p-3 sm:p-4 transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1521673461164-de300ebcfb17?q=80&w=600&auto=format&fit=crop"
                      alt="Bucket list background"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="relative z-10 flex flex-col gap-0.5">
                      <h4 className="font-notch font-medium text-sm sm:text-base text-white">
                        Bucket List
                      </h4>
                      <p className="text-xs text-neutral-300 font-light truncate">
                        Dreams with a deadline
                      </p>
                    </div>
                  </Link>

                  {/* Card 3: List Items Column */}
                  <div className="flex flex-col gap-2 sm:gap-2.5 justify-between">
                    {/* Item 1: Useful Assets */}
                    <Link
                      href="/about"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors group cursor-pointer text-left w-full overflow-hidden"
                    >
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/10 border border-white/10 text-neutral-300 group-hover:text-white transition-colors shrink-0">
                        <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-notch text-xs font-semibold text-white truncate">
                          Useful Assets
                        </span>
                        <span className="text-[11px] text-neutral-400 font-light truncate block">
                          Design resources & templates
                        </span>
                      </div>
                    </Link>

                    {/* Item 2: Tools Which I Use */}
                    <Link
                      href="/about"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors group overflow-hidden"
                    >
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/10 border border-white/10 text-neutral-300 group-hover:text-white transition-colors shrink-0">
                        <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-notch text-xs font-semibold text-white truncate">
                          Tools Which I Use
                        </span>
                        <span className="text-[11px] text-neutral-400 font-light truncate block">
                          Hardware, software & workflow
                        </span>
                      </div>
                    </Link>

                    {/* Item 3: Resume & Experience (Mobile Only) */}
                    <Link
                      href="/resume"
                      onClick={() => setIsMoreOpen(false)}
                      className="sm:hidden flex items-center gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.06] border border-white/15 hover:bg-white/[0.12] transition-colors group overflow-hidden"
                    >
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[#E8342A]/20 border border-[#E8342A]/30 text-[#E8342A] group-hover:text-white transition-colors shrink-0">
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-notch text-xs font-semibold text-white truncate flex items-center gap-1.5">
                          <span>Resume &amp; Experience</span>
                          <span className="text-[9px] bg-[#E8342A]/20 text-[#E8342A] border border-[#E8342A]/30 px-1.5 py-0.5 rounded-md font-mono">
                            Page
                          </span>
                        </span>
                        <span className="text-[11px] text-neutral-400 font-light truncate block">
                          Career ladder, education &amp; skills
                        </span>
                      </div>
                    </Link>

                    {/* Item 4: Attribution (Desktop Only) */}
                    <Link
                      href="/resume"
                      onClick={() => setIsMoreOpen(false)}
                      className="hidden sm:flex items-center gap-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors group overflow-hidden"
                    >
                      <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-white/10 border border-white/10 text-neutral-300 group-hover:text-white transition-colors shrink-0">
                        <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-notch text-xs font-semibold text-white truncate">
                          Attribution
                        </span>
                        <span className="text-[11px] text-neutral-400 font-light truncate block">
                          Journey to create this site
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Circular Search Icon Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          aria-label="Search portfolio"
          className="w-10 h-10 rounded-full bg-[#121214]/90 backdrop-blur-xl border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl shrink-0"
        >
          <Search className="w-4 h-4" />
        </button>
      </header>

      {/* Command Search Overlay Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-[#171719] border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-col gap-4 text-white"
            >
              {/* Search Bar Input */}
              <div className="relative flex items-center border-b border-white/10 pb-3">
                <Search className="w-5 h-5 text-neutral-400 ml-2 mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search pages, projects, or case studies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder-neutral-500 outline-none"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Results List */}
              <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-1">
                {filteredSearchItems.length > 0 ? (
                  filteredSearchItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push(item.path);
                      }}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white">
                          <Globe className="w-4 h-4" />
                        </div>
                        <span className="font-notch text-sm font-medium text-white">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                        {item.category}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-neutral-500">
                    No matching results found.
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book a Call Modal */}
      <BookACallModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
}
