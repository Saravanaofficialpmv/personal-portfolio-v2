"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Lock, Maximize2, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  imageUrl: string;
  modalImageUrl?: string;
  secondaryImageUrl?: string;
  primaryImageTitle?: string;
  secondaryImageTitle?: string;
  primaryUrl?: string;
  secondaryUrl?: string;
  linkText?: string;
  linkUrl?: string;
  gradientBg?: string;
  featured?: boolean;
  isLongImage?: boolean;
  isPreviewModal?: boolean;
  imageFit?: "cover" | "contain";
  imageBg?: string;
}

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const primaryImg = project.modalImageUrl || project.imageUrl;
  const [activeImg, setActiveImg] = useState<string>(primaryImg);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setActiveImg(project.modalImageUrl || project.imageUrl);
    }
  }, [isModalOpen, project.modalImageUrl, project.imageUrl]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const defaultGradient =
    "linear-gradient(173deg, rgb(238, 247, 255) 10%, rgb(230, 244, 255) 90%)";

  const isModalAction = project.isPreviewModal || (!project.linkUrl && project.isLongImage);

  const getDisplayUrl = () => {
    if (activeImg === project.secondaryImageUrl && project.secondaryUrl) {
      return project.secondaryUrl.replace(/^https?:\/\//, "");
    }
    if (
      (activeImg === project.modalImageUrl || activeImg === project.imageUrl) &&
      project.primaryUrl
    ) {
      return project.primaryUrl.replace(/^https?:\/\//, "");
    }
    if (project.linkUrl) {
      return project.linkUrl.replace(/^https?:\/\//, "");
    }
    return "awenests.com";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="group w-full rounded-2xl md:rounded-[24px] overflow-hidden p-6 md:p-10 transition-all duration-300 hover:shadow-lg"
        style={{
          background: project.gradientBg || defaultGradient,
        }}
      >
        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
          {/* Project Content Column */}
          <div className="flex-1 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              {/* Tags Row */}
              <div className="flex items-center gap-2 flex-wrap">
                {project.tags.map((tag, idx) => (
                  <div key={tag} className="flex items-center gap-2">
                    <span className="font-notch text-xs text-[#5C5C5C] font-normal">
                      {tag}
                    </span>
                    {idx < project.tags.length - 1 && (
                      <span className="text-[#E8342A] text-xs">✦</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-notch font-medium text-2xl md:text-4xl text-[#171717]">
                {project.title}
                <span className="text-[#E8342A]">.</span>
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-[#5C5C5C] font-light leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            {/* Action Link / Preview Button */}
            <div>
              {isModalAction ? (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#333333] transition-all duration-200 cursor-pointer shadow-sm"
                >
                  <span>{project.linkText || "Preview the UI"}</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              ) : (
                project.linkUrl && (
                  <Link
                    href={project.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#333333] transition-all duration-200"
                  >
                    <span>{project.linkText || "Visit Website"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Project Image Panel */}
          {project.isLongImage ? (
            <div className="w-full md:w-[460px] lg:w-[500px] shrink-0 flex flex-col rounded-xl md:rounded-2xl overflow-hidden border border-[#171717]/10 bg-white shadow-md">
              {/* Browser Bar Header */}
              <div className="w-full bg-[#EAEAEA] border-b border-[#D6D6D6] px-3 py-2 flex items-center justify-between gap-2 shrink-0 select-none">
                {/* Window Controls */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                </div>

                {/* URL Pill */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-[#D0D0D0] text-[11px] text-[#5C5C5C] font-mono truncate max-w-[120px] md:max-w-[200px]">
                  <Lock className="w-2.5 h-2.5 text-[#27C93F] shrink-0" />
                  <span className="truncate">
                    {getDisplayUrl()}
                  </span>
                </div>

                {/* Switcher Tabs & Fullscreen Button */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.secondaryImageUrl ? (
                    <div className="flex items-center gap-0.5 sm:gap-1 bg-[#DEDEDE] p-0.5 rounded-md text-[10px] font-medium text-[#444]">
                      <button
                        type="button"
                        onClick={() => setActiveImg(project.modalImageUrl || project.imageUrl)}
                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                          activeImg === (project.modalImageUrl || project.imageUrl)
                            ? "bg-white text-[#171717] shadow-xs font-semibold"
                            : "hover:text-[#000]"
                        }`}
                      >
                        {project.primaryImageTitle || "Homepage"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveImg(project.secondaryImageUrl!)}
                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                          activeImg === project.secondaryImageUrl
                            ? "bg-white text-[#171717] shadow-xs font-semibold"
                            : "hover:text-[#000]"
                        }`}
                      >
                        {project.secondaryImageTitle || "Product Page"}
                      </button>
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="p-1 rounded-md hover:bg-[#D0D0D0] text-[#5C5C5C] hover:text-[#171717] transition-colors cursor-pointer"
                    title="Open Full Screen Preview"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Browser Canvas */}
              <div className="relative w-full h-[320px] sm:h-[360px] md:h-[380px] overflow-y-auto overflow-x-hidden bg-white group/canvas">
                {/* Long Form Image */}
                <img
                  src={activeImg}
                  alt={project.title}
                  className="w-full h-auto block object-top transition-transform duration-[14s] ease-in-out group-hover/canvas:-translate-y-[calc(100%-320px)] sm:group-hover/canvas:-translate-y-[calc(100%-360px)] md:group-hover/canvas:-translate-y-[calc(100%-380px)]"
                />

                {/* Floating Badges Container */}
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 select-none">
                  <span className="pointer-events-none inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#171717]/85 backdrop-blur-md text-white text-[10px] font-medium tracking-wide shadow-md transition-opacity duration-300 group-hover/canvas:opacity-40">
                    <span>Scroll to view</span>
                    <span className="animate-bounce">↓</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#171717] hover:bg-[#E8342A] text-white text-[10px] font-medium tracking-wide shadow-md transition-all cursor-pointer"
                    title="Enlarge Full Screen"
                  >
                    <span>Full Screen</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`w-full md:w-[460px] lg:w-[480px] aspect-[3/2] relative rounded-xl md:rounded-2xl overflow-hidden shrink-0 shadow-md ${
                isModalAction ? "cursor-pointer group/img" : ""
              }`}
              onClick={() => {
                if (isModalAction) setIsModalOpen(true);
              }}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {isModalAction && (
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717]/90 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                    <span>Preview UI</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Full-Screen UI Preview Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl h-[92vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Browser Bar Header */}
              <div className="w-full bg-[#EAEAEA] border-b border-[#D6D6D6] px-4 py-3 flex items-center justify-between gap-3 shrink-0 select-none">
                {/* Left: Window Controls & Domain */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-[#D0D0D0] text-xs text-[#5C5C5C] font-mono">
                    <Lock className="w-3 h-3 text-[#27C93F] shrink-0" />
                    <span>{getDisplayUrl()}</span>
                  </div>
                  <span className="hidden md:inline-block text-xs font-semibold text-[#171717] font-notch">
                    {project.title} — Full UI Preview
                  </span>
                </div>

                {/* Middle: Tab Switcher */}
                {project.secondaryImageUrl && (
                  <div className="flex items-center gap-1 bg-[#DEDEDE] p-1 rounded-lg text-xs font-medium text-[#444]">
                    <button
                      type="button"
                      onClick={() => setActiveImg(project.modalImageUrl || project.imageUrl)}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        activeImg === (project.modalImageUrl || project.imageUrl)
                          ? "bg-white text-[#171717] shadow-sm font-semibold"
                          : "hover:text-[#000]"
                      }`}
                    >
                      {project.primaryImageTitle || "Homepage"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveImg(project.secondaryImageUrl!)}
                      className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                        activeImg === project.secondaryImageUrl
                          ? "bg-white text-[#171717] shadow-sm font-semibold"
                          : "hover:text-[#000]"
                      }`}
                    >
                      {project.secondaryImageTitle || "Product Page"}
                    </button>
                  </div>
                )}

                {/* Right: Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-[#D0D0D0] text-[#171717] hover:bg-[#E8342A] hover:text-white hover:border-[#E8342A] transition-all cursor-pointer flex items-center gap-1 text-xs font-medium"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>

              {/* Modal Canvas: Full Scrollable Website View */}
              <div className="w-full flex-1 overflow-y-auto bg-[#F2F2F2] flex justify-center p-4 sm:p-8 group/modalcanvas">
                <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden border border-[#E0E0E0]">
                  <img
                    src={activeImg}
                    alt={`${project.title} Full Preview`}
                    className="w-full h-auto block object-top transition-transform duration-[22s] ease-in-out group-hover/modalcanvas:-translate-y-[calc(100%-600px)]"
                  />

                  {/* Floating Scroll Hint Badge */}
                  <div className="pointer-events-none sticky bottom-4 right-4 float-right mr-4 mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#171717]/85 backdrop-blur-md text-white text-xs font-medium tracking-wide shadow-lg transition-opacity duration-300 group-hover/modalcanvas:opacity-40">
                    <span>Hover to auto-scroll or use wheel</span>
                    <span className="animate-bounce">↓</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
