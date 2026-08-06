"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { motion } from "framer-motion";
import Marquee from "@/components/Marquee";
import ProjectCard, { ProjectData } from "@/components/ProjectCard";
import SSWholesaleSlideshowModal from "@/components/SSWholesaleSlideshowModal";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

const clientLogos = [
  "VSB",
  "HeyDigital",
  "Interwove",
  "SS Wholesale",
  "AquaWind",
  "Inka Billing",
  "Flutter",
  "Firebase",
  "FastAPI",
  "React",
  "Tailwind",
  "Python",
];

const interestItems = [
  "Building Apps",
  "Designing Products",
  "Crafting Packaging",
  "Product Design",
  "Artificial Intelligence",
  "Mobile Applications",
  "Full-Stack Development",
  "Cloud Technologies",
  "System Architecture",
];

const featuredProjects: ProjectData[] = [
  {
    id: "heydigital",
    title: "HeyDigital",
    category: "Web Development",
    tags: ["WEB DEVELOPMENT", "DIGITAL AGENCY", "NEXT.JS"],
    description:
      "Modern web application & digital marketing agency platform built with custom interactive UI, responsive layouts, service showcases, and agency portfolio.",
    imageUrl: "/heydigital-mockup.png",
    linkText: "Visit Website",
    linkUrl: "https://heydigital.work",
    gradientBg:
      "linear-gradient(173deg, rgb(255, 250, 235) 10%, rgb(255, 235, 180) 90%)",
    featured: true,
  },
  {
    id: "interwove",
    title: "Interwove",
    category: "Web Development",
    tags: ["WEB DEVELOPMENT", "E-COMMERCE", "BRANDING"],
    description:
      "Premium luxury apparel e-commerce store built for Interwove featuring seamless shopping experience, refined product showcases, custom storefront, and responsive design.",
    imageUrl: "/interwove.png",
    linkText: "Visit Store",
    linkUrl: "https://interwove.in",
    gradientBg:
      "linear-gradient(173deg, rgb(248, 246, 242) 10%, rgb(230, 225, 215) 90%)",
    featured: true,
  },
  {
    id: "inka",
    title: "Inka",
    category: "Mobile Apps",
    tags: ["FLUTTER", "BILLING & INVOICING", "FREELANCE"],
    description:
      "Mobile billing & invoicing application designed for freelancers to track revenue, manage clients, generate instant invoices, and handle payments effortlessly.",
    imageUrl: "/inka.png",
    linkText: "View Billing App",
    linkUrl: "https://github.com/Saravanaofficialpmv",
    gradientBg:
      "linear-gradient(173deg, rgb(255, 242, 238) 10%, rgb(255, 218, 210) 90%)",
    featured: true,
  },
  {
    id: "aquawind",
    title: "AquaWind",
    category: "IoT Systems",
    tags: ["IOT", "ESP32", "CLOUD SENSORS"],
    description:
      "IoT-based smart water management system for monitoring water levels and optimizing distribution using sensors, ESP32, and cloud services.",
    imageUrl: "/aquawind.png",
    linkText: "Explore System",
    linkUrl: "https://github.com/Saravanaofficialpmv",
    gradientBg:
      "linear-gradient(173deg, rgb(229, 248, 220) 10%, rgb(200, 240, 185) 90%)",
    featured: true,
  },
  {
    id: "unisphere",
    title: "UniSphere",
    category: "Mobile Apps",
    tags: ["MOBILE APP", "FLUTTER", "CLOUD"],
    description:
      "Mobile application & academic collaboration platform integrating smart features, real-time analytics, and cloud synchronization.",
    imageUrl: "/unisphere.png",
    linkText: "Explore App",
    linkUrl: "https://github.com/Saravanaofficialpmv",
    gradientBg:
      "linear-gradient(173deg, rgb(240, 235, 255) 10%, rgb(220, 210, 255) 90%)",
    featured: true,
  },
];

export default function Home() {
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-20 md:gap-28 pt-28 md:pt-36 pb-16 px-4 md:px-8">
      {/* Slideshow Modal */}
      <SSWholesaleSlideshowModal
        isOpen={isSlideshowOpen}
        onClose={() => setIsSlideshowOpen(false)}
      />
      {/* 1. Hero / Landing Section */}
      <section className="w-full max-w-[1168px] flex flex-col items-center gap-8 md:gap-12">
        {/* Welcome Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 border border-[#D6D6D6] rounded-full bg-white text-xs tracking-wider shadow-xs"
        >
          <span className="text-[#5C5C5C] font-normal tracking-[0.15em]">HELLO</span>
          <svg className="w-3 h-3 inline-block shrink-0 -mt-0.5" viewBox="-1.5 0 20 20">
            <g fill="#E8342A">
              <g transform="translate(-102.000000, -7439.000000)">
                <g transform="translate(56.000000, 160.000000)">
                  <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" />
                </g>
              </g>
            </g>
          </svg>
          <span className="font-semibold text-[#5C5C5C] tracking-wider">SARAVANA S</span>
        </motion.div>

        {/* Main Headline */}
        <div className="flex flex-col items-center text-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-notch font-medium text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#171717] leading-tight max-w-4xl"
          >
            Building Apps<span className="period-highlight">.</span> Designing
            Products<span className="period-highlight">.</span> Crafting
            Packaging<span className="period-highlight">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-[#383838] font-normal max-w-2xl text-center leading-relaxed"
          >
            Product designer who maps messy problems into interfaces that get out of the way. From the brief changes &ndash; the obsession with clarity, calm, and the boring details doesn&rsquo;t.
          </motion.p>
        </div>

        {/* 3-Panel Photo Lander Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6"
        >
          {[
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
          ].map((imgUrl, idx) => (
            <div
              key={idx}
              className="relative h-44 sm:h-72 md:h-84 rounded-xl sm:rounded-2xl overflow-hidden group shadow-sm"
            >
              <Image
                src={imgUrl}
                alt={`Saravana portrait ${idx + 1}`}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </motion.div>

        {/* Client / Partner Logo Marquee */}
        <div className="w-full pt-6 border-t border-[#E0E0E0]/60 flex flex-col gap-4 items-center">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            Trusted by multiple clients worldwide
          </span>
          <Marquee speed="normal">
            {clientLogos.map((logo) => (
              <span
                key={logo}
                className="font-notch font-medium text-lg md:text-xl text-[#A3A3A3] tracking-wider uppercase hover:text-[#171717] transition-colors"
              >
                {logo}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* 2. About Brief Section */}
      <section className="w-full max-w-[1168px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6 border-y border-[#E0E0E0]">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            KNOW ME
          </span>
          <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
            Little about <span className="text-[#5C5C5C]">myself.</span>
          </h2>
          <p className="text-sm md:text-base text-[#171717] font-light leading-relaxed pt-2">
            <span className="font-semibold text-[#171717]">I&apos;m Saravana.</span> I started in engineering, moved to design, and somewhere along the way started building of my own, giving me a different instinct &mdash; less &ldquo;make it pretty,&rdquo; more &ldquo;will this actually work, and would someone use it.&rdquo;
          </p>
        </div>

        {/* Stats Counters */}
        <div className="flex items-center justify-around gap-4 md:gap-8">
          <div className="flex flex-col items-center text-center">
            <span className="font-notch font-normal text-4xl md:text-5xl text-[#E8342A]">
              03
            </span>
            <span className="text-xs uppercase tracking-wider text-[#A3A3A3] pt-1 max-w-[100px] text-center">
              YEARS IN DESIGN
            </span>
          </div>

          <div className="w-[1px] h-16 bg-[#E0E0E0]" />

          <div className="flex flex-col items-center text-center">
            <span className="font-notch font-normal text-4xl md:text-5xl text-[#E8342A]">
              40
            </span>
            <span className="text-xs uppercase tracking-wider text-[#A3A3A3] pt-1 max-w-[100px] text-center">
              PROJECTS DELIVERED
            </span>
          </div>
        </div>
      </section>

      {/* 3. Infinite Interest Scroller */}
      <div className="w-full py-4 border-b border-[#E0E0E0]">
        <Marquee speed="fast">
          {interestItems.map((item) => (
            <div key={item} className="flex items-center gap-12">
              <span className="font-notch text-xl md:text-2xl text-[#5C5C5C] whitespace-nowrap font-normal">
                {item}
              </span>
              <span className="text-[#E8342A] text-sm">✦</span>
            </div>
          ))}
        </Marquee>
      </div>

      {/* 4. Featured Product Showcase */}
      <section className="w-full max-w-[1168px] flex flex-col gap-6">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            THE ONE I BUILD FOR MYSELF
          </span>
          <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
            Proof I can do this <span className="text-[#5C5C5C]">end to end.</span>
          </h2>
        </div>

        {/* Featured Card (SS Wholesale) */}
        <div className="w-full border border-[#E0E0E0] rounded-2xl md:rounded-[24px] p-6 md:p-10 bg-[#FAFAFA] flex flex-col md:flex-row gap-8 items-center group">
          <div
            onClick={() => setIsSlideshowOpen(true)}
            className="relative w-full md:w-1/2 h-64 sm:h-72 md:h-96 rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group/img"
          >
            <Image
              src="/ss-wholesale.png"
              alt="SS Wholesale Platform"
              fill
              className="object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Click hint overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-semibold uppercase tracking-wider">
              <Images className="w-4 h-4 text-[#E8342A]" />
              <span>View Slideshow ✦</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h3 className="font-notch font-bold text-3xl text-[#171717]">
                SS Wholesale<span className="text-[#E8342A]">.</span>
              </h3>
              <span className="text-xs text-[#A3A3A3] uppercase tracking-wider font-medium">
                End-to-End B2B Wholesale Ordering & Inventory Platform
              </span>
            </div>

            <p className="text-sm md:text-base text-[#171717] font-light leading-relaxed">
              SS Wholesale is a full-featured mobile and backend ordering system engineered from scratch. Built to simplify wholesale commerce, it handles inventory tracking, customer accounts, order management, and offline synchronization seamlessly.
            </p>

            <ul className="flex flex-col gap-2 pt-2">
              {[
                "Real-time inventory control & multi-tier customer order tracking.",
                "Seamless offline data synchronization powered by Firebase backend.",
                "High-performance Flutter mobile application built for high-volume operations.",
              ].map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-[#5C5C5C]">
                  <span className="text-[#E8342A] text-xs pt-0.5">✦</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setIsSlideshowOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#333333] transition-all cursor-pointer shadow-sm"
              >
                <Images className="w-4 h-4 text-[#E8342A]" />
                <span>Explore SS Wholesale</span>
              </button>

              <a
                href="https://github.com/Saravanaofficialpmv"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F0F0F0] text-[#171717] text-xs uppercase tracking-wider font-medium hover:bg-[#E0E0E0] transition-all"
              >
                <span>GitHub Repo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. My Works Showcase */}
      <section className="w-full max-w-[1168px] flex flex-col gap-8">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
              MY WORKS
            </span>
            <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
              Few things shipped <span className="text-[#5C5C5C]">for others.</span>
            </h2>
          </div>

          <Link
            href="/works"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F7F7F7] border border-[#E0E0E0] text-xs font-semibold uppercase tracking-wider text-[#171717] hover:bg-[#E0E0E0] transition-colors"
          >
            <span>See all</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Works Stack */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={40}
          itemStackDistance={24}
          stackPosition="15%"
          baseScale={0.88}
          itemScale={0.03}
        >
          {featuredProjects.map((project, idx) => (
            <ScrollStackItem key={project.id}>
              <ProjectCard project={project} index={idx} />
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>
    </div>
  );
}
