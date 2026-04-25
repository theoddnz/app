"use client";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Pick your obsession",
    body: "Drones. Robotic arms. Wheeled bots. Swarms. You don't pick a subject — you pick what makes you lose sleep. That's where you start.",
    tag: "DAY ONE",
  },
  {
    number: "02",
    title: "Build something wrong",
    body: "No blueprints. No hand-holding. You assemble, wire, and write code until something moves. It will be broken. That's the point.",
    tag: "WEEK ONE",
  },
  {
    number: "03",
    title: "Destroy it on purpose",
    body: "Push it until it fails. Edge cases, overloads, bad inputs. You find every crack before the real world does. This is where most people learn nothing — because they never get here.",
    tag: "THE HARD PART",
  },
  {
    number: "04",
    title: "Fix it. Ship it. Loop.",
    body: "Repair what broke. Write down what you discovered. Then begin again with something harder. There is no graduation. Only the next version.",
    tag: "FOREVER",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="projects" className="bg-[#f0eeeb] py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-black/20" />
              <p className="font-inter text-[11px] text-black/35 tracking-[0.25em] uppercase">
                The cycle
              </p>
            </div>
            <h2
              className="font-space leading-[1.0] tracking-tight text-black"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Nothing here<br />runs on a schedule.
            </h2>
          </div>
          <p className="font-inter text-black/40 text-sm max-w-xs leading-relaxed md:text-right">
            No deadlines. No modules. Just a loop you keep running until you're
            dangerous at this.
          </p>
        </div>

        {/* Steps — accordion style on mobile, horizontal on desktop */}
        <div className="hidden md:grid grid-cols-4 border border-black/8 rounded-2xl overflow-hidden">
          {steps.map(({ number, title, body, tag }, i) => (
            <div
              key={number}
              className={`relative p-8 border-r border-black/8 last:border-r-0 cursor-default group transition-colors duration-300 ${
                active === i ? "bg-black text-white" : "bg-[#f0eeeb] hover:bg-white"
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Tag */}
              <p
                className={`font-inter text-[10px] tracking-[0.2em] uppercase mb-8 transition-colors ${
                  active === i ? "text-white/30" : "text-black/25"
                }`}
              >
                {tag}
              </p>

              {/* Number */}
              <p
                className={`font-space text-6xl font-bold leading-none mb-6 transition-colors ${
                  active === i ? "text-white/10" : "text-black/8"
                }`}
              >
                {number}
              </p>

              {/* Title */}
              <h3
                className={`font-space font-semibold text-base mb-4 leading-snug transition-colors ${
                  active === i ? "text-white" : "text-black"
                }`}
              >
                {title}
              </h3>

              {/* Body */}
              <p
                className={`font-inter text-sm leading-relaxed transition-colors ${
                  active === i ? "text-white/55" : "text-black/45"
                }`}
              >
                {body}
              </p>

              {/* Bottom arrow indicator */}
              <div
                className={`absolute bottom-6 right-6 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  active === i
                    ? "border-white/20 opacity-100"
                    : "border-black/15 opacity-0 group-hover:opacity-100"
                }`}
              >
                <span
                  className={`text-xs transition-colors ${
                    active === i ? "text-white/40" : "text-black/30"
                  }`}
                >
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col divide-y divide-black/8 border border-black/8 rounded-2xl overflow-hidden">
          {steps.map(({ number, title, body, tag }, i) => (
            <div
              key={number}
              className="bg-[#f0eeeb]"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setActive(active === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-space text-2xl font-bold text-black/10">{number}</span>
                  <span className="font-space font-semibold text-sm text-black">{title}</span>
                </div>
                <span className={`text-black/30 transition-transform duration-300 ${active === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {active === i && (
                <div className="px-6 pb-6">
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-black/25 mb-3">{tag}</p>
                  <p className="font-inter text-sm text-black/50 leading-relaxed">{body}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-black/8" />
          <p className="font-inter text-[11px] text-black/25 tracking-[0.2em] uppercase shrink-0">
            The loop never ends
          </p>
          <div className="flex-1 h-px bg-black/8" />
        </div>

      </div>
    </section>
  );
}