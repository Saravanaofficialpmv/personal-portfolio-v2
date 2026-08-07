"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AppIconsDock from "@/components/AppIconsDock";
import AboutPhotoFrames from "@/components/AboutPhotoFrames";

interface Experience {
  role: string;
  company: string;
  period: string;
  logoBg?: string;
  icon: React.ReactNode;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    role: "Founder & App Developer",
    company: "heydotin",
    period: "2024 – Present",
    logoBg: "bg-transparent",
    icon: (
      <Image
        src="/logowork/9.svg"
        alt="heydotin logo"
        width={32}
        height={32}
        className="w-full h-full object-contain"
      />
    ),
    bullets: [
      "Founder and lead app developer at heydotin, crafting digital products, mobile apps, and scalable web solutions.",
      "Building mobile platforms with Flutter, React, Firebase, and backend cloud APIs with focus on high performance.",
      "Engineered applications like Inka (Freelance Billing) & SS Wholesale with offline sync and client dashboards.",
      "Leading end-to-end product architecture, client acquisition, and UI/UX design strategy.",
    ],
  },
  {
    role: "Freelance Shopify Web Designer",
    company: "Self-Employed",
    period: "2022 – 2024",
    logoBg: "bg-transparent",
    icon: (
      <Image
        src="/shopify.png"
        alt="Shopify Logo"
        width={32}
        height={32}
        className="w-full h-full object-contain"
      />
    ),
    bullets: [
      "Worked as a freelance Shopify web designer creating custom, responsive e-commerce websites and digital storefronts.",
      "Designed tailored user interfaces (UI/UX) optimized for conversion, brand aesthetic, and mobile usability.",
      "Customized liquid templates, product showcases, and integrated essential Shopify apps and payment gateways.",
      "Delivered end-to-end web design projects for diverse client brands.",
    ],
  },
];

const journeyCards = [
  {
    title: "Inka Billing App",
    subtitle: "Freelancer Billing & Revenue",
    description: "Mobile app for freelancers to manage clients, track revenues, and generate invoices instantly.",
    imageUrl: "/inka.png",
  },
  {
    title: "SS Wholesale Platform",
    subtitle: "Mobile & Backend",
    description: "Wholesale ordering system with inventory management and offline Firebase synchronization.",
    imageUrl: "/ss-wholesale.png",
  },
  {
    title: "AquaWind IoT System",
    subtitle: "Hardware & Cloud",
    description: "Smart water management with ESP32 sensors and real-time cloud data visualization.",
    imageUrl: "/aquawind.png",
  },
  {
    title: "UniSphere Platform",
    subtitle: "Mobile & Cloud System",
    description: "Mobile application and digital platform integrating real-time analytics and campus management.",
    imageUrl: "/unisphere.png",
  },
];



export default function AboutPage() {
  const [timeString, setTimeString] = useState("11:11 PM");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-20 md:gap-28 pt-28 md:pt-36 pb-16 px-4 md:px-8">
      {/* 1. Header & Collage */}
      <section className="w-full max-w-[1168px] flex flex-col items-center gap-6 md:gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5C5C5C]"
        >
          <span className="text-[#E8342A]">✦</span>
          <span>ABOUT</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-notch font-bold text-4xl sm:text-6xl md:text-7xl text-[#171717] tracking-tight"
        >
          two sides <span className="font-normal text-[#171717]">of one designer.</span>
        </motion.h1>

        {/* 1, 2, 3 Photo Frames */}
        <AboutPhotoFrames />
      </section>

      {/* 2. Summary & Location Details */}
      <section className="w-full max-w-[1168px] grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-8">
        {/* Left Summary Block (7 cols) */}
        <div className="md:col-span-7 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            A SUMMARY
          </span>
          <h2 className="font-notch font-bold text-2xl sm:text-3xl md:text-4xl text-[#171717] tracking-tight">
            Know <span className="font-normal text-[#5C5C5C]">me</span> as I am.
          </h2>
          <p className="text-sm sm:text-base text-[#171717] font-light leading-relaxed pt-2">
            <span className="text-[#E8342A] font-medium">
              I design products that get out of the way.
            </span>{" "}
            3+ years across unisphere, SaaS and consumer apps – from the brief to the build. I care about clarity, calmness and the boring details no one notices when they&apos;re done right.
          </p>
        </div>

        {/* Right Info Data Table (5 cols) */}
        <div className="md:col-span-5 flex flex-col pt-2 sm:pt-6">
          <div className="flex items-center justify-between py-3 border-t border-[#E0E0E0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3]">
              BASED
            </span>
            <span className="text-xs sm:text-sm font-notch font-medium text-[#171717] flex items-center gap-1.5">
              <span>Tamil Nadu, IN</span>
              <span className="text-[#E8342A] text-xs">◆</span>
              <span className="font-bold">{timeString}</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-[#E0E0E0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3]">
              CURRENTLY
            </span>
            <span className="text-xs sm:text-sm font-notch font-medium text-[#171717] flex items-center gap-1.5">
              <span>Founder &amp; App Developer</span>
              <span className="text-[#E8342A] text-xs">◆</span>
              <span className="font-bold">heydotin</span>
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-b border-[#E0E0E0]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3]">
              DOMAIN
            </span>
            <span className="text-xs sm:text-sm font-notch font-medium text-[#171717]">
              Mobile Apps • Web • AI &amp; DS
            </span>
          </div>
        </div>
      </section>



{/* 3. Tech Stack & Tools App Icons Dock */}
      <section id="software-tools" className="w-full max-w-[1168px] flex flex-col gap-6 items-center md:items-start">
        <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium text-center md:text-left">
          SOFTWARE &amp; TOOLS
        </span>
        <AppIconsDock />
      </section>

      {/* 4. Career Ladder Section */}
      <section className="w-full max-w-[1168px] flex flex-col gap-8">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            CAREER LADDER
          </span>
          <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
            How I got <span className="text-[#5C5C5C]">here.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-10 sm:gap-12 pt-2">
          {experiences.map((exp, i) => {
            const isFirst = i === 0;
            const isLast = i === experiences.length - 1;

            return (
              <div key={i} className="flex items-start gap-3 sm:gap-4">
                {/* Left Timeline Axis */}
                <div className="flex flex-col items-center shrink-0 pt-2.5 self-stretch">
                  {/* Timeline Dot Node */}
                  <div className="relative w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {/* Seamless Continuous Red Breathing Halo (Zero Flicker) */}
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.25, 0.7, 0.25],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full bg-[#E8342A]/40 pointer-events-none"
                    />

                    {/* Center Glowing Red Dot */}
                    <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-[#E8342A] shadow-[0_0_10px_rgba(232,52,42,0.6)]" />
                  </div>

                  {/* Vertical Connecting Line */}
                  <div
                    className={`w-[1px] ${
                      isLast
                        ? "bg-gradient-to-b from-[#E0E0E0] to-transparent h-16 my-1"
                        : "bg-[#E0E0E0] flex-1 my-1 min-h-[48px]"
                    }`}
                  />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col gap-4 flex-1 pb-4">
                  {/* Role Title Row with Icon Logo, Title, and Date Pill Badge */}
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                    {/* Company Logo Icon */}
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden shadow-xs ${
                        exp.logoBg || "bg-[#171717] text-white"
                      }`}
                    >
                      {exp.icon}
                    </div>

                    {/* Role Title */}
                    <h3 className="font-notch font-bold text-lg sm:text-xl md:text-2xl text-[#171717] tracking-tight">
                      {exp.role}
                    </h3>

                    {/* Date Pill Badge */}
                    <span className="bg-[#F0F0F2] border border-[#E2E2E6] text-[#5C5C5C] text-xs font-notch font-medium px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {/* 4 Column Bullets Text Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-1">
                    {exp.bullets.map((b, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#E8342A] text-xs shrink-0 pt-0.5 select-none">✦</span>
                        <p className="text-xs sm:text-[13px] text-[#5C5C5C] font-light leading-relaxed tracking-normal">
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Journey Horizontal Scroller Section */}
      <section className="w-full max-w-[1168px] flex flex-col gap-6">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            MY JOURNEY 2022 → 2026
          </span>
          <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
            Being through <span className="text-[#5C5C5C]">so far.</span>
          </h2>
        </div>

        <div className="w-full overflow-x-auto pb-4 flex gap-6 snap-x snap-mandatory scrollbar-none">
          {journeyCards.map((card, i) => (
            <div
              key={i}
              className="w-72 sm:w-80 shrink-0 snap-start bg-white border border-[#E0E0E0] rounded-2xl overflow-hidden shadow-sm flex flex-col group"
            >
              <div className="relative h-48 w-full bg-[#F7F7F7]">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-notch font-medium text-base text-[#171717]">
                  {card.title}
                </h3>
                <span className="text-xs text-[#E8342A] font-semibold">
                  {card.subtitle}
                </span>
                <p className="text-xs text-[#5C5C5C] font-light leading-relaxed pt-1">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
