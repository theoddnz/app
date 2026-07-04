"use client";

import { motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);
const SPRING = { type: "spring", stiffness: 340, damping: 26 } as const;

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#c4622d]">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" opacity="0.25"/>
      <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="shrink-0 text-[#c4622d]">
      <rect x="3" y="7" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" className="text-[#c4622d]">
      <path d="M8 1l1.8 4.1H14l-3.4 2.6 1.3 4.3L8 9.5l-3.9 2.5 1.3-4.3L2 5.1h4.2z"/>
    </svg>
  );
}

const FREE_FEATURES = [
  { text: "All video walkthroughs", sub: "Every ROS2 practitioner recording" },
  { text: "Structured notes", sub: "Always up-to-date guides" },
  { text: "Field notes & blogs", sub: "Build logs from startups & engineers" },
];

const PRO_FEATURES = [
  { text: "Everything in Free", sub: "All videos, notes, and blogs", icon: "check" },
  { text: "Private Discord community", sub: "Builders shipping real robots", icon: "lock" },
  { text: "Doubts solved by experts", sub: "Engineers actively working in drone & robotics teams", icon: "lock" },
  { text: "Premium blog posts", sub: "Deep-dives, teardowns & startup build logs", icon: "lock" },
  { text: "Early access to new content", sub: "First look at every new module", icon: "lock" },
];

function FeatureRow({ text, sub, locked = false }: { text: string; sub: string; locked?: boolean }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-border/15 last:border-none dark:border-white/[0.04]">
      {locked ? <LockIcon /> : <CheckIcon />}
      <div className="min-w-0">
        <p className="font-space text-[13px] font-semibold leading-snug text-foreground">{text}</p>
        <p className="mt-0.5 font-space text-[11.5px] font-light leading-snug text-foreground/40">{sub}</p>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section className="bg-background px-2 py-20 md:px-10 md:py-28 dark:bg-[#131313]">
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
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-4 font-space text-3xl font-extrabold tracking-tight text-foreground md:text-[42px] md:leading-[1.1]"
          >
            Start free.{" "}
            <motion.span
              className="inline-block font-heading text-[#c4622d]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              Go deeper for $5.
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="mx-auto mt-4 max-w-md font-space text-[14px] font-light leading-relaxed text-foreground/45"
          >
            No paywalls on the fundamentals. The community and expert access are what you pay for.
          </motion.p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* ── FREE ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, delay: 0, ease: EASE }}
            whileHover={{ y: -4, transition: SPRING }}
            className="rounded-[30px] bg-card p-3 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-border/40 dark:bg-[#181818] dark:shadow-[0_14px_0_rgba(0,0,0,0.2),0_22px_38px_rgba(0,0,0,0.3)] dark:ring-white/[0.04]"
          >
            <div className="flex h-full min-h-[480px] flex-col overflow-hidden rounded-[22px] border border-border/30 bg-muted/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.04] dark:bg-[#242424] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:p-8">

              {/* top */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/30">Free</span>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-heading text-[52px] font-extrabold leading-none tracking-tight text-foreground">$0</span>
                    <span className="font-heading text-[14px] font-light text-foreground/35">/forever</span>
                  </div>
                </div>
                <span className="rounded-full border border-border/40 bg-muted px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-foreground/35">
                  No account needed
                </span>
              </div>

              <p className="mt-4 font-space text-[13px] font-light leading-relaxed text-foreground/45">
                All learning resources are free and open. Read, watch, and reference anything without signing up.
              </p>

              {/* divider */}
              <div className="my-6 h-px bg-border/20 dark:bg-white/[0.05]"/>

              {/* features */}
              <div className="flex flex-col">
                {FREE_FEATURES.map(f => (
                  <FeatureRow key={f.text} text={f.text} sub={f.sub} />
                ))}
              </div>

              {/* cta */}
              <div className="mt-auto pt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  className="w-full rounded-[14px] border border-border/40 bg-card py-3.5 font-space text-[13px] font-semibold text-foreground/60 shadow-[0_4px_0_rgba(13,38,58,0.06)] transition-colors hover:text-foreground dark:bg-[#181818] dark:hover:text-[#f0ebe5]"
                >
                  Start reading — it&apos;s free
                </motion.button>
              </div>

            </div>
          </motion.div>

          {/* ── PRO ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
            whileHover={{ y: -4, transition: SPRING }}
            className="relative rounded-[30px] bg-[#c4622d] p-3 shadow-[0_14px_0_rgba(139,55,15,0.35),0_22px_50px_rgba(139,55,15,0.3)]"
          >
            {/* glow ring */}
            <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-2 ring-[#c4622d]/60"/>

            {/* premium badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.35 }}
                className="flex items-center gap-1.5 rounded-full bg-[#c4622d] px-4 py-1.5 shadow-[0_4px_16px_rgba(196,98,45,0.5)]"
              >
                <StarIcon />
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white">
                  Most popular
                </span>
                <StarIcon />
              </motion.div>
            </div>

            <div className="flex h-full min-h-[480px] flex-col overflow-hidden rounded-[22px] border border-white/20 bg-[#b8561f] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] md:p-8">

              {/* top */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Pro</span>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-heading text-[52px] font-extrabold leading-none tracking-tight text-white">$5</span>
                    <span className="font-heading text-[14px] font-light text-white/50">/month</span>
                  </div>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/60">
                  Cancel anytime
                </span>
              </div>

              <p className="mt-4 font-space text-[13px] font-light leading-relaxed text-white/60">
                Get inside the community. Ask real questions, get answers from engineers building the same things — not random strangers on Reddit.
              </p>

              {/* divider */}
              <div className="my-6 h-px bg-white/15"/>

              {/* features */}
              <div className="flex flex-col">
                {PRO_FEATURES.map((f) => (
                  <div key={f.text} className="flex items-start gap-3 py-2.5 border-b border-white/10 last:border-none">
                    {f.icon === "lock" ? (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-white/70">
                        <rect x="3" y="7" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                        <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0 text-white/70">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" opacity="0.35"/>
                        <path d="M5 8.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    <div className="min-w-0">
                      <p className="font-space text-[13px] font-semibold leading-snug text-white">{f.text}</p>
                      <p className="mt-0.5 font-space text-[11.5px] font-light leading-snug text-white/50">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* cta */}
              <div className="mt-auto pt-8">
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING}
                  className="w-full rounded-[14px] bg-white py-3.5 font-space text-[13px] font-bold text-[#c4622d] shadow-[0_4px_0_rgba(0,0,0,0.15),0_8px_24px_rgba(0,0,0,0.12)]"
                >
                  Join the community — $5/mo
                </motion.button>
                <p className="mt-3 text-center font-mono text-[9.5px] text-white/35">
                  No contracts. Cancel from your dashboard.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
