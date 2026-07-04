"use client";

import Link from "next/link";
import { motion, cubicBezier } from "framer-motion";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

const BLOG_SLUG = "why-we-started-theoddones";
const YOUTUBE_ID = "Bt6i3AT4uMU";

export default function WhyWeStarted() {
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
            Our story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
            className="mt-4 font-space text-3xl font-extrabold tracking-tight text-foreground/80 md:text-[42px] md:leading-[1.1]"
          >
            Why we started{" "}
            <span className="text-[#c4622d]">TheOddOnes.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl font-space text-[15px] leading-relaxed text-muted-foreground"
          >
            A few years back I was just a guy trying to get into robotics with no clear
            plan and no one to guide me. Here is the story of why that led me to build
            The Odd Ones.
          </motion.p>
        </div>

        {/* video — 3D card shell */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className="group rounded-[30px] bg-card p-2.5 shadow-[0_14px_0_rgba(13,38,58,0.07),0_22px_38px_rgba(13,38,58,0.12)] ring-1 ring-black/5 dark:bg-[#181818] dark:shadow-[0_14px_0_rgba(0,0,0,0.24),0_22px_42px_rgba(0,0,0,0.38)] dark:ring-white/8"
        >
          <div className="aspect-video w-full overflow-hidden rounded-[24px] border border-black/4 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/8 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
              title="Why we started The Odd Ones"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="size-full"
            />
          </div>
        </motion.div>

        <p className="mt-8 text-center font-space text-[15px] leading-relaxed text-muted-foreground">
          If you want more,{" "}
          <Link
            href={`/blogs/${BLOG_SLUG}`}
            className="font-semibold text-[#c4622d] underline-offset-4 transition-colors hover:underline"
          >
            read this blog
          </Link>
          .
        </p>

      </div>
    </section>
  );
}
