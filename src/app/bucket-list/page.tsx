"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square, ArrowUpRight } from "lucide-react";
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
  id: string;
  num: string;
  titlePrimary: string;
  titleSecondary: string;
  items: BucketItem[];
}

interface BucketSection {
  id: string;
  num: string;
  badge: string;
  title: string;
  description: string;
  categories: BucketCategory[];
}

const bucketSections: BucketSection[] = [
  {
    id: "professional",
    num: "01",
    badge: "PROFESSIONAL",
    title: "Career & Personal Brand",
    description:
      "Milestones for engineering mastery, product shipping, open-source impact, and personal brand building.",
    categories: [
      {
        id: "career-dev",
        num: "01.1",
        titlePrimary: "Career &",
        titleSecondary: "Development",
        items: [
          {
            id: "skilled-confident",
            title: "Become highly skilled and confident in my field",
            description:
              "Master software architecture, modern frontend patterns, and system design with deep confidence.",
            completed: false,
          },
          {
            id: "continuous-improvement",
            title: "Continuously improve my technical and professional skills",
            description:
              "Refine code quality, performance tuning, and technical leadership day by day.",
            completed: false,
          },
          {
            id: "strong-portfolio",
            title: "Build a strong professional portfolio",
            description:
              "Craft a world-class digital portfolio that showcases high-impact engineering and design precision.",
            completed: false,
            link: "/",
          },
          {
            id: "launch-products",
            title: "Build and launch 2+ real products",
            description:
              "Turn original ideas into production-ready software applications solving real user problems.",
            completed: false,
          },
          {
            id: "revenue-product",
            title: "Ship a product that generates independent revenue",
            description:
              "Build and monetize a SaaS or digital product that creates recurring value.",
            completed: false,
          },
          {
            id: "open-source-contrib",
            title: "Make my first meaningful open-source contribution",
            description:
              "Ship PRs and features to prominent open-source repositories powering the modern web.",
            completed: false,
          },
          {
            id: "organic-recognition",
            title: "Build a project that gains significant organic recognition",
            description:
              "Craft a tool or library so useful that developers naturally star, fork, and share it.",
            completed: false,
          },
          {
            id: "technical-deep-dives",
            title: "Write 10 high-quality technical deep-dives",
            description:
              "Publish thorough articles on browser engine internals, state architecture, and rendering performance.",
            completed: false,
          },
          {
            id: "new-language",
            title: "Learn and become proficient in a new programming language",
            description:
              "Gain mastery in Rust, Go, or Swift to rethink low-level performance and concurrency.",
            completed: false,
          },
          {
            id: "remote-opportunity",
            title: "Get a strong remote/international career opportunity",
            description:
              "Join a top-tier global organization shipping high-scale software from anywhere.",
            completed: false,
          },
        ],
      },
      {
        id: "content-brand",
        num: "01.2",
        titlePrimary: "Content &",
        titleSecondary: "Personal Brand",
        items: [
          {
            id: "personal-website",
            title: "Build my own personal website",
            description:
              "Design and engineer a fast, expressive digital home for my work and thoughts.",
            completed: false,
            link: "/",
          },
          {
            id: "instagram-presence",
            title: "Build a strong Instagram presence",
            description:
              "Share design breakdowns, development workflows, and tech insights regularly.",
            completed: false,
          },
          {
            id: "genuine-followers",
            title: "Reach 10K+ genuine followers",
            description:
              "Cultivate an authentic audience of fellow builders, designers, and tech enthusiasts.",
            completed: false,
          },
          {
            id: "consistent-content",
            title: "Create content consistently",
            description:
              "Maintain a steady output of value-adding posts, tutorials, and behind-the-scenes build logs.",
            completed: false,
          },
          {
            id: "recognizable-brand",
            title: "Build a recognizable personal brand",
            description:
              "Establish a distinct identity known for technical craftsmanship and visual excellence.",
            completed: false,
          },
          {
            id: "document-growth",
            title: "Document my projects, experiences, and growth",
            description:
              "Keep a public log of lessons learned, mistakes made, and milestones achieved.",
            completed: false,
          },
          {
            id: "content-views",
            title: "Create content that reaches 1M+ total views",
            description:
              "Produce impactful posts and technical content that resonate across social channels.",
            completed: false,
          },
          {
            id: "tech-talk",
            title: "Give my first technical talk/presentation",
            description:
              "Present live at a conference or meetup on UI engineering and software design.",
            completed: false,
          },
          {
            id: "mentor-developers",
            title: "Mentor 10+ aspiring developers",
            description:
              "Guide early-career engineers through portfolio reviews, code quality, and job strategies.",
            completed: false,
          },
          {
            id: "tech-conference",
            title: "Attend a major global technology conference",
            description:
              "Connect with world-class engineers and product leaders at an international event.",
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "personal",
    num: "02",
    badge: "PERSONAL",
    title: "Life, Wealth & Growth",
    description:
      "Goals for financial independence, family well-being, relationships, health, travel, and personal evolution.",
    categories: [
      {
        id: "financial-freedom",
        num: "02.1",
        titlePrimary: "Financial",
        titleSecondary: "Freedom",
        items: [
          {
            id: "net-worth",
            title: "Reach ₹25 lakh+ net worth",
            description:
              "Accumulate durable net worth through savings, equity, and asset appreciation.",
            completed: false,
          },
          {
            id: "investments",
            title: "Build ₹5 lakh+ in investments",
            description:
              "Deploy capital consistently into diversified index funds and long-term equity.",
            completed: false,
          },
          {
            id: "emergency-fund",
            title: "Maintain an emergency fund covering 6 months of expenses",
            description:
              "Keep a cash buffer to ensure financial peace of mind during market shifts.",
            completed: false,
          },
          {
            id: "income-sources",
            title: "Build 2+ sources of income",
            description:
              "Establish multiple revenue streams across salary, products, and investment yields.",
            completed: false,
          },
          {
            id: "financial-independence",
            title: "Become financially independent",
            description:
              "Reach a state where investments generate enough return to cover all living costs.",
            completed: false,
          },
          {
            id: "money-control",
            title: "Reach a point where money doesn't control my major life decisions",
            description:
              "Gain total autonomy to choose work and life paths based solely on passion and purpose.",
            completed: false,
          },
        ],
      },
      {
        id: "family",
        num: "02.2",
        titlePrimary: "Family &",
        titleSecondary: "Belonging",
        items: [
          {
            id: "parents-secure",
            title: "Make my parents financially secure",
            description:
              "Ensure my parents never have to worry about healthcare, housing, or living costs.",
            completed: false,
          },
          {
            id: "parents-trip",
            title: "Take my parents on an international trip",
            description:
              "Gift them an all-expenses-paid vacation abroad to experience new cultures.",
            completed: false,
          },
          {
            id: "parents-gift",
            title: "Buy something meaningful for my parents from my own earnings",
            description:
              "Present them with a significant token of gratitude funded entirely by my work.",
            completed: false,
          },
          {
            id: "comfortable-home",
            title: "Provide a comfortable home for my family",
            description:
              "Ensure a spacious, safe, and welcoming living environment for everyone.",
            completed: false,
          },
          {
            id: "quality-time",
            title: "Spend meaningful quality time with my family",
            description:
              "Prioritize uninterrupted family dinners, trips, and daily conversations.",
            completed: false,
          },
          {
            id: "important-moments",
            title: "Be there for my family during important moments",
            description:
              "Always show up for family celebrations, milestones, and emergencies.",
            completed: false,
          },
        ],
      },
      {
        id: "relationship",
        num: "02.3",
        titlePrimary: "Relationship &",
        titleSecondary: "Love",
        items: [
          {
            id: "healthy-relationship",
            title: "Continue building a healthy and strong relationship",
            description:
              "Nurture trust, open dialogue, empathy, and mutual understanding every single day.",
            completed: false,
          },
          {
            id: "mutual-growth",
            title: "Support each other's personal and career growth",
            description:
              "Empower each other to pursue ambitious dreams while staying grounded.",
            completed: false,
          },
          {
            id: "travel-together",
            title: "Travel somewhere unforgettable together",
            description:
              "Journey to breathtaking destinations and share life-changing travel experiences.",
            completed: false,
          },
          {
            id: "meaningful-memories",
            title: "Create meaningful memories together",
            description:
              "Cherish everyday rituals, unexpected road trips, and quiet evenings together.",
            completed: false,
          },
          {
            id: "stable-future",
            title: "Build a stable future together",
            description:
              "Lay a solid foundation of shared goals, financial harmony, and emotional security.",
            completed: false,
          },
          {
            id: "happy-family",
            title: "Build a happy family together",
            description:
              "Create a warm, loving home environment filled with joy, kindness, and laughter.",
            completed: false,
          },
        ],
      },
      {
        id: "health",
        num: "02.4",
        titlePrimary: "Physical &",
        titleSecondary: "Emotional Health",
        items: [
          {
            id: "fit-strong",
            title: "Become genuinely fit and physically strong",
            description:
              "Build functional muscle, endurance, and physical strength through consistent training.",
            completed: false,
          },
          {
            id: "mentally-resilient",
            title: "Become emotionally and mentally resilient",
            description:
              "Develop a calm, grounded mindset that navigates high-pressure situations with grace.",
            completed: false,
          },
          {
            id: "workout-routine",
            title: "Build a consistent workout routine",
            description:
              "Establish a non-negotiable weekly training discipline without relying on motivation.",
            completed: false,
          },
          {
            id: "diet-sleep",
            title: "Maintain a healthy diet and sleep schedule",
            description:
              "Fuel my body with clean nutrition, proper hydration, and 7-8 hours of quality sleep.",
            completed: false,
          },
          {
            id: "run-10k",
            title: "Run a 10K",
            description:
              "Train systematically to complete a 10-kilometer run with good stamina.",
            completed: false,
          },
          {
            id: "health-lifestyle",
            title: "Maintain my health as a lifelong lifestyle",
            description:
              "Treat longevity, movement, and wellness as permanent daily priorities.",
            completed: false,
          },
          {
            id: "handle-stress",
            title: "Learn to handle stress, failure and uncertainty better",
            description:
              "Reframe setbacks as learning signals and remain steadfast during turbulent times.",
            completed: false,
          },
        ],
      },
      {
        id: "experiences",
        num: "02.5",
        titlePrimary: "Life &",
        titleSecondary: "Experiences",
        items: [
          {
            id: "solo-trip",
            title: "Take a solo trip abroad",
            description:
              "Navigate a foreign country entirely independently to test self-reliance.",
            completed: false,
          },
          {
            id: "travel-10-countries",
            title: "Travel to 10 countries",
            description:
              "Explore diverse cultures, architectures, cuisines, and landscapes across the world.",
            completed: false,
          },
          {
            id: "live-3-cities",
            title: "Live in 3 different cities",
            description:
              "Experience living in distinct tech hubs or cultural capitals to broaden perspective.",
            completed: false,
          },
          {
            id: "experience-snowfall",
            title: "Experience snowfall",
            description: "Stand under falling snow amidst winter mountains.",
            completed: false,
          },
          {
            id: "scuba-diving",
            title: "Go scuba diving",
            description:
              "Explore coral reefs and underwater ecosystems below the ocean surface.",
            completed: false,
          },
          {
            id: "skydiving",
            title: "Go skydiving",
            description:
              "Jump from 14,000 feet and experience adrenaline-filled freefall.",
            completed: false,
          },
          {
            id: "major-concert",
            title: "Attend a major concert/sports event",
            description:
              "Feel the live stadium energy of a global music act or sports championship.",
            completed: false,
          },
          {
            id: "long-vacation",
            title: "Take a long vacation without worrying about work",
            description:
              "Unplug completely from Slack, email, and code for multiple weeks.",
            completed: false,
          },
          {
            id: "dream-workspace",
            title: "Build my dream home/workspace",
            description:
              "Design an ergonomic, aesthetically inspiring desk setup with ambient lighting.",
            completed: false,
          },
        ],
      },
      {
        id: "personal-growth",
        num: "02.6",
        titlePrimary: "Personal",
        titleSecondary: "Growth",
        items: [
          {
            id: "read-50-books",
            title: "Read 50 meaningful non-fiction books",
            description:
              "Absorb timeless ideas across psychology, philosophy, system design, and history.",
            completed: false,
          },
          {
            id: "excellent-communicator",
            title: "Become an excellent communicator",
            description:
              "Articulate thoughts crisply, write persuasively, and listen with focus.",
            completed: false,
          },
          {
            id: "public-speaking",
            title: "Become confident in public speaking",
            description:
              "Speak effortlessly in front of audiences large and small.",
            completed: false,
          },
          {
            id: "exceptional-discipline",
            title: "Develop exceptional discipline",
            description:
              "Build extreme consistency and focus, executing plans regardless of mood.",
            completed: false,
          },
          {
            id: "learn-cooking",
            title: "Learn cooking",
            description:
              "Master preparing wholesome, delicious meals from scratch for myself and others.",
            completed: false,
          },
          {
            id: "learn-swimming",
            title: "Learn swimming",
            description:
              "Become confident and skilled swimming in deep pools and open waters.",
            completed: false,
          },
          {
            id: "learn-language",
            title: "Learn another language",
            description:
              "Achieve conversational fluency in a new spoken language.",
            completed: false,
          },
          {
            id: "time-alone",
            title: "Become comfortable spending time alone",
            description:
              "Find peace and productivity in quiet solitude without needing distraction.",
            completed: false,
          },
          {
            id: "stop-comparing",
            title: "Stop comparing my journey with others",
            description:
              "Stay focused on my own growth curve, timeline, and core values.",
            completed: false,
          },
          {
            id: "freedom-time",
            title: "Build a life that gives me freedom over my time",
            description:
              "Structure life so I have complete ownership over how every hour is spent.",
            completed: false,
          },
        ],
      },
    ],
  },
];

export default function BucketListPage() {
  const [activeTab, setActiveTab] = useState<"professional" | "personal">("professional");

  const activeSection =
    bucketSections.find((section) => section.id === activeTab) || bucketSections[0];

  const tabs = [
    { id: "professional" as const, label: "PROFESSIONAL" },
    { id: "personal" as const, label: "PERSONAL" },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 min-h-screen pt-28 md:pt-36 selection:bg-[#E8342A]/20 selection:text-[#E8342A]">
      {/* Container matching main layout grid */}
      <div className="w-full max-w-[1168px] mx-auto px-4 md:px-8 flex flex-col items-center gap-12 md:gap-16 pb-20">
        {/* Header Hero Section */}
        <div className="w-full flex flex-col items-center text-center gap-4 py-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 font-mono"
          >
            <span className="text-[#E8342A]">✦</span>
            <span>BUCKET LIST</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-notch text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
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
            className="text-sm sm:text-base text-neutral-600 font-light max-w-xl pt-2 leading-relaxed"
          >
            A personal blueprint of lifetime ambitions — organized into Professional engineering goals and Personal life growth.
          </motion.p>

          {/* Section Filter Tabs with Smooth Sliding Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 inline-flex items-center p-1.5 bg-neutral-100 border border-neutral-200/80 rounded-full shadow-xs relative"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2.5 rounded-full text-xs font-mono transition-colors duration-300 select-none z-10 ${
                    isActive ? "text-white font-medium" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-[#E8342A] rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Animated Section Content Switching */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex flex-col gap-12 md:gap-16"
            >
              {/* Section Header Banner */}
              <div className="w-full border-b border-neutral-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-mono tracking-widest text-[#E8342A] uppercase font-bold">
                    {activeSection.badge}
                  </span>
                  <h2 className="font-notch text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900">
                    {activeSection.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-md">
                  {activeSection.description}
                </p>
              </div>

              {/* Subcategories list */}
              <div className="w-full flex flex-col gap-16 md:gap-24">
                {activeSection.categories.map((category) => (
                  <section
                    key={category.id}
                    className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start"
                  >
                    {/* Left Column (Sticky Title Category) */}
                    <div className="md:col-span-4 flex flex-col items-start md:sticky md:top-28">
                      <h3 className="font-notch font-bold text-3xl sm:text-4xl text-neutral-900 tracking-tight leading-tight">
                        {category.titlePrimary}
                      </h3>
                      <h4 className="font-serif italic text-2xl sm:text-3xl text-neutral-500 font-normal leading-tight">
                        {category.titleSecondary}
                      </h4>
                    </div>

                    {/* Right Column (Bucket Items List) */}
                    <div className="md:col-span-8 flex flex-col divide-y divide-neutral-200/70">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="py-5 first:pt-0 last:pb-0 flex items-start gap-3.5 sm:gap-4 group"
                        >
                          {/* Checkbox Icon */}
                          <div className="shrink-0 pt-0.5 select-none">
                            {item.completed ? (
                              <div className="w-5 h-5 rounded bg-[#E8342A] text-white flex items-center justify-center shadow-xs">
                                <CheckSquare className="w-3.5 h-3.5 stroke-[2.5]" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded border border-neutral-300 bg-white flex items-center justify-center group-hover:border-neutral-500 transition-colors shadow-2xs">
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
                                        ? "text-neutral-900 hover:text-[#E8342A]"
                                        : "text-neutral-800 hover:text-[#E8342A]"
                                    }`}
                                  >
                                    <span>{item.title}</span>
                                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                                  </Link>
                                ) : (
                                  <h4
                                    className={`font-notch text-base sm:text-lg font-medium transition-colors ${
                                      item.completed
                                        ? "text-neutral-900 group-hover:text-[#E8342A]"
                                        : "text-neutral-800 group-hover:text-[#E8342A]"
                                    }`}
                                  >
                                    {item.title}
                                  </h4>
                                )}
                              </div>

                              {/* Completion Date Badge */}
                              {item.completed && item.date && (
                                <span className="bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs px-3 py-0.5 rounded-full font-mono whitespace-nowrap shadow-2xs">
                                  {item.date}
                                </span>
                              )}
                            </div>

                            {/* Description */}
                            <p
                              className={`text-xs sm:text-[13px] font-light leading-relaxed ${
                                item.completed ? "text-neutral-500" : "text-neutral-500"
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
