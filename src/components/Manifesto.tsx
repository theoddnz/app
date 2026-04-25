"use client";
import { useEffect, useRef } from "react";

const lines = [
  { text: "School was designed to produce workers.", accent: false },
  { text: "Not thinkers. Not builders. Not you.", accent: true },
  { text: "The ones who broke things were punished.", accent: false },
  { text: "Here, they're the ones who get it.", accent: true },
];

const words = ["BUILD.", "BREAK.", "OBSESS.", "REPEAT."];

export default function Manifesto() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#0a0a0a] overflow-hidden">

      {/* Main manifesto block */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-16">
          <div className="w-6 h-px bg-white/20" />
          <p className="font-inter text-[11px] text-white/25 tracking-[0.25em] uppercase">
            Why this exists
          </p>
        </div>

        {/* Lines */}
        <div className="space-y-8">
          {lines.map(({ text, accent }, i) => (
            <p
              key={i}
              className="font-space leading-[1.1] tracking-tight"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
                color: accent ? "#ffffff" : "rgba(255,255,255,0.28)",
                paddingLeft: i % 2 === 1 ? "clamp(1rem, 6vw, 6rem)" : "0",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Pull quote */}
        <div className="mt-20 border-l-2 border-white/10 pl-8">
          <p className="font-space text-white/60 italic leading-relaxed"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}>
            "The best engineers we know never finished a single tutorial.
            They just kept breaking things until something worked."
          </p>
          <p className="font-inter text-white/20 text-xs tracking-widest uppercase mt-4">
            — The people who built this
          </p>
        </div>
      </div>

      {/* Scrolling marquee */}
      <div className="border-t border-white/5 py-5 overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: "marquee 18s linear infinite",
          }}
        >
          {[...Array(6)].flatMap(() =>
            words.map((w, i) => (
              <span
                key={`${w}-${Math.random()}`}
                className="font-space text-sm tracking-[0.3em] shrink-0"
                style={{
                  color: i % 2 === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.1)",
                }}
              >
                {w}
              </span>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}