"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface JourneyBentoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  variant: "text-top" | "image-top" | "badge" | "project";
  imageUrl?: string;
  badgeBg?: string;
  badgeLogo?: string;
  badgeAuthor?: string;
  imageFit?: "cover" | "contain";
  imageBg?: string;
}

const realJourneyItems: JourneyBentoItem[] = [
  {
    id: "heydotin",
    title: "heydotin",
    subtitle: "Founder & Lead App Developer",
    description:
      "Crafting digital products, mobile platforms with Flutter, React, Firebase, and backend cloud APIs.",
    variant: "badge",
    badgeBg: "bg-[#171717]",
    badgeLogo: "heydotin",
    badgeAuthor: "2024 – Present",
  },
  {
    id: "inka-app",
    title: "Inka Billing App",
    subtitle: "Freelancer Billing & Revenue",
    description:
      "Mobile app for freelancers to manage clients, track revenues, and generate invoices instantly.",
    variant: "project",
    imageUrl: "/inka.png",
    imageFit: "contain",
    imageBg: "#F0F0F0",
  },
  {
    id: "awenest",
    title: "Awenest Storefront",
    subtitle: "US E-Commerce Brand",
    description:
      "Custom e-commerce storefront for US eco-conscious lifestyle brand Awenest with interactive product catalogs.",
    variant: "text-top",
    imageUrl: "/awenest.png",
    imageFit: "cover",
  },
  {
    id: "heydigital",
    title: "HeyDigital Agency",
    subtitle: "Web Development & Next.js",
    description:
      "Modern web application & digital marketing agency platform featuring custom interactive UI and responsive layouts.",
    variant: "image-top",
    imageUrl: "/heydigital-mockup.png",
    imageFit: "cover",
  },
  {
    id: "interwove",
    title: "Interwove",
    subtitle: "Luxury Apparel E-Commerce",
    description:
      "Premium luxury apparel e-commerce store built for Interwove featuring seamless shopping and custom storefront.",
    variant: "text-top",
    imageUrl: "/interwove.png",
    imageFit: "cover",
  },
  {
    id: "ss-wholesale",
    title: "SS Wholesale Platform",
    subtitle: "Mobile & Backend System",
    description:
      "Wholesale ordering system with inventory management and offline Firebase synchronization.",
    variant: "project",
    imageUrl: "/ss-wholesale.png",
    imageFit: "contain",
    imageBg: "#F0F0F0",
  },
  {
    id: "aquawind-system",
    title: "AquaWind IoT System",
    subtitle: "Hardware & Cloud Sensors",
    description:
      "Smart water management with ESP32 sensors and real-time cloud data visualization.",
    variant: "project",
    imageUrl: "/aquawind.png",
    imageFit: "contain",
    imageBg: "#F0F0F0",
  },
  {
    id: "unisphere",
    title: "UniSphere Platform",
    subtitle: "Mobile & Campus Cloud",
    description:
      "Mobile application & academic collaboration platform integrating smart features and real-time analytics.",
    variant: "image-top",
    imageUrl: "/unisphere.png",
    imageFit: "cover",
  },
  {
    id: "shopify-freelance",
    title: "Shopify Storefronts",
    subtitle: "Freelance Web Designer",
    description:
      "Designed tailored e-commerce user interfaces optimized for conversion, Liquid templates, and client brands.",
    variant: "badge",
    badgeBg: "bg-[#004B38]",
    badgeLogo: "Shopify",
    badgeAuthor: "2022 – 2024",
  },
];

interface JourneyBentoReelProps {
  items?: JourneyBentoItem[];
  sectionTag?: string;
  sectionTitle?: string;
  sectionTitleSub?: string;
}

export default function JourneyBentoReel({
  items = realJourneyItems,
  sectionTag = "MY JOURNEY 2022 → 2026",
  sectionTitle = "Being through",
  sectionTitleSub = "so far.",
}: JourneyBentoReelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full max-w-[1168px] flex flex-col gap-6 select-none">
      {/* Header Row with Nav Buttons */}
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium font-mono">
            {sectionTag}
          </span>
          <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
            {sectionTitle} <span className="text-[#5C5C5C]">{sectionTitleSub}</span>
          </h2>
        </div>

        {/* Arrow Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2.5 rounded-full bg-[#F7F7F7] border border-[#E0E0E0] text-[#171717] hover:bg-[#171717] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2.5 rounded-full bg-[#F7F7F7] border border-[#E0E0E0] text-[#171717] hover:bg-[#171717] hover:text-white transition-all cursor-pointer shadow-xs active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto pb-4 flex gap-6 snap-x snap-mandatory scrollbar-none scroll-smooth pt-1"
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="w-[280px] sm:w-[320px] shrink-0 snap-start rounded-2xl border border-[#E0E0E0] bg-white overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
          >
            {/* VARIANT A: TEXT TOP + IMAGE BOTTOM */}
            {item.variant === "text-top" && (
              <div className="p-5 flex flex-col justify-between h-[360px] sm:h-[380px]">
                {/* Text Content Top */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-notch font-bold text-lg sm:text-xl text-[#171717] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs text-[#E8342A] font-semibold tracking-wide">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-[#5C5C5C] font-light leading-relaxed pt-1 line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Image Frame Bottom */}
                <div className="relative w-full h-[180px] sm:h-[200px] rounded-xl overflow-hidden bg-[#F7F7F7] border border-[#EBEBEB] mt-4">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className={`object-${item.imageFit || "cover"} object-center group-hover:scale-105 transition-transform duration-500`}
                    />
                  )}
                </div>
              </div>
            )}

            {/* VARIANT B: GRAPHIC BADGE CARD */}
            {item.variant === "badge" && (
              <div
                className={`p-6 flex flex-col justify-between h-[360px] sm:h-[380px] ${
                  item.badgeBg || "bg-[#171717]"
                } text-white relative overflow-hidden`}
              >
                {/* Top Badge Brand Logo */}
                <div className="flex items-start justify-between w-full">
                  <span className="font-notch font-bold text-2xl tracking-tight text-white/90">
                    {item.badgeLogo || "heydotin"}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 border border-white/20 px-2 py-0.5 rounded-full">
                    {item.badgeAuthor || "WORK"}
                  </span>
                </div>

                {/* Middle Content */}
                <div className="flex flex-col gap-2 z-10 pt-4">
                  <span className="text-xs font-mono tracking-wider text-[#E8342A] uppercase font-semibold">
                    {item.subtitle}
                  </span>
                  <h3 className="font-notch font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/80 font-light leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Signature / Author Footer */}
                <div className="pt-4 border-t border-white/15 flex items-center justify-between z-10">
                  <span className="text-xs font-notch font-medium text-white/90">
                    Saravana S
                  </span>
                  <span className="text-[10px] font-mono text-white/70">PORTFOLIO</span>
                </div>

                {/* Background Decorative Glow */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#E8342A]/20 blur-2xl pointer-events-none" />
              </div>
            )}

            {/* VARIANT C: IMAGE TOP + TEXT BOTTOM */}
            {item.variant === "image-top" && (
              <div className="flex flex-col h-[360px] sm:h-[380px]">
                {/* Image Frame Top */}
                <div className="relative w-full h-[190px] sm:h-[210px] bg-[#F7F7F7] border-b border-[#EBEBEB]">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className={`object-${item.imageFit || "cover"} object-center group-hover:scale-105 transition-transform duration-500`}
                    />
                  )}
                </div>

                {/* Text Content Bottom */}
                <div className="p-5 flex flex-col justify-center flex-1 gap-1.5">
                  <h3 className="font-notch font-bold text-lg sm:text-xl text-[#171717] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs text-[#E8342A] font-semibold tracking-wide">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-[#5C5C5C] font-light leading-relaxed pt-1 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            )}

            {/* VARIANT D: PROJECT MOCKUP CARD */}
            {item.variant === "project" && (
              <div className="flex flex-col h-[360px] sm:h-[380px]">
                {/* Device Mockup Frame Top */}
                <div
                  className="relative w-full h-[190px] sm:h-[210px] border-b border-[#EBEBEB] p-3 flex items-center justify-center"
                  style={{ backgroundColor: item.imageBg || "#F0F0F0" }}
                >
                  {item.imageUrl && (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                      />
                    </div>
                  )}
                </div>

                {/* Text Content Bottom */}
                <div className="p-5 flex flex-col justify-center flex-1 gap-1.5">
                  <h3 className="font-notch font-bold text-lg sm:text-xl text-[#171717] tracking-tight leading-snug">
                    {item.title}
                  </h3>
                  <span className="text-xs text-[#E8342A] font-semibold tracking-wide">
                    {item.subtitle}
                  </span>
                  <p className="text-xs text-[#5C5C5C] font-light leading-relaxed pt-1 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
