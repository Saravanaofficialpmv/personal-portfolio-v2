"use client";

import { motion } from "framer-motion";
import { CheckSquare, Square, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

interface BucketItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
  link?: string;
}

interface BucketCategory {
  num: string;
  titlePrimary: string;
  titleSecondary: string;
  items: BucketItem[];
}

const bucketCategories: BucketCategory[] = [
  {
    num: "01",
    titlePrimary: "Build.",
    titleSecondary: "Ship & Share",
    items: [
      {
        id: "linkedin-followers",
        title: "Get 11,000+ organic LinkedIn followers",
        description:
          "Didn't chase followers. My open-source contributions and this portfolio site did the talking.",
        completed: true,
        date: "Apr 2026",
      },
      {
        id: "github-followers",
        title: "Get 300+ followers on GitHub",
        description:
          "Open-sourced tools I built for myself. Useful code finds its audience.",
        completed: true,
        date: "Mar 2026",
      },
      {
        id: "remote-job",
        title: "Get a remote job",
        description:
          "Full-time remote at a forward-thinking company. No commute, no office politics — just shipping code from wherever.",
        completed: true,
        date: "Jan 2025",
      },
      {
        id: "open-source",
        title: "First open-source contribution",
        description:
          "Contributed a feature to a popular open-source library. First PR merged, started driving traffic to my GitHub.",
        completed: true,
        date: "Dec 2024",
      },
      {
        id: "first-app",
        title: "Build my first application",
        description:
          "A notes app with localStorage. Terrible code, but when it worked without a page reload, something clicked.",
        completed: true,
        date: "Sep 2023",
      },
      {
        id: "technical-deep-dives",
        title: "Write 10 technical deep-dives",
        description:
          "Not SEO listicles. Real deep-dives on RSC internals, database indexing, building a bundler from scratch.",
        completed: false,
      },
      {
        id: "new-language",
        title: "Learn a new programming language",
        description:
          "Go, Rust, or Swift. Something that forces me to think differently about the problems I already know how to solve.",
        completed: false,
      },
      {
        id: "github-stars",
        title: "Hit 1K stars on a GitHub repo",
        description:
          "By building something so useful that a thousand strangers vouch for it.",
        completed: false,
      },
      {
        id: "earning-product",
        title: "Ship a product that earns on its own",
        description:
          "A SaaS, a tool, anything. Proof that I can create value independent of my time.",
        completed: false,
      },
    ],
  },
  {
    num: "02",
    titlePrimary: "Grind.",
    titleSecondary: "Inside Out",
    items: [
      {
        id: "portfolio-website",
        title: "Create portfolio website",
        description:
          "This site. Every pixel is intentional, every interaction earned its place. The project that ties everything else together.",
        completed: true,
        date: "Aug 2024",
        link: "/",
      },
      {
        id: "pure-vegetarian",
        title: "Go pure vegetarian",
        description:
          "No meat, no eggs. No exceptions, no 'just this once.' Years in and don't miss it.",
        completed: true,
        date: "2021",
      },
      {
        id: "health-reset",
        title: "Quit sugar, coffee, and packaged foods",
        description:
          "All at once. No cheat days. The hardest bugs to fix are the ones in your diet.",
        completed: true,
        date: "2019",
      },
      {
        id: "pushups-challenge",
        title: "100 pushups in 200 seconds",
        description:
          "No breaks, no excuses. Just chest to floor, 100 times, under 3 minutes 20 seconds.",
        completed: true,
        date: "2024",
      },
      {
        id: "run-10k",
        title: "Run a 10K under 60 minutes",
        description:
          "Currently can't run 3K without wanting to quit. Sub-60 is the goal. Finishing is the real goal.",
        completed: false,
      },
      {
        id: "read-books",
        title: "Read 50 non-fiction books",
        description:
          "Deepening perspective across psychology, system architecture, philosophy, and product engineering.",
        completed: false,
      },
    ],
  },
  {
    num: "03",
    titlePrimary: "Explore.",
    titleSecondary: "Wander & Discover",
    items: [
      {
        id: "home-office",
        title: "Build a dedicated home office & workspace",
        description:
          "Minimal setup with ambient lighting, ergonomic chair, dual monitors, and clean cable management.",
        completed: true,
        date: "Nov 2024",
      },
      {
        id: "cities-living",
        title: "Live in 3 different cities",
        description:
          "Experiencing distinct cultures, tech hubs, and lifestyles firsthand.",
        completed: false,
      },
      {
        id: "solo-travel",
        title: "Travel solo abroad",
        description:
          "Stepping out of comfort zones into unfamiliar terrain, culture, and perspectives.",
        completed: false,
      },
      {
        id: "tech-conference",
        title: "Attend a major global tech conference",
        description:
          "Connecting with global builders, founders, and engineers shaping the web.",
        completed: false,
      },
    ],
  },
  {
    num: "04",
    titlePrimary: "Experience.",
    titleSecondary: "Life & Beyond",
    items: [
      {
        id: "mentor-developers",
        title: "Mentor 10 aspiring developers",
        description:
          "Helping junior engineers navigate web development, portfolio building, and career growth.",
        completed: true,
        date: "2025",
      },
      {
        id: "tech-talk",
        title: "Give a tech talk or keynote",
        description:
          "Sharing lessons from building digital products, UI engineering, or scaling applications.",
        completed: false,
      },
      {
        id: "financial-independence",
        title: "Achieve financial independence",
        description:
          "Building freedom through high-impact work, products, and investments.",
        completed: false,
      },
    ],
  },
];

export default function BucketListPage() {
  const allItems = bucketCategories.flatMap((cat) => cat.items);
  const completedCount = allItems.filter((i) => i.completed).length;
  const totalCount = allItems.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="w-full bg-[#0A0A0C] text-white min-h-screen pt-28 md:pt-36 selection:bg-[#E8342A]/30 selection:text-white">
      {/* Container matching main layout grid */}
      <div className="w-full max-w-[1168px] mx-auto px-4 md:px-8 flex flex-col items-center gap-12 md:gap-16 pb-20">
        
        {/* Header Hero Section */}
        <div className="w-full flex flex-col items-center text-center gap-4 py-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A3A3A3] font-mono"
          >
            <span className="text-[#E8342A]">✦</span>
            <span>BUCKET LIST</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-notch text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          >
            <span>Checked &amp;</span>{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#FF3B83] via-[#FF5E62] to-[#FF9966] bg-clip-text text-transparent">
              Unchecked
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-[#A1A1AA] font-light max-w-xl pt-2 leading-relaxed"
          >
            A personal log of milestones, adventures, and lifetime goals — some completed, others in progress.
          </motion.p>

          {/* Progress Indicator Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 flex flex-col items-center gap-2 bg-[#141417] border border-white/10 rounded-2xl px-6 py-3 shadow-xl"
          >
            <div className="flex items-center gap-3 text-xs font-notch font-medium">
              <span className="text-[#A1A1AA]">Progress</span>
              <span className="text-[#E8342A] font-bold">
                {completedCount} of {totalCount} completed ({progressPercent}%)
              </span>
            </div>
            <div className="w-48 sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E8342A] to-[#FF6B6B] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </motion.div>
        </div>

        {/* Categories Sections Grid */}
        <div className="w-full flex flex-col gap-16 md:gap-24">
          {bucketCategories.map((category) => (
            <section
              key={category.num}
              className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start border-t border-white/[0.08] pt-8 md:pt-12"
            >
              {/* Left Column (Sticky Title Category) */}
              <div className="md:col-span-4 flex flex-col items-start md:sticky md:top-28">
                <span className="text-xs font-mono text-[#71717A] tracking-wider mb-2">
                  {category.num}
                </span>
                <h2 className="font-notch font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                  {category.titlePrimary}
                </h2>
                <h3 className="font-serif italic text-2xl sm:text-3xl text-[#71717A] font-normal leading-tight">
                  {category.titleSecondary}
                </h3>
              </div>

              {/* Right Column (Bucket Items List) */}
              <div className="md:col-span-8 flex flex-col divide-y divide-white/[0.08]">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="py-5 first:pt-0 last:pb-0 flex items-start gap-3.5 sm:gap-4 group"
                  >
                    {/* Checkbox Icon */}
                    <div className="shrink-0 pt-0.5 select-none">
                      {item.completed ? (
                        <div className="w-5 h-5 rounded bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-xs group-hover:border-[#E8342A]/60 group-hover:text-[#E8342A] transition-colors">
                          <CheckSquare className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded border border-white/20 bg-transparent flex items-center justify-center group-hover:border-white/40 transition-colors">
                          <Square className="w-3.5 h-3.5 text-transparent" />
                        </div>
                      )}
                    </div>

                    {/* Content Block */}
                    <div className="flex flex-col flex-1 gap-1">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        {/* Title */}
                        <div className="flex items-center gap-1.5">
                          {item.link ? (
                            <Link
                              href={item.link}
                              className={`font-notch text-base sm:text-lg font-medium transition-colors flex items-center gap-1 hover:underline ${
                                item.completed
                                  ? "text-white hover:text-[#E8342A]"
                                  : "text-[#A1A1AA] hover:text-white"
                              }`}
                            >
                              <span>{item.title}</span>
                              <ArrowUpRight className="w-4 h-4 opacity-70" />
                            </Link>
                          ) : (
                            <h4
                              className={`font-notch text-base sm:text-lg font-medium transition-colors ${
                                item.completed
                                  ? "text-white group-hover:text-[#E8342A]"
                                  : "text-[#A1A1AA] group-hover:text-white"
                              }`}
                            >
                              {item.title}
                            </h4>
                          )}
                        </div>

                        {/* Completion Date Badge */}
                        {item.completed && item.date && (
                          <span className="bg-white/[0.06] border border-white/10 text-neutral-400 text-xs px-3 py-0.5 rounded-full font-mono whitespace-nowrap shadow-xs">
                            {item.date}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                          item.completed ? "text-[#A1A1AA]" : "text-[#71717A]"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
