"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Grid, List } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard, { ProjectData } from "@/components/ProjectCard";
import LogoShowcase from "@/components/LogoShowcase";

const allProjects: ProjectData[] = [
  {
    id: "heydigital",
    title: "HeyDigital",
    category: "Web Development",
    tags: ["WEB DEVELOPMENT", "DIGITAL AGENCY", "NEXT.JS", "TAILWIND CSS"],
    description:
      "Modern web application & digital marketing agency platform featuring custom interactive UI, responsive layouts, service showcases, and agency portfolio.",
    imageUrl: "/heydigital-mockup.png",
    linkText: "Visit Website",
    linkUrl: "https://heydigital.work",
    gradientBg:
      "linear-gradient(173deg, rgb(255, 250, 235) 10%, rgb(255, 235, 180) 90%)",
    featured: true,
  },
  {
    id: "awenest",
    title: "Awenest",
    category: "Web Development",
    tags: ["WEB DEVELOPMENT", "US BRAND", "E-COMMERCE", "FULL-PAGE WORK"],
    description:
      "Custom e-commerce storefront for US-based eco-conscious lifestyle brand Awenest. Designed with interactive product catalogs, full-page responsive layouts, and a refined shopping experience.",
    imageUrl: "/awenest.png",
    secondaryImageUrl: "/awenest-store.png",
    primaryImageTitle: "Homepage",
    secondaryImageTitle: "Product Page",
    linkText: "Preview the UI",
    gradientBg:
      "linear-gradient(173deg, rgb(240, 248, 240) 10%, rgb(215, 238, 220) 90%)",
    featured: true,
    isPreviewModal: true,
    imageFit: "contain",
    imageBg: "#ADADAD",
  },
  {
    id: "inka",
    title: "Inka",
    category: "Mobile Applications",
    tags: ["MOBILE APP", "FLUTTER", "BILLING & INVOICING", "FREELANCE"],
    description:
      "Freelance billing & revenue tracking application featuring real-time client management, instant invoice creation, and financial dashboard analytics.",
    imageUrl: "/inka.png",
    linkText: "View Mobile App",
    linkUrl: "https://github.com/Saravanaofficialpmv",
    gradientBg:
      "linear-gradient(173deg, rgb(255, 242, 238) 10%, rgb(255, 218, 210) 90%)",
    featured: true,
  },
  {
    id: "interwove",
    title: "Interwove",
    category: "Web Development",
    tags: ["WEB DEVELOPMENT", "E-COMMERCE", "BRANDING", "UI/UX DESIGN"],
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
    id: "aquawind",
    title: "AquaWind",
    category: "Mobile Applications",
    tags: ["MOBILE APP", "IOT", "ESP32", "CLOUD SENSORS"],
    description:
      "Mobile application & IoT-based smart water management system for monitoring water levels and optimizing distribution using sensors, ESP32, and cloud services.",
    imageUrl: "/aquawind.png",
    linkText: "View Mobile & IoT System",
    linkUrl: "https://github.com/Saravanaofficialpmv",
    gradientBg:
      "linear-gradient(173deg, rgb(229, 248, 220) 10%, rgb(200, 240, 185) 90%)",
    featured: true,
  },
  {
    id: "unisphere",
    title: "UniSphere",
    category: "Mobile Applications",
    tags: ["MOBILE APP", "FLUTTER", "CLOUD INTEGRATION"],
    description:
      "Mobile application & academic collaboration platform integrating smart features, real-time analytics, and cloud synchronization.",
    imageUrl: "/unisphere.png",
    linkText: "View Mobile App",
    linkUrl: "https://github.com/Saravanaofficialpmv",
    gradientBg:
      "linear-gradient(173deg, rgb(240, 235, 255) 10%, rgb(220, 210, 255) 90%)",
    featured: true,
  },
];

export default function WorksPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects =
    activeTab === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeTab);

  return (
    <div className="w-full flex flex-col items-center gap-16 md:gap-24 pt-28 md:pt-36 pb-16 px-4 md:px-8">
      {/* Hero Section */}
      <section className="w-full max-w-[1168px] flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5C5C5C]"
        >
          <span className="text-[#E8342A]">✦</span>
          <span>WORKS</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-notch font-medium text-4xl sm:text-6xl md:text-7xl text-[#171717] tracking-tight"
        >
          crafting the <span className="text-[#5C5C5C]">finest of all.</span>
        </motion.h1>
      </section>

      {/* Filter Tabs & Layout Toggle Bar */}
      <section className="w-full max-w-[1168px] flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E0E0E0] pb-6">
        {/* Category Tabs */}
        <div className="flex items-center bg-[#F7F7F7] border border-[#E0E0E0] rounded-xl p-1 gap-1 flex-wrap">
          {[
            { label: "All", count: String(allProjects.length + 8).padStart(2, "0") },
            { label: "Web Development", count: String(allProjects.filter((p) => p.category === "Web Development").length).padStart(2, "0") },
            { label: "Mobile Applications", count: String(allProjects.filter((p) => p.category === "Mobile Applications").length).padStart(2, "0") },
            { label: "Logo & Brand Marks", count: "08" },
          ].map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#171717] text-white shadow-sm"
                    : "text-[#171717] hover:bg-[#E0E0E0]"
                }`}
              >
                {tab.label}{" "}
                <span
                  className={
                    isActive ? "text-white/70" : "text-[#A3A3A3]"
                  }
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Count & Grid/List Toggle */}
        <div className="flex items-center gap-4 text-xs font-notch">
          <span className="text-[#5C5C5C]">
            <strong className="text-[#171717] font-bold">
              {activeTab === "Logo & Brand Marks"
                ? 8
                : activeTab === "All"
                ? allProjects.length + 8
                : filteredProjects.length}
            </strong>{" "}
            shown
          </span>
          <div className="flex items-center bg-[#F7F7F7] border border-[#E0E0E0] rounded-lg p-1 gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                viewMode === "grid" ? "bg-white shadow-xs text-[#171717]" : "text-[#A3A3A3]"
              }`}
              aria-label="Grid view"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                viewMode === "list" ? "bg-white shadow-xs text-[#171717]" : "text-[#A3A3A3]"
              }`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects Showcase Container */}
      {activeTab !== "Logo & Brand Marks" && (
        <section className="w-full max-w-[1168px]">
          {viewMode === "grid" ? (
            <div className="flex flex-col gap-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-[#E0E0E0]">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 group"
                >
                  <div className="flex flex-col gap-1">
                    <h3 className="font-notch font-medium text-xl text-[#171717] group-hover:text-[#E8342A] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#5C5C5C] font-light max-w-xl">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#A3A3A3] font-notch uppercase">
                      {project.category}
                    </span>
                    {project.linkUrl && (
                      <Link
                        href={project.linkUrl}
                        target="_blank"
                        className="p-2 rounded-lg bg-[#F7F7F7] border border-[#E0E0E0] text-[#171717] hover:bg-[#171717] hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Logo & Brand Identity Showcase Section */}
      {(activeTab === "Logo & Brand Marks" || activeTab === "All") && (
        <LogoShowcase />
      )}

      {/* Process Section */}
      <section className="w-full max-w-[1168px] flex flex-col gap-8 pt-8 border-t border-[#E0E0E0]">
        <div className="flex flex-col items-start gap-1">
          <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
            HOW I WORK
          </span>
          <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
            The process, <span className="text-[#5C5C5C]">in brief.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Understand & Map",
              desc: "Deep dive into real user needs, business goals, and edge cases before drawing any pixels.",
            },
            {
              step: "02",
              title: "Wireframe & Test",
              desc: "Rapid prototyping and low-fidelity iterations to validate navigation clarity and user flows.",
            },
            {
              step: "03",
              title: "Craft & Polish",
              desc: "High-fidelity visual design, micro-interactions, clean design systems, and typography perfection.",
            },
            {
              step: "04",
              title: "Ship & Iterate",
              desc: "Collaboration with engineers to build responsive, accessible, and high-performance products.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[#F7F7F7] border border-[#E0E0E0] flex flex-col gap-3"
            >
              <span className="font-notch font-bold text-2xl text-[#E8342A]">
                {item.step}
              </span>
              <h3 className="font-notch font-medium text-base text-[#171717]">
                {item.title}
              </h3>
              <p className="text-xs text-[#5C5C5C] font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
