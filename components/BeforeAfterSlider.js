"use client";

import { useCallback, useRef, useState } from "react";

export default function BeforeAfterSlider({ before, after, beforeLabel = "Before", afterLabel = "After" }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e) => {
    draggingRef.current = true;
    updateFromClientX(e.clientX);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[4/3] w-full select-none overflow-hidden rounded-md bg-line touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute right-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-[11px] uppercase tracking-wide text-bone">
        {afterLabel}
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={beforeLabel} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        {position > 14 ? (
          <div className="absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-[11px] uppercase tracking-wide text-bone">
            {beforeLabel}
          </div>
        ) : null}
      </div>

      <div
        className="absolute inset-y-0 z-10 flex w-0 -translate-x-1/2 items-center justify-center"
        style={{ left: `${position}%` }}
      >
        <div className="h-full w-[2px] bg-bone/90" />
        <div className="absolute flex h-9 w-9 items-center justify-center rounded-full bg-bone shadow-md">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#221F1C" strokeWidth="2">
            <path d="M8 5 3 12l5 7M16 5l5 7-5 7" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="compare-slider absolute inset-0 h-full w-full cursor-ew-resize"
        aria-label="Drag to compare before and after"
      />
    </div>
  );
}
