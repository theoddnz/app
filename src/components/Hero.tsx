"use client";
import { Terminal, Wrench, Zap, Camera, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Button3D } from "@/components/ui/button-3d";
import { useRouter } from "next/navigation";
const floatingIcons = [
  { Icon: Terminal, label: "ROS",      className: "top-[24%] left-[11%]",  rotate: "-4deg" },
  { Icon: Camera,      label: "Hardware", className: "top-[20%] right-[12%]", rotate: "3deg"  },
  { Icon: Wrench,   label: "Repair",   className: "top-[60%] left-[7%]",   rotate: "-2deg" },
  { Icon: Bot,label: "Build",    className: "top-[58%] right-[8%]",  rotate: "5deg"  },
];

const SUBTITLE = "A place for people who think differently about learning.";

const sparks = [
  { x: 0, y: -70, delay: 0 },
  { x: 58, y: -42, delay: 0.35 },
  { x: 74, y: 12, delay: 0.7 },
  { x: 34, y: 66, delay: 1.05 },
  { x: -42, y: 58, delay: 1.4 },
  { x: -76, y: 0, delay: 1.75 },
  { x: -48, y: -52, delay: 2.1 },
];

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden pt-0 dark:bg-[#0a0806]">

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
            className="group relative w-[60px] h-[60px] bg-foreground/[0.03] rounded-[18px] border border-foreground/[0.07] backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-foreground/[0.05] transition-colors"
          >
            <Icon size={24} strokeWidth={1.5} className="text-secondary transition-transform duration-200 group-hover:scale-110" />
            
            {/* Tooltip */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-[11px] uppercase tracking-widest font-space font-semibold rounded-md opacity-0 scale-95 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 group-hover:-top-10 shadow-xl whitespace-nowrap z-50">
               {label}
               {/* Triangle arrow */}
               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-foreground" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-6">

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
            className="font-space text-[clamp(3.2rem,9vw,6rem)] font-extrabold tracking-tight text-foreground leading-none dark:text-white"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Meet
          </motion.h1>
        </div>

        <div className="overflow-hidden leading-none mb-6">
          <motion.h1
            className="font-space text-[clamp(3.2rem,9vw,6rem)] font-extrabold tracking-tight text-foreground leading-none dark:text-white"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            The<span className="text-[#c4622d]">Odd</span>Ones
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
                className="inline-block text-[1.05rem] font-light text-foreground/60 leading-relaxed"
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
            <Button3D onClick={() => router.push("/login")}>Join now</Button3D>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Orb visual ── */}
      <motion.div
        className="relative mt-14 flex h-[230px] w-[230px] items-center justify-center"
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          aria-hidden
          className="absolute h-[210px] w-[210px] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, rgba(196,98,45,0.52) 42deg, transparent 82deg, transparent 145deg, rgba(196,98,45,0.34) 184deg, transparent 235deg, rgba(196,98,45,0.46) 294deg, transparent 338deg)",
            mask: "radial-gradient(circle, transparent 56%, black 57%, black 59%, transparent 60%)",
            WebkitMask: "radial-gradient(circle, transparent 56%, black 57%, black 59%, transparent 60%)",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute h-[164px] w-[164px] rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "conic-gradient(from 20deg, rgba(196,98,45,0.4), transparent 50deg, transparent 132deg, rgba(196,98,45,0.48), transparent 210deg, transparent 280deg, rgba(196,98,45,0.32))",
            mask: "radial-gradient(circle, transparent 61%, black 62%, black 65%, transparent 66%)",
            WebkitMask: "radial-gradient(circle, transparent 61%, black 62%, black 65%, transparent 66%)",
          }}
        />

        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute h-[84px] w-[84px] rounded-full border border-[#c4622d]"
            animate={{
              scale: [0.95, 2.35],
              opacity: [0.35, 0],
              filter: ["blur(0px)", "blur(1.5px)"],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              delay: i * 0.72,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {sparks.map((spark, index) => (
          <motion.span
            key={index}
            aria-hidden
            className="absolute h-1.5 w-1.5 rounded-full bg-[#c4622d]"
            style={{ x: spark.x, y: spark.y }}
            animate={{
              scale: [0.2, 1.4, 0.2],
              opacity: [0, 0.9, 0],
              x: [spark.x * 0.45, spark.x, spark.x * 1.08],
              y: [spark.y * 0.45, spark.y, spark.y * 1.08],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: spark.delay,
              ease: "easeOut",
            }}
          />
        ))}

        <motion.div
          className="relative z-10 flex h-[94px] w-[94px] items-center justify-center rounded-full border border-[rgba(196,98,45,0.42)] bg-background shadow-[0_0_34px_rgba(196,98,45,0.28)]"
          animate={{
            scale: [1, 1.045, 1],
            boxShadow: [
              "0 0 28px rgba(196,98,45,0.22)",
              "0 0 52px rgba(196,98,45,0.42)",
              "0 0 28px rgba(196,98,45,0.22)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(ellipse at 40% 35%, rgba(196,98,45,0.32), transparent 72%)",
            }}
          />
          <motion.div
            animate={{
              rotate: [-3, 4, -3],
              scale: [1, 1.12, 1],
            }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20"
          >
            <Zap size={38} strokeWidth={1.35} className="text-secondary drop-shadow-[0_0_12px_rgba(196,98,45,0.42)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
