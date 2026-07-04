"use client";

import { useState } from "react";
import { motion, cubicBezier, AnimatePresence } from "framer-motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

const badges = ["All", "Community", "Content", "Membership", "Refunds"];

const faqs = [
  {
    badge: "Content",
    q: "Is the course content free?",
    a: "Yes — all structured notes, guides, project briefs, and video walkthroughs are completely free. No paywall, no drip, no email gate. Just open it and learn.",
  },
  {
    badge: "Content",
    q: "What free content is available?",
    a: "Everything on the learning path: ROS2 guides, electronics notes, simulation walkthroughs, project briefs, and Field Notes written by members. All of it is accessible without paying anything.",
  },
  {
    badge: "Content",
    q: "Are video lessons also free?",
    a: "Yes. All video content is free to access. Videos are short and project-scoped — not hour-long lectures. Watch when you're stuck, not as a substitute for building.",
  },
  {
    badge: "Community",
    q: "What's the difference between free and paid?",
    a: "Content is free for everyone. The Discord community is exclusively for paid members. That's the line. If you want to build in public, get peer reviews, and collaborate with other builders — that's behind the membership.",
  },
  {
    badge: "Community",
    q: "Why is Discord paid-only?",
    a: "Keeping the community paid-only maintains signal quality. Everyone in there is equally invested. No lurkers, no tourists — just people actively building. It keeps the conversation useful.",
  },
  {
    badge: "Community",
    q: "What does the paid Discord include?",
    a: "Topic channels (ROS2, electronics, simulation, builds), peer review threads, member directory, live session announcements, build-along events, and direct access to mentors and senior members.",
  },
  {
    badge: "Membership",
    q: "What exactly does a paid membership cover?",
    a: "Solely Discord access. All content is already free — the membership is your entry into the community layer: peer reviews, collaborations, live sessions, and the member network.",
  },
  {
    badge: "Membership",
    q: "Is there a free trial?",
    a: "No free trial, but there's a 7-day full refund window. Join, participate, and if it isn't what you expected, get your money back — no questions asked.",
  },
  {
    badge: "Refunds",
    q: "What's the refund policy?",
    a: "7 days from purchase, full refund, no questions. Message the support channel or email us directly. After 7 days, refunds aren't available for the current billing period.",
  },
  {
    badge: "Refunds",
    q: "What if the community isn't what I expected?",
    a: "Use the 7-day window — that's what it's there for. We'd rather you leave satisfied than stay resentful. Honest feedback is always welcome if you want to share it.",
  },
];

function BadgePill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ y: 1 }}
      transition={{ duration: 0.15 }}
      className="relative focus:outline-none"
    >
      <div
        className={`rounded-full px-4 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-200 border ${
          active
            ? "bg-foreground text-background border-foreground shadow-[0_4px_0_rgba(0,0,0,0.25)]"
            : "bg-transparent text-foreground/40 border-border/40 hover:text-foreground/70 hover:border-border/70"
        }`}
      >
        {label}
      </div>
    </motion.button>
  );
}

export default function FAQ() {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = active === "All" ? faqs : faqs.filter((f) => f.badge === active);

  return (
    <section className="bg-background px-2 py-20 md:px-10 md:py-28 dark:bg-[#131313]">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center rounded-full border border-border/60 bg-muted px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            FAQ
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-4 font-space text-3xl font-extrabold tracking-tight text-foreground md:text-[42px] md:leading-[1.1]"
          >
            Honest answers for{" "}
            <span className="text-[#c4622d]">serious builders.</span>
          </motion.h2>
        </div>

        {/* Badge filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {badges.map((b) => (
            <BadgePill
              key={b}
              label={b}
              active={active === b}
              onClick={() => { setActive(b); setOpen(null); }}
            />
          ))}
        </motion.div>

        {/* 3D card shell */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          className="rounded-[30px] bg-card p-3 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-border/40 dark:bg-[#181818] dark:shadow-[0_14px_0_rgba(0,0,0,0.2),0_22px_38px_rgba(0,0,0,0.3)] dark:ring-white/[0.04]"
        >
          <div className="overflow-hidden rounded-[22px] border border-border/30 bg-background shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:bg-[#242424] dark:border-white/[0.04]">

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {filtered.map((faq, i) => (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05, ease: EASE }}
                    className={i !== 0 ? "border-t border-border/20 dark:border-white/[0.05]" : ""}
                  >
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-foreground/[0.02]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-200 ${
                            open === i ? "bg-[#c4622d]" : "bg-foreground/20"
                          }`}
                        />
                        <p className="font-heading text-[14.5px] font-semibold leading-snug text-foreground">
                          {faq.q}
                        </p>
                      </div>

                      {/* +/× */}
                      <motion.div
                        animate={{ rotate: open === i ? 45 : 0 }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="flex-shrink-0 text-foreground/30"
                      >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                          <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open === i && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-3 px-6 pb-5">
                            <div className="mt-1 w-1.5 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="mb-2 inline-flex items-center rounded-sm bg-[#c4622d]/10 px-2 py-0.5">
                                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[#c4622d]/80">
                                  {faq.badge}
                                </span>
                              </span>
                              <p className="font-space text-[13.5px] font-semibold leading-[1.8] text-foreground/55">
                                {faq.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
