"use client";

import { motion, cubicBezier, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = cubicBezier(0.16, 1, 0.3, 1);
const SPRING = { type: "spring", stiffness: 400, damping: 28 } as const;

/* ─────────────────────────────────────────
   MINI PLAYER
───────────────────────────────────────── */
function MiniPlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const tRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(28);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0,0,w,h);
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.font = "600 10px monospace";
    ctx.fillText("ROS2 NAV STACK", 14, 22);
    for (let i = 0; i < 18; i++) {
      const x = (i/17)*w, bh = 4+Math.sin(i*0.8)*8;
      ctx.fillStyle = "rgba(196,98,45,0.18)";
      ctx.fillRect(x-1, h/2-bh/2, 2.5, bh);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    const tick = () => {
      tRef.current += 0.04;
      ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0,0,w,h);
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      ctx.font = "600 10px monospace"; ctx.fillText("ROS2 NAV STACK",14,22);
      for (let i=0;i<22;i++) {
        const x=(i/21)*w;
        const bh=6+Math.sin(i*0.6+tRef.current)*14+Math.sin(i*1.3-tRef.current*1.5)*7;
        const op=0.3+Math.abs(Math.sin(i*0.5+tRef.current))*0.5;
        ctx.fillStyle=`rgba(196,98,45,${op})`;
        ctx.fillRect(x-1.5,(h-Math.max(bh,3))/2,3,Math.max(bh,3));
      }
      setProgress(p => { const n=Math.min(100,p+0.04); if(n>=100) setPlaying(false); return n; });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const secs = Math.round((progress/100)*120);
  const timeStr = `${Math.floor(secs/60)}:${String(secs%60).padStart(2,"0")}`;

  return (
    <motion.div
      style={{ rotate: 6 }}
      whileHover={{ rotate: 2, scale: 1.03 }}
      transition={SPRING}
      className="w-[280px] shrink-0 overflow-hidden rounded-[22px] shadow-[0_18px_55px_rgba(0,0,0,0.35)] ring-1 ring-white/10 sm:w-[340px]"
    >
      <div className="relative flex h-[158px] items-center justify-center overflow-hidden bg-[#0a0a0a] sm:h-[190px]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <motion.button
          type="button"
          onClick={() => setPlaying(v=>!v)}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.1 }}
          transition={SPRING}
          className="relative z-10 flex size-14 items-center justify-center rounded-full bg-[#c4622d]/90 hover:bg-[#c4622d]"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="5" y="4" width="4" height="16"/><rect x="15" y="4" width="4" height="16"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><polygon points="6,4 20,12 6,20"/></svg>
          )}
        </motion.button>
      </div>
      <div className="flex items-center gap-2 bg-[#1a1a1a] px-4 py-3">
        <div className="h-[3px] flex-1 cursor-pointer overflow-hidden rounded-full bg-white/10"
          onClick={e=>{ const r=e.currentTarget.getBoundingClientRect(); setProgress(Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100))); }}>
          <div className="h-full rounded-full bg-[#c4622d] transition-[width] duration-100" style={{width:`${progress}%`}}/>
        </div>
        <span className="font-mono text-[8px] tabular-nums text-white/40">{timeStr}</span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   NOTE LINES — lined paper style
───────────────────────────────────────── */
const NOTE_LINES = [
  { text: "ros2 launch nav2_bringup navigation_launch.py", indent: 0 },
  { text: "map → odom → base_link must stay connected", indent: 1 },
  { text: "check /tf tree before tuning controller", indent: 1 },
  { text: "record a rosbag before changing params", indent: 0 },
  { text: "DWB vs TEB: use TEB for tight spaces", indent: 0 },
];

function NoteLines() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="mt-5 flex flex-1 flex-col">
      {/* paper top binding strip */}
      <div className="flex items-center gap-1.5 rounded-t-[14px] bg-[#c4622d]/10 px-4 py-2 dark:bg-[#c4622d]/15">
        {[0,1,2].map(i=>(
          <div key={i} className="h-3 w-3 rounded-full border-2 border-[#c4622d]/40 bg-transparent"/>
        ))}
        <span className="ml-2 font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#c4622d]/60">notes.md</span>
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c4622d]/70"/>
      </div>

      {/* lined paper body */}
      <div className="relative flex-1 overflow-hidden rounded-b-[14px] bg-[#fdfcfb] dark:bg-[#0f0d0a]">
        {/* red margin line */}
        <div className="absolute left-10 top-0 h-full w-px bg-red-300/40 dark:bg-red-900/40"/>
        {/* blue horizontal rules */}
        {[0,1,2,3,4,5,6,7,8].map(i=>(
          <div key={i} className="absolute left-0 right-0 h-px bg-blue-200/40 dark:bg-blue-900/20"
            style={{top:`${i*36+28}px`}}/>
        ))}

        {NOTE_LINES.map((line, i) => (
          <motion.div
            key={line.text}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.18, ease: EASE }}
            className="relative flex items-baseline gap-3 px-4 py-2"
            style={{ paddingLeft: `${16 + line.indent * 18}px`, marginTop: i === 0 ? 8 : 0 }}
          >
            {/* line number */}
            <span className="w-5 shrink-0 text-right font-mono text-[9px] text-foreground/20">{i+1}</span>
            {/* text with typewriter cursor on last char */}
            <motion.span
              className="font-mono text-[11px] leading-[1.6] text-foreground/65"
              style={{ fontFamily: "'Courier New', monospace" }}
            >
              {line.indent > 0 && <span className="text-[#c4622d]/50">{"  ".repeat(line.indent)}</span>}
              {line.text}
              {inView && (
                <motion.span
                  className="ml-0.5 inline-block w-[1.5px] bg-[#c4622d]"
                  style={{ height: "0.9em", verticalAlign: "middle" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0,1,0] }}
                  transition={{ delay: i*0.18+0.55, duration: 0.8, repeat: i === NOTE_LINES.length-1 ? Infinity : 0, repeatDelay: 0.4 }}
                />
              )}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   COMMUNITY FEED — animated chat bubbles
───────────────────────────────────────── */
const MESSAGES = [
  {
    author: "Arjun",
    initials: "AK",
    body: "Nav2 starts but my robot spins in place after setting a goal. TF issue or controller tuning?",
    side: "left" as const,
    from: { x: -80, y: 30, rotate: -12, scale: 0.4 },
  },
  {
    author: "TheOddOnes",
    initials: "TO",
    body: "Check TF first. Confirm map→odom→base_link is stable, then replay a rosbag and tune controller_server params.",
    side: "right" as const,
    from: { x: 80, y: -30, rotate: 12, scale: 0.4 },
  },
];

function CommunityFeed() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    MESSAGES.forEach((_, i) => setTimeout(() => setShown(c => Math.max(c, i+1)), i*520+100));
  }, [inView]);

  return (
    <div ref={ref} className="mt-5 flex flex-1 flex-col justify-center gap-4 rounded-[18px] bg-card p-4 shadow-[0_8px_0_rgba(13,38,58,0.05),0_12px_22px_rgba(13,38,58,0.08)] ring-1 ring-border/30 dark:bg-[#1a1612] dark:ring-white/[0.05]">
      <AnimatePresence>
        {MESSAGES.map((m, i) => shown > i && (
          <motion.div
            key={m.author}
            className={`flex items-end gap-2.5 ${m.side === "right" ? "flex-row-reverse ml-6" : "mr-6"}`}
            initial={{ opacity: 0, x: m.from.x, y: m.from.y, rotate: m.from.rotate, scale: m.from.scale }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 22, mass: 0.8 }}
          >
            {/* avatar */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.08 }}
              className={`flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold ${
                m.side === "right" ? "bg-[#c4622d] text-white" : "bg-muted text-foreground/55 dark:bg-[#1a1612]"
              }`}
            >
              {m.initials}
            </motion.div>

            {/* bubble */}
            <motion.div
              className={`max-w-[82%] rounded-[18px] px-4 py-3 shadow-[0_4px_0_rgba(13,38,58,0.05),0_8px_20px_rgba(13,38,58,0.10)] ring-1 ring-border/20 dark:ring-white/[0.05] ${
                m.side === "right"
                  ? "rounded-br-[4px] bg-[#c4622d] text-white"
                  : "rounded-bl-[4px] bg-muted/60 text-foreground dark:bg-[#0f0d0b]"
              }`}
              whileHover={{ y: -2 }}
              transition={SPRING}
            >
              <p className={`mb-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${m.side==="right" ? "text-white/55" : "text-foreground/30"}`}>
                {m.author}
              </p>
              <p className={`font-space text-[12px] font-light leading-[1.6] ${m.side==="right" ? "text-white/85" : "text-foreground/60"}`}>
                {m.body}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   SHARED CARD SHELL
───────────────────────────────────────── */
function Card({ children, className="", delay=0, fullWidth=false }:
  { children: React.ReactNode; className?: string; delay?: number; fullWidth?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      whileHover={{ y: -4 }}
      className={`group rounded-[30px] bg-card p-3 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-border/40 dark:bg-[#1a1612] dark:shadow-[0_14px_0_rgba(0,0,0,0.2),0_22px_38px_rgba(0,0,0,0.3)] dark:ring-white/[0.04] ${fullWidth?"md:col-span-2":""} ${className}`}
    >
      <div className="flex h-full min-h-[340px] flex-col overflow-hidden rounded-[22px] border border-border/30 bg-muted/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.04] dark:bg-[#0f0d0b] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:p-8">
        {children}
      </div>
    </motion.div>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] bg-card p-3 shadow-[0_6px_0_rgba(13,38,58,0.07),0_8px_18px_rgba(13,38,58,0.10)] ring-1 ring-border/30 dark:bg-[#1e1a16] dark:ring-white/[0.05]">
      <div className="rounded-[10px] bg-muted/60 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-[#161310] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        {children}
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-card px-3 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] text-foreground/40 shadow-[0_2px_0_rgba(13,38,58,0.06),0_3px_8px_rgba(13,38,58,0.07)] ring-1 ring-border/30 dark:bg-[#1a1612] dark:ring-white/[0.05]">
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function WhyTheOddOnes() {
  return (
    <section className="bg-background px-2 py-20 md:px-10 md:py-28 dark:bg-[#0a0806]">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center rounded-full border border-border/60 bg-muted px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            But why TheOddOnes?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-4 font-space text-3xl font-extrabold tracking-tight text-foreground md:text-[42px] md:leading-[1.1]"
          >
            Not a course.{" "}
            <motion.span
              className="inline-block text-[#c4622d]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              A real environment.
            </motion.span>
          </motion.h2>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ── Card 1: Videos (full width) ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65, delay: 0, ease: EASE }}
            whileHover={{ y: -4 }}
            className="group rounded-[30px] bg-card p-3 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-border/40 dark:bg-[#1a1612] dark:shadow-[0_14px_0_rgba(0,0,0,0.2),0_22px_38px_rgba(0,0,0,0.3)] dark:ring-white/[0.04] md:col-span-2"
          >
            <div className="relative flex min-h-[300px] flex-col overflow-visible rounded-[22px] border border-border/30 bg-muted/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.04] dark:bg-[#0f0d0b] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:flex-row md:items-stretch md:p-8">
              <div className="flex flex-1 flex-col justify-between pr-0 md:pr-[220px]">
                <div className="flex items-start justify-between">
                  <IconBox>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c4622d]">
                      <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M4 4l4 4M20 4l-4 4M4 20l4-4M20 20l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                      <circle cx="3" cy="3" r="1.5" fill="currentColor" opacity="0.5"/>
                      <circle cx="21" cy="3" r="1.5" fill="currentColor" opacity="0.5"/>
                      <circle cx="3" cy="21" r="1.5" fill="currentColor" opacity="0.5"/>
                      <circle cx="21" cy="21" r="1.5" fill="currentColor" opacity="0.5"/>
                    </svg>
                  </IconBox>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/25">01</span>
                </div>
                <div className="mt-8">
                  <h3 className="font-heading text-[21px] font-extrabold leading-tight tracking-tight text-foreground">
                    ROS2 video walkthroughs
                  </h3>
                  <p className="mt-3 font-space text-[13px] font-light leading-[1.75] text-foreground/50">
                    Bite-sized practitioner recordings. No fluff, no 3-hour lectures — just the part you actually need, from engineers who&apos;ve shipped it.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["ROS2", "Navigation", "Simulation"].map(t => <Tag key={t} label={t}/>)}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-center md:absolute md:right-10 md:top-1/2 md:mt-0 md:-translate-y-1/2">
                <MiniPlayer />
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: Notes ── */}
          <Card delay={0.08}>
            <div className="flex items-start justify-between">
              <IconBox>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c4622d]">
                  <path d="M4 6h16M4 10h10M4 14h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <rect x="14" y="12" width="7" height="8" rx="2" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </IconBox>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/25">02</span>
            </div>

            <NoteLines />

            <div className="mt-auto pt-5">
              <h3 className="font-heading text-[21px] font-extrabold leading-tight tracking-tight text-foreground">
                Structured notes
              </h3>
              <p className="mt-3 font-space text-[13px] font-light leading-[1.75] text-foreground/50">
                Always up to date. Written by practitioners, not summarised from Wikipedia.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Guides", "Always updated"].map(t => <Tag key={t} label={t}/>)}
              </div>
            </div>
          </Card>

          {/* ── Card 3: Community ── */}
          <Card delay={0.16}>
            <div className="flex items-start justify-between">
              <IconBox>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#c4622d]">
                  <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6"/>
                  <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
                  <path d="M3 19c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M17 14c1.657 0 3 1.12 3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </IconBox>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/25">03</span>
            </div>

            <CommunityFeed />

            <div className="mt-auto pt-5">
              <h3 className="font-heading text-[21px] font-extrabold leading-tight tracking-tight text-foreground">
                Community of builders
              </h3>
              <p className="mt-3 font-space text-[13px] font-light leading-[1.75] text-foreground/50">
                Paid Discord. Real people, real robots. Direct access to engineers who&apos;ve already broken everything you&apos;re about to break.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Discord", "Peer review", "Build-alongs"].map(t => <Tag key={t} label={t}/>)}
              </div>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
}
