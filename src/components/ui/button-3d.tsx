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
        className={cn("group relative inline-flex cursor-pointer border-none bg-transparent p-0 outline-none", className)}
        {...props}
      >
        {/* Bottom face */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full translate-y-[5px]",
            "group-hover:translate-y-[6px] group-active:translate-y-[5px]",
            "transition-transform duration-[120ms]",
            isPrimary ? "bg-[#6b2810]" : "bg-[rgba(196,98,45,0.35)]"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.34,1.2,0.64,1)" }}
        />

        {/* Top face */}
        <span
          className={cn(
            "pointer-events-none relative z-10 w-full",
            "inline-flex items-center justify-center gap-2 rounded-full",
            "font-space font-bold tracking-[0.02em] text-[#fdf0e8] select-none",
            // responsive size
            "text-[13px] px-5 py-2 sm:text-[14px] sm:px-6 sm:py-2.5 md:text-[15px] md:px-7 md:py-3",
            // translate states
            "translate-y-0 group-active:translate-y-[5px]",
            "transition-[transform,box-shadow,background] duration-[120ms]",
            // variant
            isPrimary
              ? [
                  "border border-white/[0.15]",
                  "bg-gradient-to-br from-[#e8713a] via-[#c4622d] to-[#a84e22]",
                  "group-hover:from-[#f07840] group-hover:via-[#d06830] group-hover:to-[#b85525]",
                  "group-active:from-[#a84e22] group-active:to-[#943d18]",
                ].join(" ")
              : [
                  "border border-[rgba(196,98,45,0.6)] bg-transparent",
                  "group-hover:bg-[rgba(196,98,45,0.08)] group-hover:border-[rgba(196,98,45,0.9)]",
                ].join(" "),
            // inset sheen
            "shadow-[0_1px_0_rgba(255,255,255,0.22)_inset,0_-1px_0_rgba(0,0,0,0.25)_inset]",
            "group-active:shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_-1px_0_rgba(0,0,0,0.35)_inset]",
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.34,1.2,0.64,1)" }}
        >
          {children}
        </span>
      </button>
    );
  }
);

Button3D.displayName = "Button3D";
export { Button3D };