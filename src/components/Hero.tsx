"use client";
import { BookOpen, Camera, Terminal, Wrench } from "@/components/ui/huge-icons";
import { motion } from "framer-motion";
import { Button3D } from "@/components/ui/button-3d";
import { Spotlight } from "@/components/ui/spotlight";
import { useRouter } from "next/navigation";
const floatingIcons = [
  { Icon: Terminal, label: "Code", className: "top-[24%] left-[11%]", rotate: "-4deg" },
  { Icon: Camera, label: "Share", className: "top-[20%] right-[12%]", rotate: "3deg" },
  { Icon: Wrench, label: "Build", className: "top-[60%] left-[7%]", rotate: "-2deg" },
  { Icon: BookOpen, label: "Learn", className: "top-[58%] right-[8%]", rotate: "5deg" },
];

const SUBTITLE = "A place for people who think differently about learning.";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden pt-0 dark:bg-[#0a0806]">
      <Spotlight className="-top-8 left-0 md:-top-20 md:left-20" fill="#c4622d" filterId="hero-spotlight-primary" />
      <Spotlight className="-top-24 left-full hidden -scale-x-100 dark:block" fill="#ffffff" filterId="hero-spotlight-secondary" />

      {/* ── Floating icons – appear last, bob forever ── */}
      {floatingIcons.map(({ Icon, label, className, rotate }, i) => (
        <motion.div
          key={label}
          className={`absolute z-10 ${className} hidden md:flex`}
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
          Build · Share · Real learning
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
        <div className="flex flex-wrap justify-center font-bold gap-x-[6px] gap-y-0 max-w-md mb-9">
          {SUBTITLE.split(" ").map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="inline-block text-[1.12rem] font-semibold text-foreground/60 leading-relaxed"
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



      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
