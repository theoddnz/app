"use client";
import { Cpu, Radio, Users, Zap, Wrench, GitMerge } from "@/components/ui/tabler-icons";

const features = [
  {
    icon: Cpu,
    title: "You touch hardware on day one.",
    body: "No setup weeks. No theory first. You wire something up before you fully understand it. Confusion is the method.",
    size: "large",
    tag: "HANDS",
  },
  {
    icon: Radio,
    title: "ROS2 on real machines.",
    body: "Not a simulator. Not a demo video. An actual robot that breaks when you get it wrong.",
    size: "small",
    tag: "REAL",
  },
  {
    icon: Wrench,
    title: "You will destroy things.",
    body: "On purpose. Repeatedly. Until failure stops scaring you.",
    size: "small",
    tag: "BREAK",
  },
  {
    icon: Users,
    title: "People who don't explain why they're obsessed.",
    body: "They just are. Builders, tinkerers, people who stay up too late soldering. That's who you'll be around.",
    size: "medium",
    tag: "COMMUNITY",
  },
  {
    icon: Zap,
    title: "You ship things that exist.",
    body: "Not certificates. Not portfolios. Objects and code that do something in the physical world.",
    size: "medium",
    tag: "OUTPUT",
  },
  {
    icon: GitMerge,
    title: "Written by people who've failed publicly.",
    body: "Not academics. People who've demoed robots that crashed in front of a crowd and came back the next day.",
    size: "small",
    tag: "SOURCE",
  },
];

export default function Features() {
  return (
    <section id="platform" className="py-28 px-6 bg-background text-foreground">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-foreground/20" />
              <p className="font-inter text-[11px] text-foreground/40 tracking-[0.25em] uppercase">
                What this is
              </p>
            </div>
            <h2
              className="font-space leading-[1.0] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Not a platform.<br />An environment.
            </h2>
          </div>
          <p className="font-inter text-foreground/45 text-sm max-w-xs leading-relaxed md:text-right">
            Structured enough to push you. Loose enough that you
            can break the whole thing and still find your way.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {features.map(({ icon: Icon, title, body, size, tag }, i) => (
            <div
              key={i}
              className={`
                group relative border border-foreground/10 rounded-2xl p-7
                hover:border-foreground/20 hover:shadow-sm transition-all duration-300
                ${size === "large" ? "md:col-span-2 bg-muted" : "bg-card"}
              `}
            >
              {/* Tag */}
              <p className="font-inter text-[10px] tracking-[0.2em] text-foreground/30 uppercase mb-6">
                {tag}
              </p>

              {/* Icon */}
              <div className="w-9 h-9 rounded-xl border border-foreground/10 flex items-center justify-center mb-5 group-hover:bg-foreground group-hover:border-foreground transition-all duration-300">
                <Icon
                  size={16}
                  strokeWidth={1.5}
                  className="text-foreground/45 group-hover:text-background transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="font-space font-semibold text-base leading-snug mb-3 text-foreground">
                {title}
              </h3>

              {/* Body */}
              <p className="font-inter text-foreground/50 text-sm leading-relaxed">
                {body}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-7 right-7 h-px bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-foreground/10" />
          <p className="font-inter text-[11px] text-foreground/30 tracking-[0.2em] uppercase shrink-0">
            No certificates. No completion badges.
          </p>
          <div className="flex-1 h-px bg-foreground/10" />
        </div>

      </div>
    </section>
  );
}
