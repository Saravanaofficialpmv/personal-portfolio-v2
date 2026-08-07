"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";
import {
  ChevronLeft,
  Search,
  X,
  ArrowRight,
  Mail,
  Copy,
  Check,
  CheckCircle2,
} from "lucide-react";

interface BookACallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

export default function BookACallModal({
  isOpen,
  onClose,
  onOpenSearch,
}: BookACallModalProps) {
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      } catch (err) {
        console.error("Failed to initialize Cal API:", err);
      }
    })();
  }, []);

  const [isSending, setIsSending] = useState(false);

  const email = "saravanapmvofficial@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isSending) return;
    setIsSending(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          senderEmail: "Portfolio Popup Visitor",
        }),
      });

      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        setMessage("");
        setIsSending(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Failed to send message:", err);
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center pb-2 sm:pb-6 pt-12 px-2 sm:px-4 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#141416] border border-white/10 rounded-[24px] sm:rounded-[28px] p-3.5 sm:p-5 shadow-2xl flex flex-col gap-2.5 sm:gap-4 text-white relative max-h-[88vh] overflow-y-auto"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between w-full gap-2">
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#1C1C1E] border border-white/10 text-[11px] sm:text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer max-w-[180px] sm:max-w-[220px] w-full"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Reach out</span>
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {onOpenSearch && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSearch();
                    }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1C1C1E] border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Top Card: Send Saravana a message */}
            <div className="bg-[#1C1C1E] border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col gap-2 sm:gap-3 relative overflow-hidden">
              {sentSuccess ? (
                <div className="py-4 sm:py-8 flex flex-col items-center justify-center gap-2 text-center">
                  <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 animate-bounce" />
                  <h4 className="font-notch text-sm sm:text-base font-semibold text-white">
                    Message Sent!
                  </h4>
                  <p className="text-[11px] sm:text-xs text-neutral-400 font-light">
                    Thanks for reaching out. Saravana will get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/20 shrink-0">
                      <Image
                        src="/3d-cortoon.svg"
                        alt="Saravana"
                        fill
                        className="object-cover scale-[1.35] object-center"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-notch text-xs sm:text-sm font-semibold text-white">
                        Send Saravana a message
                      </span>
                      <span className="text-[10px] sm:text-xs text-neutral-400 font-light">
                        I read every one
                      </span>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Hey Saravana, I have a project idea..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 outline-none resize-none pt-0.5 font-light"
                  />

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                    <div className="hidden sm:flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                      <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-neutral-300">
                        ↵
                      </span>{" "}
                      to continue ·{" "}
                      <span className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5 text-neutral-300">
                        ⇧ ↵
                      </span>{" "}
                      new line
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim() || isSending}
                      className="bg-white/10 hover:bg-white/20 border border-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed rounded-full px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <span>{isSending ? "Sending..." : "Continue"}</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Middle Section: 2 Equal Cards Side-by-Side */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Card 1: Book a call (Cal.com Embed Trigger) */}
              <button
                data-cal-namespace="30min"
                data-cal-link="saravana-pmv/30min"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                className="bg-[#1C1C1E] hover:bg-[#242427] border border-white/10 hover:border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 transition-all group cursor-pointer h-28 sm:h-36 w-full"
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <div className="relative w-7 h-7 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#1C1C1E] shadow-sm">
                    <Image
                      src="/3d-cortoon.svg"
                      alt="Saravana"
                      fill
                      className="object-cover scale-[1.35] object-center"
                    />
                  </div>
                  <span className="text-neutral-400 text-[10px] sm:text-xs font-medium">+</span>
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[10px] sm:text-xs font-medium text-neutral-300">
                    You
                  </div>
                </div>
                <h4 className="font-notch text-xs sm:text-sm font-semibold text-white group-hover:text-[#E8342A] transition-colors leading-tight">
                  Book a call
                </h4>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-light truncate max-w-[120px]">
                  30 min · no strings
                </span>
              </button>

              {/* Card 2: Email me */}
              <button
                onClick={handleCopyEmail}
                className="bg-[#1C1C1E] hover:bg-[#242427] border border-white/10 hover:border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center text-center gap-1 sm:gap-2 transition-all relative group cursor-pointer h-28 sm:h-36 w-full"
              >
                <div className="absolute top-2.5 right-2.5 text-neutral-400 group-hover:text-white transition-colors">
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 mb-0.5 group-hover:scale-105 transition-transform">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <h4 className="font-notch text-xs sm:text-sm font-semibold text-white group-hover:text-[#E8342A] transition-colors leading-tight">
                  Email me
                </h4>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-light font-mono truncate max-w-[120px]">
                  {copied ? "Copied!" : "saravanapm..."}
                </span>
              </button>
            </div>

            {/* Bottom Row: 4 Social Pill Buttons */}
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              <a
                href="https://www.linkedin.com/in/saravana-selvaraju/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1C1C1E] hover:bg-[#242427] border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-medium text-neutral-300 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 1.6 1.6a1.6 1.6 0 0 0-1.6-1.6Z" />
                </svg>
                <span className="truncate">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/hey_.saroo/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1C1C1E] hover:bg-[#242427] border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-medium text-neutral-300 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="truncate">Instagram</span>
              </a>
              <a
                href="https://github.com/Saravanaofficialpmv"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1C1C1E] hover:bg-[#242427] border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-medium text-neutral-300 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
                <span className="truncate">GitHub</span>
              </a>
              <a
                href="https://wa.me/919080407021?text=Hi%20Saravana,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1C1C1E] hover:bg-[#242427] border border-white/10 hover:border-white/20 rounded-lg sm:rounded-xl py-2 px-1.5 flex items-center justify-center gap-1 text-[11px] sm:text-xs font-medium text-neutral-300 hover:text-white transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0 text-emerald-400" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="truncate">WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
