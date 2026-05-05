"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Primitives ────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function ClipLine({
  children,
  delay = 0,
  dim = false,
}: {
  children: React.ReactNode;
  delay?: number;
  dim?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.span
        className="block font-space font-extrabold tracking-tight"
        style={{
          fontSize: "clamp(2rem, 5.5vw, 4.6rem)",
          lineHeight: 1.06,
          color: dim
            ? "color-mix(in oklch, var(--foreground) 20%, transparent)"
            : "var(--foreground)",
        }}
        initial={{ y: "108%", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────

const traits = [
  {
    n: "01",
    title: "You build before you're ready",
    desc: "Shipping a broken thing is worth more than perfecting one that never ships.",
  },
  {
    n: "02",
    title: "You break things on purpose",
    desc: "Understanding failure is the only real way to understand how something works.",
  },
  {
    n: "03",
    title: "You obsess, not study",
    desc: "Obsession is a curriculum. You don't follow it — you are it.",
  },
  {
    n: "04",
    title: "You repeat until it clicks",
    desc: "There's no graduation. There's only the next thing you don't know yet.",
  },
];

function TraitCard({
  n,
  title,
  desc,
  delay,
}: {
  n: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      className="group flex flex-col gap-4 rounded-2xl border border-foreground/[0.08] bg-background p-7 transition-colors duration-300 hover:border-[rgba(196,98,45,0.3)] hover:bg-[rgba(196,98,45,0.03)] dark:bg-[#0d0b08]"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      <p className="font-inter text-[10px] font-semibold tracking-[0.22em] uppercase text-[rgba(196,98,45,0.55)]">
        {n}
      </p>
      <p className="font-space text-base font-bold leading-snug text-foreground/85">
        {title}
      </p>
      <p className="font-inter text-sm leading-relaxed text-foreground/40">
        {desc}
      </p>
    </motion.div>
  );
}

// ── Main ─────────────────────────────────────────────────

export default function Manifesto() {
  return (
    <section className="bg-background px-6 py-28 text-foreground dark:bg-[#0a0806] md:px-10 md:py-36">
      <div className="mx-auto max-w-6xl space-y-28">

        {/* ── BLOCK 1: MANIFESTO STATEMENT ── */}
        <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24 lg:items-start">
          {/* left — label + pull quote */}
          <FadeUp delay={0.1} className="flex flex-col gap-8 lg:pt-3">
            <div>
              <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[rgba(196,98,45,0.65)] font-medium">
                Why this exists
              </p>
              <p className="mt-5 font-inter text-sm leading-[1.9] text-foreground/50">
                TheOddOnes is for builders who learn through contact with real
                systems, real tools, and real failure.
              </p>
            </div>

            {/* pull quote */}
            <blockquote className="border-l-2 border-[rgba(196,98,45,0.35)] pl-6">
              <p className="font-inter text-sm italic leading-[1.9] text-foreground/45">
                &ldquo;The best people we know never finished a single tutorial.
                They just kept breaking things until something worked.&rdquo;
              </p>
              <p className="mt-3 font-inter text-[10px] uppercase tracking-[0.22em] text-foreground/25">
                — The people who built this
              </p>
            </blockquote>
          </FadeUp>

          {/* right — big stacked lines */}
          <div className="flex flex-col gap-0.5">
            <ClipLine dim delay={0}>
              Systems was designed to produce{" "}
              <span className="text-[#c4622d]">workers.</span>
            </ClipLine>
            <ClipLine dim delay={0.07}>
              Not thinkers. Not builders.{" "}
              <span className="text-[#c4622d]">Not you.</span>
            </ClipLine>

            <div className="h-6" />

            <ClipLine delay={0.15}>
              The ones who broke things
            </ClipLine>
            <ClipLine delay={0.21}>
              were punished.
            </ClipLine>

            <div className="h-6" />

            <ClipLine delay={0.29}>
              Here, they&apos;re the ones
            </ClipLine>
            <ClipLine delay={0.35}>
              who <span className="text-[#c4622d]">get it.</span>
            </ClipLine>
          </div>
        </div>

        {/* ── BLOCK 2: BECOME THEOODDONE ── */}
        <div>
          {/* eyebrow */}
          <FadeUp className="mb-10">
            <div className="flex items-center gap-4">
              <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-[rgba(196,98,45,0.65)] font-medium">
                Become TheOddOne
              </p>
              <div className="h-px flex-1 bg-foreground/8 max-w-[120px]" />
            </div>
          </FadeUp>

          {/* "You don't fit the mold" headline */}
          <div className="mb-14 flex flex-col gap-0.5">
            {[
              { text: <>You don&apos;t fit the</>, dim: true, delay: 0 },
              { text: <>mold. <span className="text-[#c4622d]">Good.</span></>, dim: false, delay: 0.08 },
              { text: <>Neither did anyone</>, dim: true, delay: 0.16 },
              { text: <> who <span className="text-[#c4622d]">changed things.</span></>, dim: false, delay: 0.24 },
            ].map((line, i) => (
              <ClipLine key={i} delay={line.delay} dim={line.dim}>
                {line.text}
              </ClipLine>
            ))}
          </div>

          {/* traits — 2-col mobile, 4-col desktop */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {traits.map((t, i) => (
              <TraitCard key={t.n} {...t} delay={i * 0.08} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}