"use client";

import { useState, useEffect } from "react";
import { Laptop, Moon, Sun } from "@/components/ui/huge-icons";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const themes = [
  { value: "system", label: "System theme", icon: Laptop },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // next-themes needs a client-only render pass before reading theme state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex w-max shrink-0 items-center rounded-full border border-black/10 bg-white/55 p-1 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]" aria-hidden="true">
        {themes.map(({ value, icon: Icon }) => (
          <div key={value} className="inline-flex h-8 w-8 items-center justify-center rounded-full text-black/38 dark:text-white/38">
            <Icon size={14} strokeWidth={1.8} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="inline-flex w-max shrink-0 items-center rounded-full border border-black/10 bg-white/55 p-1 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]"
      aria-label="Theme selector"
      role="group"
    >
      {themes.map(({ value, label, icon: Icon }) => {
        const active = (theme ?? "system") === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              active
                ? "bg-black text-white shadow-sm dark:bg-white dark:text-black"
                : "text-black/38 hover:text-black dark:text-white/38 dark:hover:text-white"
            )}
            aria-label={label}
            aria-pressed={active}
            title={label}
          >
            <Icon size={14} strokeWidth={1.8} />
          </button>
        );
      })}
    </div>
  );
}
