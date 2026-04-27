"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Terminal, Cpu, Wrench, GitBranch, Zap, ArrowRight } from "lucide-react";
import {
  motion,
  useAnimate,
  stagger,
  useInView,
} from "framer-motion";
import { Button3D } from "@/components/ui/button-3d";
const floatingIcons = [
  { Icon: Terminal, label: "ROS",      className: "top-[24%] left-[11%]",  rotate: "-4deg" },
  { Icon: Cpu,      label: "Hardware", className: "top-[20%] right-[12%]", rotate: "3deg"  },
  { Icon: Wrench,   label: "Repair",   className: "top-[60%] left-[7%]",   rotate: "-2deg" },
  { Icon: GitBranch,label: "Build",    className: "top-[58%] right-[8%]",  rotate: "5deg"  },
];

const SUBTITLE = "A place for people who think differently about learning.";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden pt-0">

      {/* ── Floating icons – appear last, bob forever ── */}
      {floatingIcons.map(({ Icon, label, className, rotate }, i) => (
        <motion.div
          key={label}
          className={`absolute ${className} hidden md:flex`}
          style={{ rotate }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.4 + i * 0.12,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Continuous bob after mount */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4.5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.4 + i * 0.12,
            }}
            className="w-[60px] h-[60px] bg-white/[0.03] rounded-[18px] border border-white/[0.07] backdrop-blur-sm flex items-center justify-center"
          >
            <Icon size={24} strokeWidth={1.5} className="text-secondary" />
          </motion.div>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Badge */}
        {/* <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 mb-7 text-[11px] tracking-widest uppercase font-medium"
          style={{
            background: "rgba(196,98,45,0.12)",
            borderColor: "rgba(196,98,45,0.25)",
            color: "rgba(196,98,45,0.9)",
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[5px] h-[5px] rounded-full bg-[#c4622d] inline-block"
          />
          Robotics · ROS · Real learning
        </motion.div> */}

        {/* Headline — each line clips up from behind a mask */}
        <div className="overflow-hidden leading-none mb-1">
          <motion.h1
            className="font-space text-[clamp(3.2rem,9vw,6rem)] font-extrabold tracking-tight text-white leading-none"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Meet
          </motion.h1>
        </div>

        <div className="overflow-hidden leading-none mb-6">
          <motion.h1
            className="font-space text-[clamp(3.2rem,9vw,6rem)] font-extrabold tracking-tight text-white leading-none"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            TheOddOne
            {/* Dot pops in with spring after headline settles */}
            <motion.span
              className="text-[#c4622d]"
              initial={{ scale: 0.3, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5, type: "spring", bounce: 0.5 }}
            >
              .
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle — word by word */}
        <div className="flex flex-wrap justify-center gap-x-[6px] gap-y-0 max-w-md mb-9">
          {SUBTITLE.split(" ").map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="inline-block text-[1.05rem] font-light text-white/60 leading-relaxed"
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
            <Button3D>
    Join the waitlist
    <span data-arrow>
      <ArrowRight size={15} strokeWidth={2} />
    </span>
  </Button3D>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Orb visual ── */}
      <motion.div
        className="relative mt-14 w-[180px] h-[180px] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Spinning rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[rgba(196,98,45,0.15)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-[rgba(196,98,45,0.1)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* Core */}
        <div
          className="w-[90px] h-[90px] rounded-full flex items-center justify-center border border-[rgba(196,98,45,0.2)]"
          style={{
            background: "radial-gradient(ellipse at 40% 35%, rgba(196,98,45,0.25), rgba(100,40,10,0.15) 70%)",
          }}
        >
          <Zap size={36} strokeWidth={1.2} className="text-secondary" />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}