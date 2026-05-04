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
    <section id="projects" className="bg-muted py-28 px-6 overflow-hidden text-foreground">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-foreground/20" />
              <p className="font-inter text-[11px] text-foreground/40 tracking-[0.25em] uppercase">
                The cycle
              </p>
            </div>
            <h2
              className="font-space leading-[1.0] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Nothing here<br />runs on a schedule.
            </h2>
          </div>
          <p className="font-inter text-foreground/50 text-sm max-w-xs leading-relaxed md:text-right">
            No deadlines. No modules. Just a loop you keep running until you&apos;re
            dangerous at this.
          </p>
        </div>

        {/* Steps — accordion style on mobile, horizontal on desktop */}
        <div className="hidden md:grid grid-cols-4 border border-foreground/10 rounded-2xl overflow-hidden">
          {steps.map(({ number, title, body, tag }, i) => (
            <div
              key={number}
              className={`relative p-8 border-r border-foreground/10 last:border-r-0 cursor-default group transition-colors duration-300 ${
                active === i ? "bg-foreground text-background" : "bg-muted hover:bg-card"
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Tag */}
              <p
                className={`font-inter text-[10px] tracking-[0.2em] uppercase mb-8 transition-colors ${
                  active === i ? "text-background/45" : "text-foreground/35"
                }`}
              >
                {tag}
              </p>

              {/* Number */}
              <p
                className={`font-space text-6xl font-bold leading-none mb-6 transition-colors ${
                  active === i ? "text-background/15" : "text-foreground/10"
                }`}
              >
                {number}
              </p>

              {/* Title */}
              <h3
                className={`font-space font-semibold text-base mb-4 leading-snug transition-colors ${
                  active === i ? "text-background" : "text-foreground"
                }`}
              >
                {title}
              </h3>

              {/* Body */}
              <p
                className={`font-inter text-sm leading-relaxed transition-colors ${
                  active === i ? "text-background/65" : "text-foreground/55"
                }`}
              >
                {body}
              </p>

              {/* Bottom arrow indicator */}
              <div
                className={`absolute bottom-6 right-6 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  active === i
                    ? "border-background/30 opacity-100"
                    : "border-foreground/20 opacity-0 group-hover:opacity-100"
                }`}
              >
                <span
                  className={`text-xs transition-colors ${
                    active === i ? "text-background/55" : "text-foreground/40"
                  }`}
                >
                  ↗
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col divide-y divide-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden">
          {steps.map(({ number, title, body, tag }, i) => (
            <div
              key={number}
              className="bg-muted"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setActive(active === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <span className="font-space text-2xl font-bold text-foreground/15">{number}</span>
                  <span className="font-space font-semibold text-sm text-foreground">{title}</span>
                </div>
                <span className={`text-foreground/40 transition-transform duration-300 ${active === i ? "rotate-45" : ""}`}>
                  +
                </span>
              </button>
              {active === i && (
                <div className="px-6 pb-6">
                  <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-foreground/35 mb-3">{tag}</p>
                  <p className="font-inter text-sm text-foreground/60 leading-relaxed">{body}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom line */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-foreground/10" />
          <p className="font-inter text-[11px] text-foreground/35 tracking-[0.2em] uppercase shrink-0">
            The loop never ends
          </p>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

      </div>
    </section>
  );
}
