"use client";

import { motion } from "framer-motion";

export interface AwardItem {
  name: string;
  subtitle: string;
  year: string;
}

const awardsData: AwardItem[] = [
  {
    name: "Awwwards Young Jury",
    subtitle: "Jury Member",
    year: "2025 - 2026",
  },
  {
    name: "USTAR Award",
    subtitle: "Best Performer",
    year: "2026",
  },
  {
    name: "Awwwards Honors",
    subtitle: "Honorable Mention",
    year: "2025",
  },
  {
    name: "Config APAC Attendee",
    subtitle: "Figma Singapore",
    year: "2024",
  },
  {
    name: "Huddle Designers Award",
    subtitle: "Top 13 Designer",
    year: "2023",
  },
];

export default function AwardShelf() {
  return (
    <section className="w-full max-w-[1168px] flex flex-col gap-10 py-8">
      {/* Section Header */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-xs uppercase tracking-widest text-[#A3A3A3] font-medium">
          RECOGNITION
        </span>
        <h2 className="font-notch font-normal text-2xl md:text-3xl text-[#171717]">
          A shelf <span className="text-[#5C5C5C]">of awards.</span>
        </h2>
      </div>

      {/* Awards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 items-center justify-items-center">
        {awardsData.map((award, i) => (
          <motion.div
            key={award.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex flex-col items-center gap-3 text-center group cursor-default"
          >
            {/* Laurel Wreath Icon Frame */}
            <div className="relative w-28 h-24 flex items-center justify-center text-[#171717] group-hover:text-[#E8342A] transition-colors duration-300">
              <svg
                viewBox="0 0 100 80"
                className="w-full h-full fill-none stroke-current"
                strokeWidth="2"
              >
                {/* Wreath Left Arc */}
                <path d="M 20,60 C 10,40 15,20 40,15 C 30,25 25,45 35,60" />
                <path d="M 15,45 C 5,35 10,25 25,20" />
                <path d="M 22,30 C 12,20 20,10 35,12" />
                {/* Wreath Right Arc */}
                <path d="M 80,60 C 90,40 85,20 60,15 C 70,25 75,45 65,60" />
                <path d="M 85,45 C 95,35 90,25 75,20" />
                <path d="M 78,30 C 88,20 80,10 65,12" />
              </svg>
              <span className="absolute font-notch font-bold text-lg tracking-tighter text-[#171717]">
                W.
              </span>
            </div>

            {/* Award Info */}
            <div className="flex flex-col items-center gap-0.5">
              <h3 className="font-notch font-medium text-sm text-[#171717] leading-snug">
                {award.name}
              </h3>
              <span className="text-xs text-[#5C5C5C] font-light">
                {award.subtitle} ({award.year})
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
