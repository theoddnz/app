// components/ui/button-3d.tsx
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface Button3DProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

const Button3D = forwardRef<HTMLButtonElement, Button3DProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn("btn-3d-root group", className)}
        style={{ position: "relative", display: "inline-flex", cursor: "pointer", border: "none", background: "none", padding: 0, outline: "none" }}
        {...props}
      >
        {/* Bottom face — the depth shadow */}
        <span
          aria-hidden
          className="btn-3d-shadow"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "9999px",
            background: variant === "primary" ? "#6b2810" : "rgba(196,98,45,0.35)",
            transform: "translateY(5px)",
            transition: "transform 0.12s cubic-bezier(0.34,1.2,0.64,1)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        {/* Top face */}
        <span
          className="btn-3d-face"
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 30px",
            borderRadius: "9999px",
            fontFamily: "var(--font-space, sans-serif)",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            color: "#fdf0e8",
            background:
              variant === "primary"
                ? "linear-gradient(160deg,#e8713a 0%,#c4622d 45%,#a84e22 100%)"
                : "transparent",
            border:
              variant === "primary"
                ? "1px solid rgba(255,255,255,0.15)"
                : "1px solid rgba(196,98,45,0.6)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.22) inset, 0 -1px 0 rgba(0,0,0,0.25) inset",
            transform: "translateY(0px)",
            transition:
              "transform 0.12s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.12s ease, background 0.12s ease",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {children}
        </span>
      </button>
    );
  }
);

Button3D.displayName = "Button3D";
export { Button3D };