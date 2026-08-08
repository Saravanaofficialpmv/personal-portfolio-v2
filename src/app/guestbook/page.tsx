"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Check, Sticker, Plus, Move, MousePointerClick, LayoutGrid, RotateCw, RotateCcw, Sparkles, RefreshCw, Database } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
import StickerPeel from "@/components/StickerPeel";
import { db, collection, addDoc, onSnapshot, query, orderBy } from "@/lib/firebase";

interface StickerEntry {
  id: string;
  name: string;
  avatar?: string;
  message: string;
  date: string;
  color: "yellow" | "mint" | "pink" | "blue" | "lavender" | "peach" | "dark";
  rotation: number;
  stamp: string;
  x?: number;
  y?: number;
  createdAt?: number;
}

const initialStickers: StickerEntry[] = [];

const colorStyles = {
  yellow: {
    bg: "bg-[#FEF08A]",
    text: "text-amber-950",
    subtext: "text-amber-900/70",
    border: "border-yellow-300",
    tape: "bg-white/60 border-yellow-200/80 shadow-xs",
    badge: "bg-amber-200/70 text-amber-900",
    accent: "text-amber-800",
  },
  mint: {
    bg: "bg-[#A7F3D0]",
    text: "text-emerald-950",
    subtext: "text-emerald-900/70",
    border: "border-emerald-300",
    tape: "bg-white/60 border-emerald-200/80 shadow-xs",
    badge: "bg-emerald-200/70 text-emerald-900",
    accent: "text-emerald-800",
  },
  pink: {
    bg: "bg-[#FBCFE8]",
    text: "text-pink-950",
    subtext: "text-pink-900/70",
    border: "border-pink-300",
    tape: "bg-white/60 border-pink-200/80 shadow-xs",
    badge: "bg-pink-200/70 text-pink-900",
    accent: "text-pink-800",
  },
  blue: {
    bg: "bg-[#BAE6FD]",
    text: "text-sky-950",
    subtext: "text-sky-900/70",
    border: "border-sky-300",
    tape: "bg-white/60 border-sky-200/80 shadow-xs",
    badge: "bg-sky-200/70 text-sky-900",
    accent: "text-sky-800",
  },
  lavender: {
    bg: "bg-[#DDD6FE]",
    text: "text-purple-950",
    subtext: "text-purple-900/70",
    border: "border-purple-300",
    tape: "bg-white/60 border-purple-200/80 shadow-xs",
    badge: "bg-purple-200/70 text-purple-900",
    accent: "text-purple-800",
  },
  peach: {
    bg: "bg-[#FFEDD5]",
    text: "text-orange-950",
    subtext: "text-orange-900/70",
    border: "border-orange-300",
    tape: "bg-white/60 border-orange-200/80 shadow-xs",
    badge: "bg-orange-200/70 text-orange-900",
    accent: "text-orange-800",
  },
  dark: {
    bg: "bg-[#18181B]",
    text: "text-white",
    subtext: "text-neutral-400",
    border: "border-neutral-700",
    tape: "bg-neutral-800/80 border-neutral-700 shadow-xs",
    badge: "bg-neutral-800 text-neutral-200",
    accent: "text-neutral-400",
  },
};

const availableColors: ("yellow" | "mint" | "pink" | "blue" | "lavender" | "peach" | "dark")[] = [
  "yellow",
  "mint",
  "pink",
  "blue",
  "lavender",
  "peach",
  "dark",
];

const getRandomAngle = () => {
  const angles = [-5.5, -4.2, -3.5, -2.2, 2.5, 3.5, 4.2, 5.5];
  return angles[Math.floor(Math.random() * angles.length)];
};

const getDifferentColor = (lastColor?: StickerEntry["color"]): StickerEntry["color"] => {
  const filtered = availableColors.filter((c) => c !== lastColor);
  return filtered[Math.floor(Math.random() * filtered.length)] || "pink";
};

export default function GuestbookPage() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<StickerEntry[]>(initialStickers);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState<StickerEntry["color"]>(() =>
    getDifferentColor(initialStickers[0]?.color)
  );
  const [previewRotation, setPreviewRotation] = useState<number>(getRandomAngle);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [clickPin, setClickPin] = useState<{ x: number; y: number } | null>(null);
  const [pastePos, setPastePos] = useState<{ x: number; y: number }>({ x: 20, y: 15 });
  const [viewMode, setViewMode] = useState<"canvas" | "grid">("canvas");

  // Real-time Firestore sync
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    try {
      const colRef = collection(db, "guestbook_stickers");
      unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          if (!snapshot.empty) {
            const firebaseData: StickerEntry[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              return {
                id: docSnap.id,
                name: data.name || "Visitor",
                avatar: data.avatar || "",
                message: data.message || "",
                date: data.date || "Just now",
                color: data.color || "yellow",
                rotation: data.rotation || 0,
                stamp: data.stamp || "STICKER NOTE ★",
                x: data.x ?? 20,
                y: data.y ?? 20,
                createdAt: data.createdAt?.seconds || Date.now(),
              };
            });

            // Sort newest first
            firebaseData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

            setStickers(firebaseData);
            setSelectedColor(getDifferentColor(firebaseData[0]?.color));
          } else {
            setStickers([]);
          }
        },
        (err) => {
          console.error("Firestore listener error:", err);
        }
      );
    } catch (e) {
      console.error("Firebase initialization error:", e);
    }

    // Purge any legacy cached mock stickers from previous sessions
    try {
      localStorage.removeItem("guestbook_stickers");
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const saveStickers = (newStickers: StickerEntry[]) => {
    setStickers(newStickers);
    try {
      localStorage.setItem("guestbook_stickers", JSON.stringify(newStickers));
    } catch (e) {
      console.error(e);
    }
  };

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boardRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest('.sticky-card-item') || target.closest('button') || target.closest('form') || target.closest('input') || target.closest('textarea')) return;

    const rect = boardRef.current.getBoundingClientRect();
    const clickX = Math.min(75, Math.max(2, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const clickY = Math.min(75, Math.max(2, Math.round(((e.clientY - rect.top) / rect.height) * 100)));

    setPastePos({ x: clickX, y: clickY });
    setClickPin({ x: clickX, y: clickY });

    setTimeout(() => {
      setClickPin(null);
    }, 2500);
  };

  const handleRotateStickerOnBoard = (id: string, delta: number) => {
    const updated = stickers.map((st) => {
      if (st.id === id) {
        const currentRot = st.rotation || 0;
        const nextRot = parseFloat((currentRot + delta).toFixed(1));
        return { ...st, rotation: nextRot };
      }
      return st;
    });
    saveStickers(updated);
  };

  const handleReRollAngle = () => {
    let nextAngle = getRandomAngle();
    while (nextAngle === previewRotation) {
      nextAngle = getRandomAngle();
    }
    setPreviewRotation(nextAngle);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const newSticker: StickerEntry = {
      id: Date.now().toString(),
      name: name.trim() || "Visitor",
      message: message.trim(),
      date: formattedDate,
      color: selectedColor,
      rotation: previewRotation,
      stamp: "STICKER NOTE ★",
      x: pastePos.x,
      y: pastePos.y,
    };

    // Optimistically add sticker to local state immediately
    setStickers((prev) => [newSticker, ...prev]);
    setMessage("");
    setSelectedColor(getDifferentColor(newSticker.color));
    setPreviewRotation(getRandomAngle());
    setIsSubmitting(false);

    // Shift next paste position slightly
    setPastePos((prev) => ({
      x: (prev.x + 14) % 70,
      y: (prev.y + 12) % 70,
    }));

    // Persist to Firestore in the background
    try {
      await addDoc(collection(db, "guestbook_stickers"), {
        name: newSticker.name,
        message: newSticker.message,
        date: newSticker.date,
        color: newSticker.color,
        rotation: newSticker.rotation,
        stamp: newSticker.stamp,
        x: newSticker.x,
        y: newSticker.y,
        createdAt: new Date(),
      });
    } catch (err: unknown) {
      console.error("Firestore addDoc error:", err);
    }
  };

  const handleShare = (sticker: StickerEntry) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`"${sticker.message}" — ${sticker.name}`);
      setCopiedId(sticker.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const previewTheme = colorStyles[selectedColor] || colorStyles.yellow;

  return (
    <div className="w-full bg-[#FBFBFB] text-neutral-900 min-h-screen pt-28 md:pt-36 selection:bg-[#E8342A]/20 selection:text-[#E8342A] relative overflow-hidden">
      {/* Wall Texture Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1240px] mx-auto px-4 md:px-8 flex flex-col items-center gap-8 md:gap-12 pb-28 relative z-10">
        {/* Page Header */}
        <div className="w-full flex flex-col items-center text-center gap-3 py-2 relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-neutral-500 font-mono"
          >
            <Sticker className="w-3.5 h-3.5 text-[#E8342A]" />
            <span>CREATIVE STICKY NOTE WALL</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-notch text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          >
            <span>Paste & Rotate Reviews</span>{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#FF3B83] via-[#FF5E62] to-[#FF9966] bg-clip-text text-transparent inline-block pr-3 py-0.5">
              Anywhere on the Board
            </span>
          </motion.h1>

          <p className="text-sm sm:text-base text-neutral-500 font-light max-w-xl pt-1">
            Preview your note below with auto-assigned tilt angle, then paste it on the wall!
          </p>

          {/* Interactive Controls & View Switcher */}
          <div className="flex items-center gap-3 pt-3 flex-wrap justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Firebase Real-time Sync • Click board to paste</span>
            </div>

            <div className="inline-flex items-center p-1 rounded-xl bg-neutral-200/80 border border-neutral-300 gap-1 text-xs">
              <button
                onClick={() => setViewMode("canvas")}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "canvas" ? "bg-white text-neutral-900 shadow-xs font-bold" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Move className="w-3.5 h-3.5" />
                <span>Free Wall Canvas</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === "grid" ? "bg-white text-neutral-900 shadow-xs font-bold" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Note Composer Form + Live Preview Side-by-Side */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl p-5 md:p-8 rounded-[28px] bg-white border border-neutral-200/90 shadow-[10px_20px_40px_rgba(0,0,0,0.07)] relative z-30 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
        >
          {/* Left: Input Form */}
          <form onSubmit={handleSubmit} className="md:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E8342A]" />
                <span>Write Your Review</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                Target: X:{pastePos.x}% Y:{pastePos.y}%
              </span>
            </div>

            <input
              type="text"
              placeholder="Your Name / Handle"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="bg-neutral-50/80 border border-neutral-200 rounded-xl p-3 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#E8342A] transition-colors"
            />

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={100}
              placeholder="Write your review or thoughts here... (Click anywhere on the wall board below to pick target position!)"
              required
              rows={3}
              className="w-full bg-neutral-50/80 border border-dashed border-neutral-300 rounded-xl p-3 text-sm font-medium text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#E8342A] transition-all resize-none leading-relaxed"
            />

            {/* Color Picker & Submit Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400 uppercase">Color:</span>
                <div className="flex items-center gap-1.5">
                  {availableColors.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                        selectedColor === col ? "scale-125 ring-2 ring-neutral-900" : "opacity-80 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor:
                          col === "yellow"
                            ? "#FEF08A"
                            : col === "mint"
                            ? "#A7F3D0"
                            : col === "pink"
                            ? "#FBCFE8"
                            : col === "blue"
                            ? "#BAE6FD"
                            : col === "lavender"
                            ? "#DDD6FE"
                            : col === "peach"
                            ? "#FFEDD5"
                            : "#18181B",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-neutral-400">
                  {message.length}/100
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#E8342A] hover:bg-[#d02c23] disabled:opacity-40 text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md transition-all active:scale-95 cursor-pointer ml-auto"
                >
                  <span>PASTE ON WALL</span>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Right: Live Preview Card Before Submit */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-4 bg-neutral-50/60 rounded-2xl border border-dashed border-neutral-200">
            <div className="flex items-center justify-between w-full mb-3 px-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                PREVIEW BEFORE SUBMIT
              </span>
              <button
                type="button"
                onClick={handleReRollAngle}
                className="inline-flex items-center gap-1 text-[10px] font-mono text-[#E8342A] hover:text-red-700 cursor-pointer font-bold"
                title="Re-roll random tilt angle"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Re-roll Tilt ({previewRotation > 0 ? `+${previewRotation}°` : `${previewRotation}°`})</span>
              </button>
            </div>

            <motion.div
              style={{ transform: `rotate(${previewRotation}deg)` }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-64 sm:w-72 transition-transform duration-200"
            >
              <StickerPeel
                peelBackHoverPct={22}
                peelBackActivePct={36}
                shadowIntensity={0.4}
                isCircle={false}
                rotate={0}
              >
                <div className={`relative p-5 rounded-[22px] ${previewTheme.bg} ${previewTheme.border} border shadow-[8px_14px_30px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[250px]`}>
                  {/* Washi Tape */}
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 ${previewTheme.tape} backdrop-blur-xs border shadow-2xs rotate-[-1deg] opacity-90 pointer-events-none z-20 flex items-center justify-center`} />

                  <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
                    <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md ${previewTheme.badge} uppercase`}>
                      STICKER NOTE ★
                    </span>
                    <span className={`text-[10px] font-mono ${previewTheme.subtext}`}>
                      NOW
                    </span>
                  </div>

                  <div className="flex-1 flex items-center justify-center my-2 relative z-10 text-center">
                    <p className={`font-notch text-sm font-bold ${previewTheme.text} leading-relaxed tracking-tight px-1`}>
                      &ldquo;{message || "Your review will look like this on the wall!"}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-3 relative z-10">
                    <span className={`font-notch font-bold text-xs ${previewTheme.text} truncate uppercase tracking-wide`}>
                      {name || "YOUR NAME"}
                    </span>
                    <span className="text-[10px] font-mono opacity-70 font-bold">AUTO TILT: {previewRotation > 0 ? `+${previewRotation}°` : `${previewRotation}°`}</span>
                  </div>
                </div>
              </StickerPeel>
            </motion.div>
          </div>
        </motion.div>

        {/* Free Canvas Wall Board Canvas */}
        {viewMode === "canvas" ? (
          <div
            ref={boardRef}
            onClick={handleBoardClick}
            className="w-full min-h-[720px] md:min-h-[850px] bg-[#F7F6F2] border border-neutral-300/80 rounded-[32px] p-4 sm:p-8 relative overflow-hidden shadow-inner cursor-crosshair group/wall"
          >
            {/* Corkboard / Wall Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-70 pointer-events-none" />

            {/* Canvas Hint Overlay */}
            <div className="absolute top-4 left-6 pointer-events-none opacity-60 flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-wider">
              <span>📌 STICKY NOTE WALL CANVAS — CLICK ANYWHERE TO SET PASTE TARGET</span>
            </div>

            {/* Click Location Target Pin Indicator */}
            {clickPin && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                style={{ left: `${clickPin.x}%`, top: `${clickPin.y}%` }}
                className="absolute z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#E8342A] text-white flex items-center justify-center shadow-lg animate-bounce">
                  📌
                </div>
                <span className="bg-neutral-900 text-white font-mono text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap shadow-sm">
                  PASTE TARGET CHOSEN!
                </span>
              </motion.div>
            )}

            {/* Draggable & Rotatable Sticky Notes on Board Canvas */}
            <AnimatePresence>
              {stickers.map((sticker) => {
                const theme = colorStyles[sticker.color] || colorStyles.yellow;

                return (
                  <motion.div
                    key={sticker.id}
                    drag
                    dragConstraints={boardRef}
                    dragElastic={0.05}
                    dragMomentum={true}
                    whileDrag={{ scale: 1.08, zIndex: 100, cursor: "grabbing" }}
                    initial={{ opacity: 0, scale: 0.85, rotate: sticker.rotation || -3.5 }}
                    animate={{ opacity: 1, scale: 1, rotate: sticker.rotation || -3.5 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      left: `${sticker.x ?? 15}%`,
                      top: `${sticker.y ?? 15}%`,
                    }}
                    className="sticky-card-item w-72 sm:w-80 cursor-grab active:cursor-grabbing hover:z-40 transition-shadow duration-300"
                  >
                    <StickerPeel
                      peelBackHoverPct={22}
                      peelBackActivePct={36}
                      shadowIntensity={0.4}
                      isCircle={false}
                      rotate={0}
                    >
                      <div className={`relative p-5 sm:p-6 rounded-[22px] ${theme.bg} ${theme.border} border shadow-[8px_14px_30px_rgba(0,0,0,0.1)] flex flex-col justify-between min-h-[280px] sm:min-h-[300px] transition-transform duration-300 group`}>
                        {/* Top Washi Tape */}
                        <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 ${theme.tape} backdrop-blur-xs border shadow-2xs rotate-[-1deg] opacity-90 pointer-events-none z-20 flex items-center justify-center`} />

                        {/* Stamp & Date Badge Row */}
                        <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
                          <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md ${theme.badge} uppercase`}>
                            {sticker.stamp}
                          </span>
                          <span className={`text-[11px] font-mono ${theme.subtext}`}>
                            {sticker.date}
                          </span>
                        </div>

                        {/* Message Quote */}
                        <div className="flex-1 flex items-center justify-center my-3 relative z-10 text-center">
                          <p className={`font-notch text-base sm:text-lg font-bold ${theme.text} leading-relaxed tracking-tight px-1`}>
                            &ldquo;{sticker.message}&rdquo;
                          </p>
                        </div>

                        {/* Author, Share & Direct On-Board Rotation Toolbar */}
                        <div className="pt-3 border-t border-black/10 flex items-center justify-between gap-2 relative z-10">
                          <div className="flex items-center gap-2 min-w-0">
                            {sticker.avatar ? (
                              <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-2xs">
                                <Image
                                  src={sticker.avatar}
                                  alt={sticker.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                                {sticker.name.charAt(0).toUpperCase()}
                              </div>
                            )}

                            <span className={`font-notch font-bold text-xs ${theme.text} truncate uppercase tracking-wide`}>
                              {sticker.name}
                            </span>
                          </div>

                          {/* Interactive Direct On-Board Rotation Controls */}
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRotateStickerOnBoard(sticker.id, -10);
                              }}
                              className={`p-1.5 rounded-full hover:bg-black/10 ${theme.accent} transition-colors cursor-pointer`}
                              title="Rotate left on board (-10°)"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRotateStickerOnBoard(sticker.id, 10);
                              }}
                              className={`p-1.5 rounded-full hover:bg-black/10 ${theme.accent} transition-colors cursor-pointer`}
                              title="Rotate right on board (+10°)"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(sticker);
                              }}
                              className={`p-1.5 rounded-full hover:bg-black/10 ${theme.accent} transition-colors cursor-pointer ml-1`}
                              title="Share or copy sticker text"
                            >
                              {copiedId === sticker.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Share2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </StickerPeel>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          /* Grid View Mode */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            <AnimatePresence>
              {stickers.map((sticker) => {
                const theme = colorStyles[sticker.color] || colorStyles.yellow;

                return (
                  <motion.div
                    key={sticker.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, rotate: sticker.rotation || -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: sticker.rotation || -3 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="w-full relative hover:z-30 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]"
                  >
                    <StickerPeel
                      peelBackHoverPct={20}
                      peelBackActivePct={35}
                      shadowIntensity={0.35}
                      isCircle={false}
                      rotate={0}
                    >
                      <div className={`relative p-6 rounded-[22px] ${theme.bg} ${theme.border} border shadow-[6px_10px_25px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[300px]`}>
                        {/* Top Washi Tape */}
                        <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 h-7 ${theme.tape} backdrop-blur-xs border shadow-2xs rotate-[-1deg] opacity-90 pointer-events-none z-20 flex items-center justify-center`} />

                        <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                          <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md ${theme.badge} uppercase`}>
                            {sticker.stamp}
                          </span>
                          <span className={`text-[11px] font-mono ${theme.subtext}`}>
                            {sticker.date}
                          </span>
                        </div>

                        <div className="flex-1 flex items-center justify-center my-3 relative z-10 text-center">
                          <p className={`font-notch text-lg font-bold ${theme.text} leading-relaxed tracking-tight px-1`}>
                            &ldquo;{sticker.message}&rdquo;
                          </p>
                        </div>

                        <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-3 relative z-10">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {sticker.avatar ? (
                              <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-black/10 shadow-2xs">
                                <Image
                                  src={sticker.avatar}
                                  alt={sticker.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                                {sticker.name.charAt(0).toUpperCase()}
                              </div>
                            )}

                            <div className="flex flex-col text-left min-w-0">
                              <span className={`font-notch font-bold text-xs ${theme.text} truncate uppercase tracking-wide`}>
                                {sticker.name}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleRotateStickerOnBoard(sticker.id, -10)}
                              className={`p-1.5 rounded-full hover:bg-black/10 ${theme.accent} transition-colors cursor-pointer`}
                              title="Rotate left (-10°)"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleRotateStickerOnBoard(sticker.id, 10)}
                              className={`p-1.5 rounded-full hover:bg-black/10 ${theme.accent} transition-colors cursor-pointer`}
                              title="Rotate right (+10°)"
                            >
                              <RotateCw className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleShare(sticker)}
                              className={`p-1.5 rounded-full hover:bg-black/10 ${theme.accent} transition-colors cursor-pointer ml-1`}
                              title="Share or copy sticker text"
                            >
                              {copiedId === sticker.id ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Share2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </StickerPeel>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
