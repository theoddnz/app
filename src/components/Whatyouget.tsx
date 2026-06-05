"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Map, BookOpen, Trophy, PenLine, ShieldCheck, Globe } from "@/components/ui/tabler-icons";

const EASE = "easeInOut";

const FLAGS = [
  { code: "us", label: "United States" },
  { code: "in", label: "India" },
  { code: "gb", label: "United Kingdom" },
  { code: "de", label: "Germany" },
  { code: "br", label: "Brazil" },
  { code: "jp", label: "Japan" },
  { code: "ng", label: "Nigeria" },
  { code: "ca", label: "Canada" },
];

const items = [
  {
    id: "01",
    icon: Map,
    size: "large",
    label: "Structured learning",
    title: "Roadmaps, not rabbit holes.",
    body: "Every skill has a path. We give you curated roadmaps built by people who've already shipped — so you spend time building, not wandering.",
    stat: "40+ roadmaps",
    statSub: "across disciplines",
  },
  {
    id: "02",
    icon: BookOpen,
    size: "small",
    label: "Real writing",
    title: "Articles written by builders, for builders.",
    body: "Every blog post and article is written by someone actively working on a real product.",
  },
  {
    id: "03",
    icon: Trophy,
    size: "small",
    label: "Rewards & hackathons",
    title: "Build in public. Win in real life.",
    body: "Monthly hackathons, bounties, and rewards for shipping. The best work gets featured, funded, and noticed.",
  },
  {
    id: "04",
    icon: PenLine,
    size: "small",
    label: "Your voice",
    title: "Publish your own story here.",
    body: "Write articles and build logs directly on The Odd Ones. Your work lives alongside the builders you look up to.",
  },
  {
    id: "05",
    icon: ShieldCheck,
    size: "small",
    label: "Verified projects",
    title: "Real projects. Verified builders.",
    body: "Every project in the feed is from a real person, working on a real thing.",
  },
];

export default function WhatYouGet() {
  return (
    <section className="bg-background px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="font-space text-[11px] font-normal tracking-[0.08em] text-muted-foreground"
          >
            What you get
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: "easeInOut" }}
            className="mt-3 font-space text-3xl font-light tracking-[-0.025em] text-foreground md:text-[42px] md:leading-[1.1]"
          >
            Everything the best
            <br />
            <em className="font-light not-italic text-foreground/70">System forgot to teach.</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeInOut" }}
            className="mx-auto mt-4 max-w-xl font-space text-[15px] leading-relaxed text-muted-foreground"
          >
            A living library of real work, real people, and real momentum.
          </motion.p>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          {/* Row 1 — wide card + 2 small */}
          {items.slice(0, 3).map((item, i) => {
            const Icon = item.icon;
            const isLarge = item.size === "large";
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.07, ease: "easeInOut" }}
                className={`relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:bg-accent/40 ${isLarge ? "lg:col-span-2" : "lg:col-span-1"}`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className="font-space text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-space text-[17px] font-semibold leading-snug tracking-[-0.02em] text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-space text-[13px] leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
                {item.stat && (
                  <div className="flex items-end gap-2">
                    <span className="font-space text-3xl font-semibold tracking-[-0.04em] text-foreground">
                      {item.stat}
                    </span>
                    <span className="mb-1 font-space text-[12px] text-muted-foreground">
                      {item.statSub}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Row 2 — 2 small cards */}
          {items.slice(3, 5).map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.07, ease: "easeInOut" }}
                className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:bg-accent/40 lg:col-span-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="font-space text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </span>
                </div>
                <div>
                  <h3 className="font-space text-[17px] font-semibold leading-snug tracking-[-0.02em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-space text-[13px] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Row 2 — featured global card (col-span-2) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.14, ease: "easeInOut" }}
            className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border-2 border-primary/50 bg-primary/[0.03] p-6 lg:col-span-2"
          >
            {/* icon + label */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <Globe size={18} strokeWidth={1.5} />
              </div>
              <span className="font-space text-[11px] font-medium uppercase tracking-[0.18em] text-primary/70">
                Global community
              </span>
            </div>

            {/* text */}
            <div>
              <h3 className="font-space text-[17px] font-semibold leading-snug tracking-[-0.02em] text-foreground">
                Learn from peers building across the planet.
              </h3>
              <p className="mt-2 font-space text-[13px] leading-relaxed text-muted-foreground">
                The Odd Ones is borderless. Get feedback, collaborate, and grow
                alongside builders from every corner of the world.
              </p>
            </div>

            {/* stats + flags */}
            <div className="mt-1 grid gap-4 md:grid-cols-[auto_1fr] md:items-end">
              {/* stats */}
              <div className="flex gap-6 rounded-xl border border-border bg-background/60 px-4 py-3">
                <div>
                  <p className="font-space text-2xl font-semibold tracking-[-0.04em] text-foreground">8+</p>
                  <p className="mt-0.5 font-space text-[11px] uppercase tracking-[0.14em] text-muted-foreground">countries</p>
                </div>
                <div className="w-px bg-border" />
                <div>
                  <p className="font-space text-2xl font-semibold tracking-[-0.04em] text-foreground">24/7</p>
                  <p className="mt-0.5 font-space text-[11px] uppercase tracking-[0.14em] text-muted-foreground">feedback</p>
                </div>
              </div>

              {/* flags — 8 real images in a row */}
              <div className="flex flex-wrap gap-2">
                {FLAGS.map(({ code, label }) => (
                  <span
                    key={code}
                    title={label}
                    aria-label={label}
                    className="overflow-hidden rounded-md border border-border shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                    style={{ width: 40, height: 27, display: "inline-flex", flexShrink: 0 }}
                  >
                    <Image
                      src={`https://flagcdn.com/w80/${code}.png`}
                      width={40}
                      height={27}
                      alt={label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      unoptimized
                    />
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
