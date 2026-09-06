"use client";

import { useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import { Button3D } from "@/components/ui/button-3d";
import type { YouTubeShort } from "@/lib/youtube-shorts";

const EASE = cubicBezier(0.16, 1, 0.3, 1);

function ShortCard({ short, index }: { short: YouTubeShort; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: EASE }}
      className="group w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)]"
    >
      <div className="rounded-[22px] bg-card p-1.5 shadow-[0_8px_0_rgba(13,38,58,0.06),0_14px_24px_rgba(13,38,58,0.12)] ring-1 ring-black/[0.05] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_11px_0_rgba(13,38,58,0.08),0_18px_30px_rgba(13,38,58,0.16)] dark:bg-[#181818] dark:shadow-[0_8px_0_rgba(0,0,0,0.24),0_14px_28px_rgba(0,0,0,0.36)] dark:ring-white/[0.08]">
        <div className="relative aspect-9/16 w-full overflow-hidden rounded-[16px] border border-black/[0.04] bg-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:border-white/[0.08]">
        {index === 0 ? (
          <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[#c4622d] px-2.5 py-1 font-space text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-md">
            New
          </span>
        ) : null}
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${short.id}?autoplay=1`}
            title={short.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${short.title}`}
            className="relative size-full cursor-pointer"
          >
            {short.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={short.thumbnail}
                alt={short.title}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="size-full bg-muted" />
            )}

            <span className="absolute inset-0 grid place-items-center bg-linear-to-t from-black/30 via-transparent to-transparent transition-colors group-hover:from-black/40">
              <span className="grid size-12 place-items-center rounded-full border border-white/40 bg-white/20 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-110 md:size-14">
                <svg
                  viewBox="0 0 24 24"
                  className="size-5 translate-x-px fill-white md:size-6"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
        </div>
      </div>

      {short.title ? (
        <p className="mt-2.5 line-clamp-2 px-0.5 font-space text-[13px] font-medium leading-snug text-foreground/70">
          {short.title}
        </p>
      ) : null}
    </motion.div>
  );
}

export default function YouTubeShortsList({
  shorts,
  subscribeUrl,
}: {
  shorts: YouTubeShort[];
  subscribeUrl: string;
}) {
  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4 sm:gap-6">
        {shorts.map((short, index) => (
          <ShortCard key={short.id} short={short} index={index} />
        ))}
      </div>

      <div className="mt-12 flex justify-center md:mt-14">
        <Button3D
          onClick={() =>
            window.open(subscribeUrl, "_blank", "noopener,noreferrer")
          }
        >
          <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
          </svg>
          Subscribe on YouTube
        </Button3D>
      </div>
    </>
  );
}
