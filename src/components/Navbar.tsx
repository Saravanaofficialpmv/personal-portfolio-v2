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
  X,
  Globe,
  FileText,
  Package,
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
  { name: "Bucket List", category: "Page", path: "/bucket-list" },
  { name: "Guestbook", category: "Page", path: "/guestbook" },
  { "name": "Useful Assets & Resources", category: "Page", path: "/useful-assets" },
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
                  !isMoreOpen &&
                  (item.path === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.path));

                return (
                  <li
                    key={item.path}
                    className={`relative shrink-0 ${
                      item.name === "Resume" ? "hidden md:block" : ""
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
                  className={`relative z-10 flex items-center gap-0.5 sm:gap-1 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium tracking-wide rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    isMoreOpen
                      ? "text-white font-semibold"
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

                {isMoreOpen && (
                  <motion.div
                    layoutId="nav-pill-active"
                    className="absolute inset-0 bg-white/15 border border-white/10 rounded-full z-0 shadow-inner"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
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
                className="fixed md:absolute top-16 md:top-full mt-1.5 md:mt-2.5 left-1/2 -translate-x-1/2 w-[calc(100vw-24px)] md:w-[720px] max-w-2xl bg-[#141416]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl z-50 text-white origin-top max-h-[85vh] overflow-y-auto scrollbar-none before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
              >
                {/* DESKTOP VIEW: Exactly 3 Image Cards (Guestbook, Bucket List, Useful Assets - No Resume) */}
                <div className="hidden md:grid grid-cols-3 gap-3">
                  {/* Card 1: Guestbook */}
                  <Link
                    href="/guestbook"
                    onClick={() => setIsMoreOpen(false)}
                    className="relative h-48 lg:h-52 rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer text-left w-full"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
                      alt="Guestbook background"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="relative z-10 flex flex-col gap-0.5">
                      <h4 className="font-notch font-medium text-base text-white">
                        Guestbook
                      </h4>
                      <p className="text-xs text-neutral-300 font-light truncate">
                        Let me know you were here
                      </p>
                    </div>
                  </Link>

                  {/* Card 2: Bucket List */}
                  <Link
                    href="/bucket-list"
                    onClick={() => setIsMoreOpen(false)}
                    className="relative h-48 lg:h-52 rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer text-left w-full"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1521673461164-de300ebcfb17?q=80&w=600&auto=format&fit=crop"
                      alt="Bucket list background"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="relative z-10 flex flex-col gap-0.5">
                      <h4 className="font-notch font-medium text-base text-white">
                        Bucket List
                      </h4>
                      <p className="text-xs text-neutral-300 font-light truncate">
                        Dreams with a deadline
                      </p>
                    </div>
                  </Link>

                  {/* Card 3: Useful Assets (Full Image Card) */}
                  <Link
                    href="/useful-assets"
                    onClick={() => setIsMoreOpen(false)}
                    className="relative h-48 lg:h-52 rounded-2xl overflow-hidden group border border-white/10 flex flex-col justify-end p-4 transition-transform duration-300 hover:scale-[1.02] cursor-pointer text-left w-full"
                  >
                    <Image
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop"
                      alt="Useful assets background"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="relative z-10 flex flex-col gap-0.5">
                      <h4 className="font-notch font-medium text-base text-white">
                        Useful Assets
                      </h4>
                      <p className="text-xs text-neutral-300 font-light truncate">
                        Design resources &amp; templates
                      </p>
                    </div>
                  </Link>
                </div>

                {/* MOBILE VIEW: Guestbook & Bucket List + Full-width Useful Assets & Resume Boxes */}
                <div className="flex md:hidden flex-col gap-2.5">
                  {/* Top Row: 2 Image Cards Side-by-Side */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Guestbook Card */}
                    <Link
                      href="/guestbook"
                      onClick={() => setIsMoreOpen(false)}
                      className="relative h-28 sm:h-32 rounded-xl overflow-hidden group border border-white/10 flex flex-col justify-end p-3 transition-transform duration-200 active:scale-98 cursor-pointer text-left w-full"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop"
                        alt="Guestbook background"
                        fill
                        className="object-cover object-center brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="relative z-10 flex flex-col gap-0.5">
                        <h4 className="font-notch font-medium text-sm text-white">
                          Guestbook
                        </h4>
                        <p className="text-[11px] text-neutral-300 font-light truncate">
                          Let me know you were here
                        </p>
                      </div>
                    </Link>

                    {/* Bucket List Card */}
                    <Link
                      href="/bucket-list"
                      onClick={() => setIsMoreOpen(false)}
                      className="relative h-28 sm:h-32 rounded-xl overflow-hidden group border border-white/10 flex flex-col justify-end p-3 transition-transform duration-200 active:scale-98 cursor-pointer text-left w-full"
                    >
                      <Image
                        src="https://images.unsplash.com/photo-1521673461164-de300ebcfb17?q=80&w=600&auto=format&fit=crop"
                        alt="Bucket list background"
                        fill
                        className="object-cover object-center brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="relative z-10 flex flex-col gap-0.5">
                        <h4 className="font-notch font-medium text-sm text-white">
                          Bucket List
                        </h4>
                        <p className="text-[11px] text-neutral-300 font-light truncate">
                          Dreams with a deadline
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Bottom Section: Useful Assets & Resume & Experience (Full Width Boxes filling remaining space) */}
                  <div className="flex flex-col gap-2 w-full">
                    {/* Useful Assets Box */}
                    <Link
                      href="/useful-assets"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] active:bg-white/[0.1] transition-colors group cursor-pointer text-left w-full"
                    >
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-neutral-300 group-hover:text-white transition-colors shrink-0">
                        <Package className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-notch text-sm font-semibold text-white">
                          Useful Assets
                        </span>
                        <span className="text-xs text-neutral-400 font-light">
                          Design resources &amp; templates
                        </span>
                      </div>
                    </Link>

                    {/* Resume & Experience Box */}
                    <Link
                      href="/resume"
                      onClick={() => setIsMoreOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] active:bg-white/[0.1] transition-colors group cursor-pointer text-left w-full"
                    >
                      <div className="p-2.5 rounded-xl bg-white/10 border border-white/10 text-neutral-300 group-hover:text-white transition-colors shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-notch text-sm font-semibold text-white">
                          Resume &amp; Experience
                        </span>
                        <span className="text-xs text-neutral-400 font-light">
                          Career ladder, education &amp; skills
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
                        if (item.path.startsWith("http")) {
                          window.open(item.path, "_blank", "noopener,noreferrer");
                        } else {
                          router.push(item.path);
                        }
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
