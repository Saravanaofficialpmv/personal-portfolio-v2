"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TargetCursor from "@/components/TargetCursor";

interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    role: "B.Tech – Artificial Intelligence & Data Science",
    company: "VSB Engineering College, Karur, Tamil Nadu",
    period: "2023 – 2027 (Expected Graduation)",
    bullets: [
      "Specializing in Artificial Intelligence, Machine Learning algorithms, Data Structures, and Database Management Systems.",
      "Designing and building full-stack web and mobile applications using Flutter, React, Python, FastAPI, and Firebase.",
      "Developing IoT-based smart automation systems (AquaWind) integrating sensors, ESP32 microcontrollers, and cloud databases.",
    ],
  },
  {
    role: "Full-Stack & Flutter Developer",
    company: "Projects & Freelance",
    period: "Present",
    bullets: [
      "Built Inka: A mobile billing and invoicing app for freelancers with revenue analytics, client management, and invoice tracking.",
      "Built SS Wholesale: A wholesale ordering platform with inventory tracking, customer management, offline synchronization, and Firebase.",
      "Created scalable RESTful APIs with Python FastAPI and integrated relational & NoSQL databases (Firestore, MySQL, MongoDB).",
      "Deploys modern applications seamlessly across Vercel, Render, and Firebase Hosting.",
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
  {
    title: "VSB Engineering College",
    subtitle: "Karur, Tamil Nadu",
    description: "Pursuing B.Tech in Artificial Intelligence & Data Science (Graduation 2027).",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
  },
];

const tools = [
  { name: "Figma", bg: "bg-[#1E1E1E]", text: "text-[#0ACF83]" },
  { name: "Flutter", bg: "bg-[#02569B]", text: "text-[#47C5FB]" },
  { name: "Dart", bg: "bg-[#0175C2]", text: "text-[#54C5F8]" },
  { name: "React", bg: "bg-[#20232A]", text: "text-[#61DAFB]" },
  { name: "Python", bg: "bg-[#3776AB]", text: "text-[#FFD43B]" },
  { name: "FastAPI", bg: "bg-[#009688]", text: "text-[#FFFFFF]" },
  { name: "Firebase", bg: "bg-[#FFCA28]", text: "text-[#000000]" },
  { name: "Supabase", bg: "bg-[#3ECF8E]", text: "text-[#000000]" },
  { name: "Tailwind CSS", bg: "bg-[#06B6D4]", text: "text-[#FFFFFF]" },
  { name: "MySQL", bg: "bg-[#00758F]", text: "text-[#F29111]" },
  { name: "MongoDB", bg: "bg-[#47A248]", text: "text-[#FFFFFF]" },
  { name: "Git", bg: "bg-[#F05032]", text: "text-[#FFFFFF]" },
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
      <TargetCursor
        sectionSelector="#software-tools"
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColor="#E8342A"
        cursorColorOnTarget="#E8342A"
      />
      {/* 1. Header & Collage */}
      <section className="w-full max-w-[1168px] flex flex-col items-center gap-8 text-center">
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
          className="font-notch font-medium text-4xl sm:text-6xl md:text-7xl text-[#171717] tracking-tight"
        >
          designer <span className="text-[#5C5C5C]">&amp; full-stack engineer.</span>
        </motion.h1>

        {/* 3-Photo Banner Collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 pt-4"
        >
          {["FRAME 1", "FRAME 2", "FRAME 3"].map((frameText, i) => (
            <div
              key={i}
              className="relative h-44 sm:h-80 md:h-96 rounded-xl sm:rounded-2xl border border-[#E0E0E0] bg-[#F7F7F7] flex flex-col items-center justify-center p-4 select-none shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#E8342A] text-xs">✦</span>
                <span className="font-notch font-medium text-xl sm:text-2xl md:text-3xl text-[#171717] tracking-wider">
                  {frameText}
                </span>
              </div>
              <span className="text-[10px] sm:text-xs text-[#A3A3A3] font-mono tracking-widest pt-1 uppercase">
                IMAGE PLACEHOLDER
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. Summary & Location Details */}
      <section className="w-full max-w-[1168px] grid grid-cols-1 md:grid-cols-3 gap-8 items-start py-8 border-y border-[#E0E0E0]">
        <div className="md:col-span-2 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            ABOUT ME
          </span>
          <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
            Know me <span className="text-[#5C5C5C]">as I am.</span>
          </h2>
          <p className="text-sm md:text-base text-[#171717] font-light leading-relaxed pt-2">
            <span className="text-[#E8342A] font-medium">
              I&apos;m Saravana, an AI &amp; Data Science student at VSB Engineering College, Tamil Nadu.
            </span>{" "}
            I enjoy designing and developing digital products that combine clean user experiences with practical functionality. My work spans product design, web development, mobile applications, backend development, Firebase, AI integrations, and automation.
          </p>
        </div>

        {/* Info Box Metadata */}
        <div className="flex flex-col gap-3 bg-[#F7F7F7] border border-[#E0E0E0] rounded-xl p-5 text-xs font-notch">
          <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-2">
            <span className="text-[#A3A3A3] uppercase">LOCATION</span>
            <span className="text-[#171717] font-medium">
              Tamil Nadu, IN <span className="text-[#E8342A]">✦</span> {timeString}
            </span>
          </div>
          <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-2">
            <span className="text-[#A3A3A3] uppercase">EDUCATION</span>
            <span className="text-[#171717] font-medium">
              AI &amp; DS <span className="text-[#E8342A]">✦</span> VSB (2027)
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#A3A3A3] uppercase">LANGUAGES</span>
            <span className="text-[#171717] font-medium">English • Tamil</span>
          </div>
        </div>
      </section>

      {/* 3. Tech Stack / Tools Pill Row */}
      <section id="software-tools" className="w-full max-w-[1168px] flex flex-col gap-4">
        <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium text-center md:text-left">
          SOFTWARE & TOOLS
        </span>
        <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className={`cursor-target px-4 py-2.5 rounded-xl ${tool.bg} ${tool.text} font-notch font-bold text-sm shadow-sm transition-transform hover:-translate-y-1`}
            >
              {tool.name}
            </div>
          ))}
        </div>
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

        <div className="flex flex-col gap-10">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 border-b border-[#E0E0E0] pb-8 last:border-none"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8342A]" />
                  <h3 className="font-notch font-bold text-lg md:text-xl text-[#171717]">
                    {exp.role}{" "}
                    <span className="font-normal text-[#5C5C5C]">
                      • {exp.company}
                    </span>
                  </h3>
                </div>
                <span className="text-xs font-notch text-[#A3A3A3] uppercase tracking-wider">
                  {exp.period}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {exp.bullets.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#F7F7F7] border border-[#E0E0E0] text-xs text-[#5C5C5C] font-light leading-relaxed"
                  >
                    {b}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
