"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  Check,
  Loader2,
  Lock,
  Play,
  Sparkles,
  Trophy,
  Zap,
} from "@/components/ui/tabler-icons";
import { Button3D } from "@/components/ui/button-3d";

const PERKS = [
  { icon: Play, label: "Vertical mini-series - watch, don't read" },
  { icon: Zap, label: "Checkpoints that make the lesson stick" },
  { icon: Bot, label: "Hands-on build projects, not theory dumps" },
  { icon: Trophy, label: "Progress saved across your devices" },
];

export function Paywall({
  seriesId,
  slug,
  title,
  subtitle,
  priceLabel,
  lessonCount,
  isLoggedIn,
}: {
  seriesId: string;
  slug: string;
  title: string;
  subtitle: string;
  priceLabel: string;
  lessonCount: number;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBuy = async () => {
    if (!isLoggedIn) {
      router.push(`/login?next=${encodeURIComponent(`/mini-course/${slug}`)}`);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/mini-course/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seriesId }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error ?? "Could not start checkout.");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-dvh w-full overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-[#c4622d]/20 blur-[120px]"
      />

      <div className="relative mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-8 px-5 py-12 sm:max-w-lg sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-muted px-3 py-1 font-space text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3.5 text-[#c4622d]" />
            Mini-series
          </span>

          <div>
            <h1 className="font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 font-space text-[15px] leading-relaxed text-muted-foreground">
              {subtitle ||
                `${lessonCount > 0 ? `${lessonCount} bite-sized lessons` : "Bite-sized lessons"} stitched into one vertical feed. Watch a clip, answer a quick check, build something real.`}
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {PERKS.map((perk) => (
              <li key={perk.label} className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#c4622d]/12 text-[#c4622d]">
                  <perk.icon className="size-4" />
                </span>
                <span className="font-space text-[14px] text-foreground/80">{perk.label}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-extrabold text-foreground">{priceLabel}</span>
                  <span className="font-space text-sm text-muted-foreground">/ month</span>
                </div>
                <p className="mt-1 font-space text-[12px] text-muted-foreground">Cancel anytime.</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2.5 py-1 font-space text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <BadgeCheck className="size-3.5" />
                Full access
              </span>
            </div>

            <div className="mt-5">
              <Button3D onClick={handleBuy} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Starting checkout...
                  </>
                ) : (
                  <>
                    <Lock className="size-4" />
                    {isLoggedIn ? `Subscribe · ${priceLabel}/mo` : "Sign in to subscribe"}
                  </>
                )}
              </Button3D>
            </div>

            {error ? (
              <p className="mt-3 text-center font-space text-[12px] text-destructive">{error}</p>
            ) : (
              <p className="mt-3 flex items-center justify-center gap-1.5 font-space text-[11px] text-muted-foreground">
                <Check className="size-3.5 text-emerald-500" />
                Secure checkout via Dodo Payments
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
