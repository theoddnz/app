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
    <section className="bg-background px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">

        {/* header */}
        <div className="mb-16 text-center">
           <motion.p
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: EASE }}
    className="inline-flex items-center rounded-full border border-border/60 bg-muted px-3 py-1 font-space text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
  >
    Robotics Roadmap
  </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-4 font-space text-3xl font-light tracking-[-0.3em] text-foreground md:text-[42px] md:leading-[1.1]"
          >
            From zero to robotics engineer - {" "}
            <span className="text-foreground/40">by building the real thing.</span>
          </motion.h2>

            <motion.p
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
    className="mx-auto mt-6 max-w-2xl font-space text-[15px] leading-relaxed text-muted-foreground"
  >
    Learn ROS2, simulation, navigation, robot architecture, and real-world
    debugging through hands-on projects that mirror how robotics teams build
    production systems.
  </motion.p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: EASE }}
              className="flex flex-col gap-6 rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900 px-6 py-7 text-center transition-colors duration-200 hover:bg-accent/20"
            >
              <span className="font-space text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] tabular-nums text-muted-foreground/30">
                {card.number}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="font-space text-[18px] font-medium leading-snug text-foreground">
                  {card.title}
                </h3>
                <p className="font-space text-[13.5px] font-light leading-[1.7] text-muted-foreground/60">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}