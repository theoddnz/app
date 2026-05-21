"use client";

import { motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

const icons = {
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 9.5L5.5 12 8 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 9.5L18.5 12 16 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 8l-2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  people: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="9" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17" cy="7.5" r="2.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 19.5c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 13.5c2.21 0 4 1.567 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  write: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8h6M7 12h6M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 13l1.5-1.5a1.414 1.414 0 012 2L19 15l-3 1 1-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="5" y="12" width="3.5" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="10.25" y="7" width="3.5" height="13" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="15.5" y="4" width="3.5" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

const cards = [
  {
    number: "01",
    icon: icons.code,
    featured: false,
    title: "Build real projects",
    desc: "Work on meaningful projects that build real skills.",
    bullets: [
      "Hands-on learning by building",
      "Real-world problems",
      "Portfolio-worthy work",
      "Learn by doing, not watching",
    ],
  },
  {
    number: "02",
    icon: icons.people,
    featured: true,
    badge: "Most popular",
    title: "Connect & collaborate",
    desc: "Learn and grow with a community of builders.",
    bullets: [
      "Small, focused groups",
      "Peer feedback that helps",
      "Collaborate on ideas",
      "Build real connections",
    ],
  },
  {
    number: "03",
    icon: icons.write,
    featured: false,
    title: "Write & share",
    desc: "Document your journey and help others learn.",
    bullets: [
      "Write about what you learn",
      "Share failures and wins",
      "Build your voice",
      "Inspire and get inspired",
    ],
  },
  {
    number: "04",
    icon: icons.chart,
    featured: false,
    title: "Level up your skills",
    desc: "Go deeper, build smarter, ship better.",
    bullets: [
      "Practical skill development",
      "Feedback that sharpens you",
      "Iterate and improve",
      "Become a better builder",
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-[3px] shrink-0 text-emerald-500 dark:text-emerald-400"
    >
      <path
        d="M2.5 7l3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhatWeProvoke() {
  return (
    <section className="bg-background px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className=" text-[11px] font-normal tracking-[0.08em] text-muted-foreground"
          >
            What we provide
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-3 font-space text-3xl font-normal tracking-[-0.025em] text-foreground md:text-[42px] md:leading-[1.1]"
          >
            Everything you need to
            <br />
            <em className="font-normal not-italic text-foreground/70">learn, build, and grow.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mx-auto mt-4 max-w-xl font-space text-[15px] leading-relaxed text-muted-foreground"
          >
            Learn by building real things, sharing your process, and improving
            through feedback from other builders.
          </motion.p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: i * 0.07, ease: EASE }}
              className={`
                flex flex-col gap-4 rounded-2xl p-6
                transition-colors duration-200
                ${
                  card.featured
                    ? "border-2 border-primary/50 bg-primary/[0.03]"
                    : "border border-border bg-card hover:border-border/80 hover:bg-accent/50"
                }
              `}
            >
              {/* icon */}
              <div className="text-muted-foreground">
                {card.icon}
              </div>

              {/* title + desc */}
              <div>
                <h3 className="font-space text-[18px] font-semibold leading-snug text-foreground">
                  {card.title}
                </h3>
                <p className="mt-1.5 font-space text-[14px] leading-relaxed text-muted-foreground">
                  {card.desc}
                </p>
              </div>

              {/* divider */}
              <div className="h-px w-full bg-border" />

              {/* bullets */}
              <ul className="flex flex-col gap-2">
                {card.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 font-space font-normal text-[14px] leading-snug text-muted-foreground"
                  >
                    <CheckIcon />
                    {b}
                  </li>
                ))}
              </ul>

              {/* badge */}
              {card.badge && (
                <span className="mt-auto self-start rounded-md bg-primary/10 px-2.5 py-1 font-space text-[11px] font-medium text-primary">
                  {card.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
