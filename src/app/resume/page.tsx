"use client";

import { Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
  const handleDownload = () => {
    // In production, trigger PDF download
    alert("Downloading Saravana's Official Resume PDF...");
  };

  return (
    <div className="w-full flex flex-col items-center gap-12 md:gap-16 pt-28 md:pt-36 pb-16 px-4 md:px-8">
      {/* Hero Header */}
      <section className="w-full max-w-[1168px] flex flex-col items-center gap-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#5C5C5C]"
        >
          <span className="text-[#E8342A]">✦</span>
          <span>RESUME</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-notch font-medium text-4xl sm:text-6xl md:text-7xl text-[#171717] tracking-tight"
        >
          sure, let&apos;s keep it <span className="text-[#5C5C5C]">formal.</span>
        </motion.h1>

        <p className="text-xs sm:text-sm text-[#5C5C5C] font-light max-w-md">
          For recruiters, hiring managers, and anyone who prefers the short version.
        </p>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#333333] transition-all cursor-pointer shadow-md hover:shadow-lg"
        >
          <span>Download</span>
          <Download className="w-4 h-4" />
        </button>
      </section>

      {/* Styled Printable Paper Resume Document */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-[840px] bg-white border border-[#E0E0E0] rounded-2xl md:rounded-[24px] p-6 sm:p-10 md:p-14 shadow-xl flex flex-col gap-8 text-[#171717]"
      >
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E0E0E0] pb-6">
          <div className="flex flex-col">
            <h2 className="font-notch font-bold text-2xl sm:text-3xl tracking-tight text-[#171717]">
              SARAVANA S
            </h2>
            <p className="text-xs text-[#E8342A] font-semibold pt-0.5">
              Product Designer • AI &amp; DS Student • Full-Stack Developer
            </p>
            <div className="flex items-center gap-3 text-xs text-[#5C5C5C] pt-1">
              <a
                href="https://www.linkedin.com/in/saravana-selvaraju/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E8342A] transition-colors"
              >
                linkedin.com/in/saravana-selvaraju
              </a>
              <span>•</span>
              <a
                href="https://github.com/Saravanaofficialpmv"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#E8342A] transition-colors"
              >
                github.com/Saravanaofficialpmv
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:items-end text-xs text-[#5C5C5C] font-mono">
            <span>WhatsApp: +91 90804 07021</span>
            <a
              href="mailto:saravanapmvofficial@gmail.com"
              className="hover:text-[#E8342A] transition-colors"
            >
              saravanapmvofficial@gmail.com
            </a>
            <span>Tamil Nadu, India</span>
          </div>
        </div>

        {/* 1. Education */}
        <div className="flex flex-col gap-3">
          <h3 className="font-notch font-bold text-xs uppercase tracking-widest text-[#A3A3A3]">
            EDUCATION
          </h3>
          <div className="flex flex-col gap-1 border-b border-[#E0E0E0]/60 pb-4">
            <div className="flex items-center justify-between font-notch">
              <span className="font-bold text-sm text-[#171717]">
                B.TECH – ARTIFICIAL INTELLIGENCE &amp; DATA SCIENCE
              </span>
              <span className="text-xs text-[#5C5C5C]">Graduation: 2027</span>
            </div>
            <p className="text-xs text-[#5C5C5C] font-light">
              VSB Engineering College, Karur, Tamil Nadu
            </p>
          </div>
        </div>

        {/* 2. Key Projects */}
        <div className="flex flex-col gap-3">
          <h3 className="font-notch font-bold text-xs uppercase tracking-widest text-[#A3A3A3]">
            KEY PROJECTS
          </h3>
          <div className="flex flex-col gap-4 border-b border-[#E0E0E0]/60 pb-4">
            <div>
              <div className="flex items-center justify-between font-notch">
                <span className="font-bold text-xs md:text-sm text-[#171717]">
                  SS WHOLESALE – Wholesale Mobile Ordering Platform
                </span>
                <span className="text-xs text-[#E8342A]">Flutter • Firebase</span>
              </div>
              <p className="text-xs text-[#5C5C5C] font-light pt-0.5">
                Wholesale ordering platform featuring real-time inventory management, customer tracking, order management, offline data synchronization, and Firebase backend integration.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between font-notch">
                <span className="font-bold text-xs md:text-sm text-[#171717]">
                  AQUAWIND – IoT Smart Water Management System
                </span>
                <span className="text-xs text-[#E8342A]">IoT • ESP32 • Cloud</span>
              </div>
              <p className="text-xs text-[#5C5C5C] font-light pt-0.5">
                Smart water monitoring and distribution platform powered by IoT sensors, ESP32 microcontrollers, and cloud services for real-time water optimization.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between font-notch">
                <span className="font-bold text-xs md:text-sm text-[#171717]">
                  INKA – Freelancer Billing & Invoicing Mobile App
                </span>
                <span className="text-xs text-[#E8342A]">Flutter • Mobile • Billing</span>
              </div>
              <p className="text-xs text-[#5C5C5C] font-light pt-0.5">
                Mobile billing and invoicing platform for freelancers featuring revenue tracking dashboards, client management, and instant digital invoice generation.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Tech Stack & Capabilities */}
        <div className="flex flex-col gap-3 border-b border-[#E0E0E0]/60 pb-4">
          <h3 className="font-notch font-bold text-xs uppercase tracking-widest text-[#A3A3A3]">
            TECHNOLOGIES &amp; TOOLS
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-bold text-[#171717]">Design &amp; Frontend:</span>
              <p className="text-[#5C5C5C] font-light">Figma, Photoshop, HTML, CSS, JavaScript, React, Tailwind CSS</p>
            </div>
            <div>
              <span className="font-bold text-[#171717]">Mobile &amp; Backend:</span>
              <p className="text-[#5C5C5C] font-light">Flutter, Dart, Python, FastAPI, Firebase, Supabase</p>
            </div>
            <div>
              <span className="font-bold text-[#171717]">Databases &amp; Cloud:</span>
              <p className="text-[#5C5C5C] font-light">Firestore, MySQL, MongoDB, Vercel, Render, Firebase Hosting</p>
            </div>
            <div>
              <span className="font-bold text-[#171717]">Tools &amp; Workflow:</span>
              <p className="text-[#5C5C5C] font-light">Git, GitHub, Postman, IoT Workflows, System Design</p>
            </div>
          </div>
        </div>

        {/* 4. Quick Facts & Languages */}
        <div className="flex flex-col gap-3">
          <h3 className="font-notch font-bold text-xs uppercase tracking-widest text-[#A3A3A3]">
            QUICK FACTS &amp; LANGUAGES
          </h3>
          <div className="flex flex-col gap-2 text-xs text-[#5C5C5C] font-light">
            <p>• Languages spoken: <strong>English, Tamil</strong></p>
            <p>• Passionate about bridging UI/UX design with scalable full-stack &amp; AI development</p>
            <p>• Enjoys solving real-world challenges through mobile, cloud, and IoT technologies</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
