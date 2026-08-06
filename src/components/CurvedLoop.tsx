"use client";

import React, { useRef, useEffect, useState, useMemo, useId } from "react";
import "./CurvedLoop.css";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
}

export default function CurvedLoop({
  marqueeText = "",
  speed = 1.5,
  className = "",
  curveAmount = 120,
  direction = "left",
  interactive = true,
}: CurvedLoopProps) {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0";
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const [, setOffset] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid.replace(/:/g, "")}`;
  const pathD = `M-200,90 Q720,${90 + curveAmount} 1640,90`;

  const dragRef = useRef(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);
  const scrollVelRef = useRef(0);
  const lastScrollYRef = useRef(0);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(2600 / textLength) + 3)
        .fill(text)
        .join("")
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength());
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    if (textPathRef.current) {
      const initial = -spacing;
      textPathRef.current.setAttribute("startOffset", initial + "px");
      setOffset(initial);
    }
  }, [spacing]);

  // Interactive scroll reaction: scroll down moves forward (right), scroll up moves backward (left)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (Math.abs(scrollDelta) > 0.2) {
        // Boost velocity according to scroll direction
        scrollVelRef.current = scrollDelta * 0.75;
        if (scrollDelta > 0) {
          dirRef.current = "right";
        } else if (scrollDelta < 0) {
          dirRef.current = "left";
        }
      }
    };

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth animation frame loop with scroll momentum & drag support
  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;

    const step = () => {
      if (textPathRef.current) {
        if (!dragRef.current) {
          const baseDelta = dirRef.current === "right" ? speed : -speed;
          const delta = baseDelta + scrollVelRef.current;

          // Smoothly decay scroll velocity
          scrollVelRef.current *= 0.92;
          if (Math.abs(scrollVelRef.current) < 0.01) {
            scrollVelRef.current = 0;
          }

          const currentOffset = parseFloat(
            textPathRef.current.getAttribute("startOffset") || "0"
          );
          let newOffset = currentOffset + delta;

          const wrapPoint = spacing;
          if (newOffset <= -wrapPoint) newOffset += wrapPoint;
          if (newOffset > 0) newOffset -= wrapPoint;

          textPathRef.current.setAttribute("startOffset", newOffset + "px");
          setOffset(newOffset);
        }
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive) return;
    dragRef.current = true;
    lastXRef.current = e.clientX;
    velRef.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    const currentOffset = parseFloat(
      textPathRef.current.getAttribute("startOffset") || "0"
    );
    let newOffset = currentOffset + dx;

    const wrapPoint = spacing;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.current.setAttribute("startOffset", newOffset + "px");
    setOffset(newOffset);
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    if (Math.abs(velRef.current) > 0.5) {
      dirRef.current = velRef.current > 0 ? "right" : "left";
    }
  };

  const cursorStyle = interactive
    ? dragRef.current
      ? "grabbing"
      : "grab"
    : "auto";

  return (
    <div
      className="curved-loop-jacket"
      style={{ visibility: ready ? "visible" : "hidden", cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 180">
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: "hidden", opacity: 0, pointerEvents: "none" }}
        >
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="500" xmlSpace="preserve" className={className}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset="0px"
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
}
