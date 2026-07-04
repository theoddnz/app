"use client";

import { useEffect, useMemo, useState } from "react";

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: value >= 10000 ? 1 : 0,
  }).format(value);
}

export function ViewCountBadge({ views }: { views: number | null }) {
  const target = views ?? 0;
  const start = useMemo(() => Math.max(0, Math.floor(target * 0.72)), [target]);
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!views) {
      return;
    }

    let frame = 0;
    let startTime = 0;
    const duration = 1100;

    const tick = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(start + (target - start) * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [start, target, views]);

  if (views === null) {
    return (
      <p className="inline-flex items-center gap-3 rounded-md border border-black/[0.08] bg-white/55 px-4 py-2 dark:border-white/[0.08] dark:bg-white/[0.03]">
        <span className="h-px w-7 bg-[#c4622d]/55" aria-hidden="true" />
        <span className="font-heading text-sm font-semibold uppercase tracking-[0.08em] text-black/45 dark:text-white/35">
          Views updating
        </span>
      </p>
    );
  }

  return (
    <p
      className="inline-flex items-center gap-2 rounded-md border border-black/[0.08] bg-white/55 px-4 py-2 dark:border-white/[0.08] dark:bg-white/[0.03]"
      aria-label={`${views.toLocaleString("en-US")} recorded page views`}
    >
 
      <span className="font-heading text-lg font-semibold leading-none tracking-[0.02em] text-black/65 dark:text-white/60">
        {formatCompact(count)}
      </span>
      <span className="font-space text-xs font-medium uppercase tracking-[0.16em] text-black/35 dark:text-white/35">
        views
      </span>
    </p>
  );
}
