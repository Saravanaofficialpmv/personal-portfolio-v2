"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, Code, Cpu, Layers } from "lucide-react";

export default function AboutBentoGrid() {
  return (
    <section className="w-full max-w-[1168px] my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: WHAT YOU GET */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group relative bg-[#0D0E12] border border-[#1F222C] hover:border-[#343847] rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 min-h-[360px]"
        >
          <div className="flex flex-col gap-2 z-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E95A5] font-semibold">
              WHAT YOU GET
            </span>
            <h3 className="font-serif font-normal text-xl md:text-2xl text-white leading-snug tracking-tight">
              Clean code, pixel-perfect UI, deployed &amp; scaling
            </h3>
          </div>

          {/* Visual: Open Box + Floating Update Pill */}
          <div className="relative w-full h-44 mt-6 flex flex-col items-center justify-end">
            {/* Floating Status Pill */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="z-20 bg-[#161820]/90 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl max-w-[95%]"
            >
              <div className="w-7 h-7 rounded-full bg-[#222634] flex items-center justify-center shrink-0">
                <MessageSquare className="w-3.5 h-3.5 text-[#E8342A]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-semibold text-white">Clear Updates</span>
                <span className="text-[11px] text-[#A0A7B8] truncate max-w-[170px]">
                  Async demos, no status meeting...
                </span>
              </div>
            </motion.div>

            {/* 3D Box Vector Artwork */}
            <div className="relative w-full h-32 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
              <svg viewBox="0 0 200 120" className="w-48 h-28 text-[#282C3A] fill-current">
                {/* Box Back */}
                <polygon points="40,40 160,40 160,100 40,100" fill="#14161F" stroke="#2D3244" strokeWidth="1.5" />
                {/* Top Flap Left */}
                <polygon points="40,40 10,15 80,15 95,40" fill="#1C1F2C" stroke="#373D52" strokeWidth="1.5" />
                {/* Top Flap Right */}
                <polygon points="160,40 190,15 120,15 105,40" fill="#1A1D2A" stroke="#373D52" strokeWidth="1.5" />
                {/* Front Panel */}
                <polygon points="40,40 160,40 160,110 40,110" fill="#0F1017" stroke="#2F3446" strokeWidth="1.5" />
                {/* Inner Glow Shadow */}
                <ellipse cx="100" cy="40" rx="45" ry="12" fill="#E8342A" fillOpacity="0.08" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Card 2: FLEXIBLE WITH TIMEZONES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="group relative bg-[#0D0E12] border border-[#1F222C] hover:border-[#343847] rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 min-h-[360px]"
        >
          <div className="flex flex-col gap-2 z-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E95A5] font-semibold">
              FLEXIBLE WITH TIMEZONES
            </span>
            <h3 className="font-serif font-normal text-xl md:text-2xl text-white leading-snug tracking-tight">
              Based in India, available globally
            </h3>
          </div>

          {/* Visual: Glowing Globe with Connected City Arcs */}
          <div className="relative w-full h-48 mt-4 flex items-center justify-center overflow-hidden">
            {/* Globe Sphere Background */}
            <div className="absolute top-6 w-64 h-64 rounded-full bg-radial from-[#1E2332] via-[#10121A] to-[#07080B] border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.05)]" />
            
            {/* Globe SVG Arc Connections */}
            <svg viewBox="0 0 300 180" className="relative z-10 w-full h-full">
              {/* Globe Dotted Matrix Grid */}
              <pattern id="globeDots" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#3B4256" opacity="0.6" />
              </pattern>
              <ellipse cx="150" cy="120" rx="110" ry="80" fill="url(#globeDots)" />

              {/* Arc Lines */}
              {/* New Delhi to London */}
              <path d="M 140 100 Q 100 40 70 50" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
              {/* New Delhi to Tokyo */}
              <path d="M 140 100 Q 190 50 230 70" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
              {/* New Delhi to Dubai */}
              <path d="M 140 100 Q 110 85 95 95" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.8" />

              {/* City Pins & Badges */}
              {/* London */}
              <g transform="translate(60, 40)">
                <rect x="0" y="0" width="52" height="18" rx="4" fill="#141722" stroke="#3B82F6" strokeWidth="0.8" />
                <text x="26" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">LONDON</text>
                <circle cx="26" cy="18" r="2" fill="#3B82F6" />
              </g>

              {/* Tokyo */}
              <g transform="translate(210, 60)">
                <rect x="0" y="0" width="46" height="18" rx="4" fill="#141722" stroke="#3B82F6" strokeWidth="0.8" />
                <text x="23" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">TOKYO</text>
                <circle cx="23" cy="18" r="2" fill="#3B82F6" />
              </g>

              {/* Dubai */}
              <g transform="translate(80, 85)">
                <rect x="0" y="0" width="44" height="18" rx="4" fill="#141722" stroke="#3B82F6" strokeWidth="0.8" />
                <text x="22" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">DUBAI</text>
                <circle cx="22" cy="18" r="2" fill="#3B82F6" />
              </g>

              {/* New Delhi (Home Hub) */}
              <g transform="translate(115, 92)">
                <rect x="0" y="0" width="62" height="18" rx="4" fill="#1A1418" stroke="#E8342A" strokeWidth="1" />
                <text x="31" y="12" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">NEW DELHI</text>
                {/* Pulsing Home Pin */}
                <circle cx="31" cy="18" r="4" fill="#E8342A" />
                <circle cx="31" cy="18" r="7" fill="#E8342A" opacity="0.4" className="animate-ping" />
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Card 3: USES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group relative bg-[#0D0E12] border border-[#1F222C] hover:border-[#343847] rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 min-h-[360px]"
        >
          {/* Top Visual: Floating App Tool Badges */}
          <div className="relative w-full h-40 flex items-center justify-center overflow-hidden">
            <div className="flex items-center gap-3">
              {/* App Icon 1: Claude / Sparkles */}
              <div className="w-16 h-16 rounded-2xl bg-[#171922] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                <Sparkles className="w-8 h-8 text-[#E87A5D]" />
              </div>

              {/* App Icon 2: Cursor / Code */}
              <div className="w-16 h-16 rounded-2xl bg-[#171922] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform delay-75">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* App Icon 3: Figma / Raycast */}
              <div className="w-16 h-16 rounded-2xl bg-[#171922] border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform delay-150">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EC4899] via-[#8B5CF6] to-[#3B82F6] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Overflow Fade Tile */}
              <div className="w-10 h-16 rounded-l-2xl bg-[#171922]/50 border-l border-t border-b border-white/5 flex items-center justify-center opacity-40 shrink-0">
                <Cpu className="w-5 h-5 text-white/50" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 z-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E95A5] font-semibold">
              USES
            </span>
            <h3 className="font-serif font-normal text-xl md:text-2xl text-white leading-snug tracking-tight">
              Check out my favorite tools
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
