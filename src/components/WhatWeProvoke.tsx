"use client";

import { motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

const cards = [
  {
    number: "01",
    title: "Wire it up",
    desc: "Start from zero. Learn electronics, sensors, and actuators by building circuits that actually move things.",
  },
  {
    number: "02",
    title: "Write the code",
    desc: "Program motion, perception, and decision-making. No simulations — real robots, real bugs, real fixes.",
  },
  {
    number: "03",
    title: "Break things publicly",
    desc: "Ship imperfect builds, document what failed, and learn faster than anyone working alone.",
  },
  {
    number: "04",
    title: "Think like an engineer",
    desc: "Move from hobbyist to engineer through first-principles thinking, iteration, and peer review.",
  },
];

export default function WhatWeProvide() {
  return (
    <section className="bg-background px-2 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center rounded-full border border-border/60 bg-muted px-3 py-1 font-space text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
          >
            Robotics Roadmap
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-4 font-space text-3xl font-extrabold tracking-tight text-foreground/80 md:text-[42px] md:leading-[1.1]"
          >
            From zero to robotics engineer -{" "}
            <span className="text-[#c4622d]">by building the real thing.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl font-space text-[15px] leading-relaxed text-muted-foreground"
          >
            Learn ROS2, simulation, navigation, robot architecture, and real-world
            debugging through hands-on projects that mirror how robotics teams build
            production systems.
          </motion.p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="group rounded-[30px] bg-card p-2.5 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-black/[0.05] transition-transform duration-300 hover:-translate-y-1 dark:bg-[#1b1915] dark:shadow-[0_14px_0_rgba(0,0,0,0.24),0_22px_42px_rgba(0,0,0,0.38)] dark:ring-white/[0.08]"
            >
              <div className="flex h-full min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-black/[0.04] bg-muted/60 p-5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.08] dark:bg-[#211f1a] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">

                {/* number */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/30 dark:text-foreground/36">
                    {card.number}
                  </span>
                </div>

                {/* title + desc */}
                <div className="mt-auto pt-10">
                  <h3 className="font-heading text-[20px] font-semibold leading-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 font-space text-[13px] font-light leading-[1.7] text-foreground/50 dark:text-foreground/58">
                    {card.desc}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
