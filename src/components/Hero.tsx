"use client";
import { motion } from "framer-motion";
import { Button3D } from "@/components/ui/button-3d";
import { Spotlight } from "@/components/ui/spotlight";
import { useRouter } from "next/navigation";

const SUBTITLE = "A place for people who think differently about learning.";

const allTags = [
  { label: "ROS2", delay: 1.2 },
  { label: "Build in public", delay: 1.35 },
  { label: "Community", delay: 1.5 },
];

function Tag({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.08,
        rotate: "0deg",
        y: -3,
        transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
      }}
      className="cursor-default"
    >
      <div className="rounded-full bg-white p-[7px] md:p-[9px] shadow-[0_6px_0_rgba(13,38,58,0.10),0_10px_22px_rgba(13,38,58,0.14)] ring-1 ring-black/[0.05] dark:bg-[#181818] dark:shadow-[0_6px_0_rgba(0,0,0,0.25),0_10px_20px_rgba(0,0,0,0.3)] dark:ring-white/[0.05] transition-shadow duration-200 hover:shadow-[0_8px_0_rgba(13,38,58,0.12),0_14px_28px_rgba(13,38,58,0.18)]">
        <div className="flex items-center gap-1.5 rounded-full bg-[#f5f3f0] px-2.5 py-1 md:px-3 md:py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:bg-[#242424] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c4622d] flex-shrink-0" />
          <span className="font-mono text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.14em] text-[#29445b] dark:text-[#c4a882] whitespace-nowrap">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative flex h-[100svh] min-h-[620px] flex-col items-center justify-center bg-background pt-0 dark:bg-[#131313]">
      <Spotlight className="-top-8 left-0 md:-top-20 md:left-20" fill="#c4622d" filterId="hero-spotlight-primary" />
      <Spotlight className="-top-24 left-full hidden -scale-x-100 dark:block" fill="#ffffff" filterId="hero-spotlight-secondary" />

      {/* Watermark — desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center select-none"
        style={{ overflow: "hidden" }}
      >
        <span
          className="font-space font-extrabold leading-none tracking-tight whitespace-nowrap dark:hidden"
          style={{
            fontSize: "clamp(6rem, 20vw, 16rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(0,0,0,0.07)",
          }}
        >
          TheOddOnes
        </span>
        <span
          className="font-space font-extrabold leading-none tracking-tight whitespace-nowrap hidden dark:inline"
          style={{
            fontSize: "clamp(6rem, 20vw, 16rem)",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.07)",
          }}
        >
          TheOddOnes
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-6">

        {/* MEET line — desktop has "Build in public" top-right */}
        <div className="relative overflow-visible leading-none mb-1">
          <motion.h1
            className="font-space text-[clamp(3.6rem,10vw,7rem)] font-extrabold tracking-tight text-foreground leading-none dark:text-white"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Meet
          </motion.h1>

          {/* Build in public — top-right of MEET, desktop only */}
          <div
            className="absolute hidden md:block"
            style={{ top: "-12px", right: "-140px", rotate: "2deg", zIndex: 20 }}
          >
            <Tag label="Build in public" delay={1.35} />
          </div>
        </div>

        {/* Desktop: TheOddOnes line with ROS2 + Community tags */}
        <div className="relative overflow-visible leading-none hidden md:block mb-6">
          <motion.h1
            className="font-space text-[clamp(3.6rem,10vw,7rem)] font-extrabold tracking-tight text-foreground leading-none dark:text-white"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            The<span className="text-[#c4622d]">Odd</span>Ones
            <motion.span
              className="text-[#c4622d]"
              initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5, type: "spring", bounce: 0.5 }}
            >
              .
            </motion.span>
          </motion.h1>

          {/* ROS2 — top-left */}
          <div className="absolute" style={{ top: "-24px", left: "4%", rotate: "-4deg", zIndex: 20 }}>
            <Tag label="ROS2" delay={1.2} />
          </div>

          {/* Community — bottom-right */}
          <div className="absolute" style={{ top: "72px", left: "58%", rotate: "-3deg", zIndex: 20 }}>
            <Tag label="Community" delay={1.5} />
          </div>
        </div>

        {/* Mobile: TheOddOnes + all tags in a row below */}
        <div className="md:hidden leading-none mb-6">
          <motion.h1
            className="font-space text-[clamp(3.6rem,10vw,7rem)] font-extrabold tracking-tight text-foreground leading-none dark:text-white"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            The<span className="text-[#c4622d]">Odd</span>Ones
            <motion.span
              className="text-[#c4622d]"
              initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5, type: "spring", bounce: 0.5 }}
            >
              .
            </motion.span>
          </motion.h1>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {allTags.map((tag, i) => (
              <div key={tag.label} style={{ rotate: `${[-4, 2, -3][i]}deg` }}>
                <Tag label={tag.label} delay={tag.delay} />
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div className="flex flex-wrap justify-center gap-x-[6px] gap-y-0 max-w-lg mb-9">
          {SUBTITLE.split(" ").map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="inline-block text-[1.05rem] md:text-[1.18rem] font-semibold text-foreground/60 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.85 + i * 0.055,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button3D onClick={() => router.push("/login")}>Start building</Button3D>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
