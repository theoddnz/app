// components/ui/button-3d.tsx
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

const Button3D = forwardRef<HTMLButtonElement, Button3DProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const isPrimary = variant === "primary";

    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex cursor-pointer border-none bg-transparent p-0 outline-none",
          "disabled:pointer-events-none disabled:opacity-55",
          className
        )}
        {...props}
      >
        {/* Bottom face */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 inset-y-0 rounded-full translate-y-[4px]",
            isPrimary
              ? "bg-[#6f2c14] shadow-[0_8px_18px_rgba(84,31,12,0.22)]"
              : "bg-[rgba(196,98,45,0.28)]"
          )}
        />

        {/* Top face */}
        <span
          className={cn(
            "pointer-events-none relative z-10 w-full",
            "inline-flex items-center justify-center gap-2 rounded-full",
            "font-heading font-semibold tracking-[0.02em] text-[#fff4ed] select-none",
            // responsive size
            "text-[13px] px-5 py-2 sm:text-[14px] sm:px-6 sm:py-2.5 md:text-[15px] md:px-7 md:py-3",
            // translate states
            "translate-y-0 group-active:translate-y-[4px]",
            "transition-transform duration-75",
            // variant
            isPrimary
              ? [
                  "border border-white/[0.16]",
                  "bg-[linear-gradient(180deg,#d96e3a_0%,#bd5b2b_52%,#95431d_100%)]",
                ].join(" ")
              : [
                  "border border-[rgba(196,98,45,0.5)] bg-background text-foreground",
                ].join(" "),
            // inset sheen
            "shadow-[0_1px_0_rgba(255,255,255,0.26)_inset,0_-1px_0_rgba(0,0,0,0.22)_inset,0_0_0_1px_rgba(255,255,255,0.04)_inset]",
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

Button3D.displayName = "Button3D";
export { Button3D };
