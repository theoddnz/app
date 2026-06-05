"use client";

import { useState, useEffect } from "react";
import { IconBrightness } from "@/components/ui/tabler-icons";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // next-themes needs a client-only render pass before reading theme state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground/50"
        aria-hidden="true"
        disabled
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const Icon = isDark ? IconBrightness : IconBrightness;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground/60 transition-colors hover:bg-muted hover:text-foreground"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <Icon size={16} strokeWidth={1.8} />
    </button>
  );
}
