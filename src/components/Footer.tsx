"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Heart, Hourglass } from "lucide-react";
import BookACallModal from "@/components/BookACallModal";

interface FooterProps {
  ctaVerb?: string;
}

export default function Footer({ ctaVerb = "dream" }: FooterProps) {
  const [visitorCount, setVisitorCount] = useState<number | string>("...");
  const [showHourglass, setShowHourglass] = useState(false);
  const [rotatingWord, setRotatingWord] = useState(ctaVerb);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const verbs = ["dream", "design", "build", "ship", "develop"];

  useEffect(() => {
    const VISITOR_KEY = "portfolio_visitor_tracked";
    const hasVisited = localStorage.getItem(VISITOR_KEY);
    const isNewVisitor = !hasVisited;

    if (isNewVisitor) {
      localStorage.setItem(VISITOR_KEY, "true");
    }

    const syncVisitorCount = async () => {
      try {
        const res = await fetch("/api/visitor-count", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isNewVisitor }),
        });
        const data = await res.json();
        if (typeof data.count === "number") {
          setVisitorCount(data.count);
        }
      } catch (err) {
        console.error("Failed to sync visitor count:", err);
      }
    };

    syncVisitorCount();

    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/visitor-count");
        const data = await res.json();
        if (typeof data.count === "number") {
          setVisitorCount(data.count);
        }
      } catch {
        // ignore fetch error
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = verbs.indexOf(ctaVerb);
    if (index === -1) index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % verbs.length;
      setRotatingWord(verbs[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, [ctaVerb]);

  return (
    <>
      <BookACallModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      <footer className="relative w-full bg-gradient-to-t from-[#E8342A] via-[#E8342A] to-white flex flex-col items-center pt-16 overflow-hidden">
        {/* Curved White Content Card */}
        <div className="w-[calc(100%-32px)] md:w-[calc(100%-72px)] bg-white rounded-b-[24px] shadow-sm flex flex-col items-center pt-16 md:pt-28 pb-12 md:pb-20 px-6 md:px-12">
          <div className="w-full max-w-[1168px] flex flex-col gap-12 md:gap-16">
            {/* Top CTA Heading */}
            <div className="w-full border-b border-[#E0E0E0] pb-12 md:pb-16">
              <h2 className="font-notch font-medium text-4xl sm:text-5xl md:text-6xl text-[#171717] tracking-tight leading-[1.15]">
                Let&apos;s{" "}
                <span className="inline-block text-[#171717] transition-all duration-300">
                  {rotatingWord}
                </span>
                <br />
                <span className="text-[#5C5C5C]">incredible work </span>
                <span className="text-[#E8342A]">together</span>
                <span className="text-[#171717]">.</span>
              </h2>
            </div>

            {/* Links & Info Section */}
            <div className="flex flex-col gap-12">
              {/* Designer Bio & Let's Talk Button */}
              <div className="flex flex-col gap-6 items-start max-w-2xl">
                <p className="text-base sm:text-lg md:text-xl text-[#5C5C5C] font-light leading-relaxed">
                  I help teams turn vague ideas into products people actually want. Based in Tamil Nadu — open to opportunities.
                </p>
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#171717] text-white text-sm font-medium hover:bg-[#333333] transition-all shadow-sm group cursor-pointer"
                >
                  <span>Let&apos;s talk</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Links Grid: PAGES, CONNECT, REACH OUT */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-16 pt-8 border-t border-[#E0E0E0]/80">
                {/* Pages Navigation Col */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-notch font-bold text-xs tracking-wider text-[#A3A3A3] uppercase">
                    PAGES
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      { name: "Home", href: "/" },
                      { name: "About", href: "/about" },
                      { name: "Works", href: "/works" },
                      { name: "Resume", href: "/resume" },
                      { name: "Useful Assets", href: "https://drive.google.com/drive/folders/1AdiiflFptylyoADX1GtlFQqXyzQtNRtI?usp=share_link", external: true },
                    ].map((item) => (
                      <li key={item.name}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-base md:text-lg text-[#171717] hover:text-[#E8342A] transition-colors duration-150 font-light flex items-center gap-1"
                          >
                            <span>{item.name}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#5C5C5C]" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="text-base md:text-lg text-[#171717] hover:text-[#E8342A] transition-colors duration-150 font-light"
                          >
                            {item.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connect Social Links Col */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-notch font-bold text-xs tracking-wider text-[#A3A3A3] uppercase">
                    CONNECT
                  </h3>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      { name: "LinkedIn", href: "https://www.linkedin.com/in/saravana-selvaraju/" },
                      { name: "Instagram", href: "https://www.instagram.com/hey_.saroo/?hl=en" },
                      { name: "GitHub", href: "https://github.com/Saravanaofficialpmv" },
                      { name: "WhatsApp", href: "https://wa.me/919080407021?text=Hi%20Saravana,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect." },
                    ].map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base md:text-lg text-[#171717] hover:text-[#E8342A] transition-colors duration-150 font-light"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reach Out & Visitor Count Col */}
                <div className="flex flex-col gap-3 col-span-2 md:col-span-1 pt-4 md:pt-0 border-t md:border-t-0 border-[#E0E0E0]/60">
                  <h3 className="font-notch font-bold text-xs tracking-wider text-[#A3A3A3] uppercase">
                    REACH OUT
                  </h3>
                  <a
                    href="mailto:saravanapmvofficial@gmail.com"
                    className="text-base md:text-lg text-[#171717] hover:text-[#E8342A] font-light break-all transition-colors"
                  >
                    saravanapmvofficial@gmail.com
                  </a>

                  <div className="flex flex-col gap-1 pt-4 mt-2">
                    <span className="text-sm text-[#5C5C5C] font-light">
                      You&apos;re visitor number:
                    </span>
                    <span className="font-notch font-bold text-3xl sm:text-4xl text-[#E8342A] tracking-tight">
                      {visitorCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Red Decorative Section */}
        <div className="w-full flex flex-col items-center gap-12 py-12 md:py-16 text-white">
          {/* Geometric Shapes Row */}
          <div className="flex items-center justify-center gap-8 md:gap-12 opacity-25">
            {["circle", "hexagon", "diamond", "square", "circle", "hexagon", "diamond"].map(
              (shape, i) => (
                <svg key={i} className="w-8 h-8 md:w-12 md:h-12 fill-current" viewBox="0 0 24 24">
                  {shape === "circle" && <circle cx="12" cy="12" r="10" />}
                  {shape === "hexagon" && (
                    <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" />
                  )}
                  {shape === "diamond" && (
                    <polygon points="12,2 22,12 12,22 2,12" />
                  )}
                  {shape === "square" && (
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                  )}
                </svg>
              )
            )}
          </div>

          {/* Copyright Bar */}
          <div className="flex items-center gap-2 text-xs md:text-sm font-notch font-light">
            <span>© 2026 DESIGNED WITH</span>
            <button
              onClick={() => setShowHourglass(!showHourglass)}
              className="p-1 hover:scale-125 transition-transform duration-200 cursor-pointer"
              aria-label="Toggle Heart or Hourglass"
            >
              {showHourglass ? (
                <Hourglass className="w-4 h-4 text-white fill-white" />
              ) : (
                <Heart className="w-4 h-4 text-white fill-white" />
              )}
            </button>
            <span>BY SARAVANA S</span>
          </div>
        </div>
      </footer>
    </>
  );
}
