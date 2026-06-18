"use client";

import { useState } from "react";
import { Check, Share2 } from "@/components/ui/tabler-icons";

export function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall back to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  }

  return (
    <button
      onClick={handleShare}
      aria-label="Share this article"
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground/60 transition-colors hover:border-[#c4622d]/40 hover:text-foreground"
    >
      {copied ? (
        <>
          <Check size={14} className="text-[#c4622d]" />
          Copied
        </>
      ) : (
        <>
          <Share2 size={14} />
          Share
        </>
      )}
    </button>
  );
}
