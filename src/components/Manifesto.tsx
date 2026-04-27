"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// ── helpers ──────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

function RevealLine({
  children,
  delay = 0,
  indent = false,
  dim = false,
}: {
  children: React.ReactNode;
  delay?: number;
  indent?: boolean;
  dim?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div ref={ref} className="overflow-hidden leading-none">
      <motion.p
        className="font-space font-extrabold tracking-tight leading-[1.08]"
        style={{
          fontSize: "clamp(1.7rem, 4.2vw, 3.4rem)",
          color: dim ? "rgba(255,255,255,0.2)" : "#f0ebe5",
          paddingLeft: indent ? "clamp(1.5rem, 7vw, 7rem)" : "0",
        }}
        initial={{ y: "105%", opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.88, delay, ease: EASE }}
      >
        {children}
      </motion.p>
    </div>
  );
}

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
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ── Marquee ───────────────────────────────────────────────
const MARQUEE_WORDS = ["BUILD.", "BREAK.", "OBSESS.", "REPEAT.", "SHIP.", "LEARN."];

function Marquee() {
  const doubled = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="border-t border-b border-white/[0.05] py-3.5 overflow-hidden mt-20">
      <motion.div
        className="flex gap-0 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" } as any}
      >
        {[...doubled, ...doubled].map((word, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span
              className="font-space text-[13px] font-bold tracking-[0.3em] whitespace-nowrap"
              style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.1)" }}
            >
              {word}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c4622d] opacity-50 shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ── Trait card ────────────────────────────────────────────
const traits = [
  { n: "01", title: "You build before you're ready", desc: "Shipping a broken thing is worth more than perfecting one that never ships." },
  { n: "02", title: "You break things on purpose",   desc: "Understanding failure is the only real way to understand how something works." },
  { n: "03", title: "You obsess, not study",          desc: "Obsession is a curriculum. You don't follow it — you are it." },
  { n: "04", title: "You repeat until it clicks",    desc: "There's no graduation. There's only the next thing you don't know yet." },
];

function TraitCard({ n, title, desc, delay }: { n: string; title: string; desc: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  return (
    <motion.div
      ref={ref}
      className="bg-[#0a0806] p-6 border-r border-b border-white/[0.05] last:border-r-0 hover:bg-[rgba(196,98,45,0.04)] transition-colors duration-300 cursor-default"
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      <p className="font-space text-[11px] font-bold tracking-[0.1em] text-[rgba(196,98,45,0.5)] mb-2.5">{n}</p>
      <p className="font-space text-[1.05rem] font-bold text-[rgba(255,255,255,0.85)] mb-2 leading-snug">{title}</p>
      <p className="text-[12.5px] font-light text-[rgba(255,255,255,0.3)] ">{desc}</p>
    </motion.div>
  );
}

// ── Become heading with staggered lines ───────────────────
function BecomeHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const lines = [
    <>You don't fit the</>,
    <>mold. <span className="text-[#c4622d]">Good.</span></>,
    <>Neither did anyone</>,
    <>who <span className="text-[#c4622d]">changed things.</span></>,
  ];

  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden leading-none">
          <motion.span
            className="font-space font-extrabold tracking-tight text-[#f0ebe5] block"
            style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", lineHeight: 1.05 }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
          >
            {line}
          </motion.span>
        </div>
      ))}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────
export default function Manifesto() {
  return (
    <section className="bg-[#0a0806] overflow-hidden">

      {/* ── Manifesto lines ── */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">

      

        <FadeUp className="mb-5">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[rgba(196,98,45,0.6)] font-medium">
            Why this exists
          </p>
        </FadeUp>


        {/* Lines — clip-up on scroll */}
        <div className="flex flex-col gap-1 ">
          <RevealLine dim delay={0}>
            Systems was designed to produce{" "}
            <span className="text-[#c4622d]">workers.</span>
          </RevealLine>
          <RevealLine indent delay={0.08}>
            Not thinkers. Not builders.{" "}
            <span className="text-[#c4622d]">Not you.</span>
          </RevealLine>

          <div className="h-3" />

          <RevealLine dim delay={0.16}>
            The ones who broke things
          </RevealLine>
          <RevealLine dim delay={0.22}>
            were punished.
          </RevealLine>

          <div className="h-3" />

          <RevealLine indent delay={0.3}>
            Here, they're the ones
          </RevealLine>
          <RevealLine indent delay={0.36}>
            who <span className="text-[#c4622d]">get it.</span>
          </RevealLine>
        </div>

        {/* Counters */}
        {/* <FadeUp delay={0.1} className="flex items-center gap-8 mt-14 flex-wrap">
          {[
            { num: "0%",  label: "Tutorials finished" },
            { num: "100%",label: "Things broken"      },
            { num: "∞",   label: "Obsession"          },
          ].map(({ num, label }, i) => (
            <>
              {i > 0 && <div key={`div-${i}`} className="w-px h-12 bg-white/[0.08] shrink-0" />}
              <div key={label} className="flex flex-col gap-1">
                <span className="font-space text-[2.4rem] font-extrabold text-[#c4622d] leading-none">{num}</span>
                <span className="text-[10px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.25)] font-light">{label}</span>
              </div>
            </>
          ))}
        </FadeUp> */}

        {/* Pull quote */}
        <FadeUp delay={0.05} className="mt-16 border-l-2 border-[rgba(196,98,45,0.3)] pl-7">
          <p
            className="font-light italic text-[rgba(255,255,255,0.5)] leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
          >
            "The best people we know never finished a single tutorial.
            They just kept breaking things until something worked."
          </p>
          <p className="text-[10px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.18)] mt-3">
            — The people who built this
          </p>
        </FadeUp>
      </div>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Become TheOddOne ── */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-24">
        <FadeUp className="mb-5">
          <p className="text-[10px] tracking-[0.28em] uppercase text-[rgba(196,98,45,0.6)] font-medium">
            Become TheOddOne
          </p>
        </FadeUp>

        <BecomeHeading />

        {/* Traits grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-white/[0.05] mt-12">
          {traits.map((t, i) => (
            <TraitCard key={t.n} {...t} delay={i * 0.07} />
          ))}
        </div>
      </div>

    </section>
  );
}