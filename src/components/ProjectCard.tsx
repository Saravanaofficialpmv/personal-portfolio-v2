"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  imageUrl: string;
  linkText?: string;
  linkUrl?: string;
  gradientBg?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: ProjectData;
  index?: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const defaultGradient =
    "linear-gradient(173deg, rgb(238, 247, 255) 10%, rgb(230, 244, 255) 90%)";

  return (
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

          {/* Action Link */}
          {project.linkUrl && (
            <div>
              <Link
                href={project.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#333333] transition-all duration-200"
              >
                <span>{project.linkText || "Visit Website"}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        {/* Project Image Panel */}
        <div className="w-full md:w-[460px] h-64 sm:h-72 md:h-[320px] relative rounded-xl md:rounded-2xl overflow-hidden shrink-0">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>
    </motion.div>
  );
}
