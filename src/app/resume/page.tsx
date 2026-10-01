"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
  return (
    <div className="w-full flex flex-col items-center gap-10 md:gap-14 pt-28 md:pt-36 pb-20 px-4 sm:px-6 md:px-8 bg-[#FAFAFA] text-[#171717] print:p-0 print:gap-0 print:bg-white">
      {/* Top Hero Controls (Hidden on Print) */}
      <section className="w-full max-w-[820px] flex flex-col items-center gap-6 text-center no-print">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5C5C5C]"
        >
          <span className="text-[#E8342A]">✦</span>
          <span>RESUME</span>
        </motion.div>

        <div className="flex flex-col items-center gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-notch font-bold text-4xl sm:text-6xl md:text-7xl text-[#171717] tracking-tight leading-[1.15]"
          >
            sure, let’s keep it <span className="text-[#5C5C5C]">formal<span className="text-[#E8342A]">.</span></span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#5C5C5C] font-normal max-w-md leading-relaxed"
          >
            For recruiters, hiring managers, and anyone who prefers the short version.
          </motion.p>
        </div>

        {/* Action Button: DOWNLOAD RESUME */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <a
            href="/saravana-resume.pdf"
            download="Saravana_S_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#E8342A] transition-all cursor-pointer shadow-sm hover:shadow-md active:scale-95"
          >
            <span>DOWNLOAD RESUME</span>
            <ArrowDown className="w-4 h-4 text-white" />
          </a>
        </motion.div>
      </section>

      {/* ==================================================
          A4 SINGLE PAGE RESUME
          ================================================== */}
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-full max-w-[820px] flex items-center justify-between text-[11px] text-neutral-500 px-2 no-print">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            <span className="font-semibold text-neutral-900">A4 RESUME PREVIEW</span>
          </div>
          <span className="text-neutral-500 font-medium">READY TO DOWNLOAD</span>
        </div>

        <div className="a4-page w-full max-w-[820px] bg-white border border-neutral-200 rounded-2xl md:rounded-[20px] p-6 sm:p-7 md:p-8 shadow-xl flex flex-col justify-between text-neutral-900 font-sans">
          {/* Main Top Content */}
          <div className="flex flex-col gap-2.5">
            {/* 1. DOCUMENT HEADER */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-200 pb-3">
              <div className="flex flex-col gap-0.5">
                <h2 className="font-sans font-bold text-2xl sm:text-[26px] text-neutral-900 tracking-tight leading-tight">
                  SARAVANA S
                </h2>
                <p className="text-xs text-neutral-700 font-medium">
                  Product Designer • Full-Stack Developer • AI &amp; Data Science
                </p>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-600 pt-0.5">
                  <a
                    href="https://linkedin.com/in/saravana-selvaraju"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    linkedin.com/in/saravana-selvaraju
                  </a>
                  <span>•</span>
                  <a
                    href="https://github.com/Saravanaofficialpmv"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-900 transition-colors"
                  >
                    github.com/Saravanaofficialpmv
                  </a>
                  <span>•</span>
                  <a
                    href="https://saroo.online"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-900 transition-colors font-medium text-neutral-900"
                  >
                    saroo.online
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:items-end text-[11px] text-neutral-600 leading-tight gap-0.5">
                <span>+91 90804 07021</span>
                <a
                  href="mailto:saravanapmvofficial@gmail.com"
                  className="hover:text-neutral-900 transition-colors"
                >
                  saravanapmvofficial@gmail.com
                </a>
                <span>Tamil Nadu, India</span>
              </div>
            </div>

            {/* 2. PROFESSIONAL SUMMARY */}
            <div className="flex flex-col gap-1 border-b border-neutral-200 pb-2.5">
              <h3 className="font-sans font-bold text-[11px] uppercase tracking-wider text-neutral-900">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="text-[11px] text-neutral-700 font-normal leading-relaxed">
                Product-focused Artificial Intelligence &amp; Data Science student and full-stack developer building digital products across web, mobile, e-commerce, branding, and interactive experiences. Combines product thinking, UI/UX design, and modern technologies to turn ideas into practical, scalable solutions.
              </p>
            </div>

            {/* 3. WORK EXPERIENCE */}
            <div className="flex flex-col gap-2 border-b border-neutral-200 pb-2.5">
              <h3 className="font-sans font-bold text-[11px] uppercase tracking-wider text-neutral-900">
                WORK EXPERIENCE
              </h3>

              {/* Job 01: heydotin */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[12px] text-neutral-900">
                    FOUNDER &amp; APP DEVELOPER — heydotin
                  </span>
                  <span className="text-[11px] text-neutral-600 font-medium">
                    2024 — Present
                  </span>
                </div>
                <ul className="flex flex-col gap-0.5 text-[10.5px] text-neutral-700 leading-snug pl-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-neutral-400 select-none">•</span>
                    <span>Lead digital product development across web applications, mobile products, UI/UX, e-commerce experiences, branding, and interactive digital experiences.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-neutral-400 select-none">•</span>
                    <span>Work across product ideation, interface design, application development, backend integration, deployment, and production workflows.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-neutral-400 select-none">•</span>
                    <span>Build practical digital products using modern mobile, web, cloud, and automation technologies.</span>
                  </li>
                </ul>
              </div>

              {/* Job 02: Freelance */}
              <div className="flex flex-col gap-1 pt-1.5 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[12px] text-neutral-900">
                    FREELANCE SHOPIFY WEB DESIGNER — Self-Employed
                  </span>
                  <span className="text-[11px] text-neutral-600 font-medium">
                    2022 — 2024
                  </span>
                </div>
                <ul className="flex flex-col gap-0.5 text-[10.5px] text-neutral-700 leading-snug pl-0.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-neutral-400 select-none">•</span>
                    <span>Designed and developed custom Shopify e-commerce experiences for client brands.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-neutral-400 select-none">•</span>
                    <span>Customized Shopify themes, product pages, responsive layouts, navigation, and storefront experiences.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-neutral-400 select-none">•</span>
                    <span>Combined UI/UX design, branding, and e-commerce development to create polished customer-facing experiences.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4. SELECTED WORK */}
            <div className="flex flex-col gap-2 border-b border-neutral-200 pb-2.5">
              <div className="flex items-center justify-between">
                <h3 className="font-sans font-bold text-[11px] uppercase tracking-wider text-neutral-900">
                  SELECTED WORK
                </h3>
                <span className="text-[10px] text-neutral-500 font-medium">4 FEATURED PROJECTS</span>
              </div>

              {/* Project 01: UNISPHERE */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-neutral-700">01</span>
                    <span className="font-bold text-[12px] text-neutral-900">
                      UNISPHERE – Academic Collaboration Platform
                    </span>
                  </div>
                  <span className="text-[10.5px] text-neutral-600 font-medium">
                    Mobile App • Flutter • Cloud Integration
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-700 font-normal leading-tight">
                  Mobile application and academic collaboration platform designed to bring academic activities, collaboration, and smart digital features into a unified experience.
                </p>
              </div>

              {/* Project 02: INKA */}
              <div className="flex flex-col gap-0.5 pt-1.5 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-neutral-700">02</span>
                    <span className="font-bold text-[12px] text-neutral-900">
                      INKA – Freelancer Billing &amp; Revenue Tracking App
                    </span>
                  </div>
                  <span className="text-[10.5px] text-neutral-600 font-medium">
                    Mobile App • Flutter • Billing &amp; Invoicing
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-700 font-normal leading-tight">
                  Freelance billing and revenue tracking application featuring client management, instant invoice creation, and financial dashboard analytics.
                </p>
              </div>

              {/* Project 03: INTERWOVE */}
              <div className="flex flex-col gap-0.5 pt-1.5 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-neutral-700">03</span>
                    <span className="font-bold text-[12px] text-neutral-900">
                      INTERWOVE – Luxury E-commerce Store
                    </span>
                  </div>
                  <span className="text-[10.5px] text-neutral-600 font-medium">
                    Web Development • E-commerce • Branding • UI/UX
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-700 font-normal leading-tight">
                  Premium luxury apparel e-commerce experience combining refined product presentation, responsive design, custom storefront development, and brand-focused UI/UX.
                </p>
              </div>

              {/* Project 04: SS WHOLESALE */}
              <div className="flex flex-col gap-0.5 pt-1.5 border-t border-neutral-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-neutral-700">04</span>
                    <span className="font-bold text-[12px] text-neutral-900">
                      SS WHOLESALE – Wholesale Mobile Ordering Platform
                    </span>
                  </div>
                  <span className="text-[10.5px] text-neutral-600 font-medium">
                    Mobile App • Flutter • Firebase • Business Platform
                  </span>
                </div>
                <p className="text-[10.5px] text-neutral-700 font-normal leading-tight">
                  Wholesale ordering platform featuring product, customer, and order management with real-time inventory and offline synchronization.
                </p>
              </div>
            </div>

            {/* 5. EDUCATION */}
            <div className="flex flex-col gap-1 border-b border-neutral-200 pb-2.5">
              <h3 className="font-sans font-bold text-[11px] uppercase tracking-wider text-neutral-900">
                EDUCATION
              </h3>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[12px] text-neutral-900">
                    B.TECH — ARTIFICIAL INTELLIGENCE &amp; DATA SCIENCE
                  </span>
                  <span className="text-[11px] text-neutral-600 font-medium">
                    2023 — 2027
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-neutral-600">
                  <span>VSB Engineering College</span>
                  <span>Karur, Tamil Nadu</span>
                </div>
              </div>
            </div>

            {/* 6. TECHNICAL SKILLS */}
            <div className="flex flex-col gap-1 border-b border-neutral-200 pb-2.5">
              <h3 className="font-sans font-bold text-[11px] uppercase tracking-wider text-neutral-900">
                TECHNICAL SKILLS
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[10.5px] leading-snug">
                <div>
                  <span className="font-bold text-neutral-900">FRONTEND &amp; WEB: </span>
                  <span className="text-neutral-700 font-normal">React, Next.js</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">MOBILE: </span>
                  <span className="text-neutral-700 font-normal">Flutter, Dart</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">BACKEND &amp; CLOUD: </span>
                  <span className="text-neutral-700 font-normal">FastAPI, Firebase, Supabase, Firestore</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">DESIGN: </span>
                  <span className="text-neutral-700 font-normal">Figma, Canva, UI/UX Design, Product Design</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">E-COMMERCE: </span>
                  <span className="text-neutral-700 font-normal">Shopify, Theme Customization</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">TOOLS: </span>
                  <span className="text-neutral-700 font-normal">n8n</span>
                </div>
              </div>
            </div>

            {/* 7. LANGUAGES */}
            <div className="flex flex-col gap-1">
              <h3 className="font-sans font-bold text-[11px] uppercase tracking-wider text-neutral-900">
                LANGUAGES
              </h3>
              <div className="flex items-center gap-6 text-[10.5px] text-neutral-700 pt-0.5">
                <div>
                  <span className="font-bold text-neutral-900">ENGLISH: </span>
                  <span className="font-normal text-neutral-700">Professional Working Proficiency</span>
                </div>
                <div>
                  <span className="font-bold text-neutral-900">TAMIL: </span>
                  <span className="font-normal text-neutral-700">Native / Bilingual</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Footer */}
          <div className="pt-2.5 border-t border-neutral-200 flex items-center justify-between text-[10px] text-neutral-500 mt-2">
            <span className="font-medium text-neutral-800">SARAVANA S</span>
            <span>Portfolio: saroo.online</span>
          </div>
        </div>
      </div>
    </div>
  );
}
