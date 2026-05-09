"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button3D } from "@/components/ui/button-3d";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1];

// ─── Logo ────────────────────────────────────────────────────────────────────
function OddOnesLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" className={cn("size-6", className)} aria-label="TheOddOnes">
      <rect width="28" height="28" rx="7" fill="currentColor" opacity="0.12" />
      <circle cx="9" cy="14" r="3" fill="currentColor" />
      <circle cx="19" cy="14" r="3" fill="currentColor" opacity="0.45" />
      <circle cx="14" cy="9" r="2" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

// ─── Social marks ─────────────────────────────────────────────────────────────
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="currentColor" aria-hidden>
      <path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.2.8-.6v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.6-1.3-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.4-1.6 3.4-1.2 3.4-1.2.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.4 0 4.8-2.9 5.9-5.6 6.2.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.3 11.3 0 0 0 12 .7Z" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[15px]" fill="none" aria-hidden>
      <path d="M21.6 12.2c0-.7-.1-1.3-.2-1.9H12v3.6h5.4a4.6 4.6 0 0 1-2 3v2.4h3.3c1.9-1.8 2.9-4.4 2.9-7.1Z" fill="currentColor" opacity=".88" />
      <path d="M12 22c2.7 0 5-.9 6.7-2.5l-3.3-2.4c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3v2.5A10 10 0 0 0 12 22Z" fill="currentColor" opacity=".7" />
      <path d="M6.4 11.9A6.1 6.1 0 0 1 6.1 10c0-.7.1-1.3.3-1.9V5.6H3A10 10 0 0 0 2 10c0 1.6.4 3.2 1 4.4l3.4-2.5Z" fill="currentColor" opacity=".55" />
      <path d="M12 4.1c1.4 0 2.6.5 3.6 1.4l2.7-2.7A9.6 9.6 0 0 0 12 2 10 10 0 0 0 3 5.6l3.4 2.5c.8-2.3 3-4 5.6-4Z" fill="currentColor" opacity=".78" />
    </svg>
  );
}

// ─── Shared field ─────────────────────────────────────────────────────────────
function Field({
  id, label, type = "text", placeholder, value, onChange, action, onAction,
}: {
  id: string; label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  action?: string; onAction?: () => void;
}) {
  const [show, setShow] = React.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="font-space text-[11.5px] font-medium text-foreground/50">
          {label}
        </Label>
        {action && (
          <button type="button" onClick={onAction}
            className="font-space text-[11.5px] text-foreground/40 transition-colors hover:text-foreground/70">
            {action}
          </button>
        )}
      </div>
      <div className="relative">
        <Input
          id={id} type={inputType} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-11 w-full rounded-xl border border-border bg-background px-4",
            "font-space text-[14px] text-foreground placeholder:text-foreground/25",
            "focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-0",
            isPassword && "pr-10",
          )}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow((p) => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/35 transition-colors hover:text-foreground/60"
            aria-label={show ? "Hide password" : "Show password"}>
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function OrDivider() {
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="font-space text-[11px] tracking-[0.18em] text-foreground/30">or</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

// ─── Social buttons ───────────────────────────────────────────────────────────
function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { icon: <GitHubMark />, label: "GitHub" },
        { icon: <GoogleMark />, label: "Google" },
      ].map(({ icon, label }) => (
        <button key={label} type="button"
          className={cn(
            "flex h-10 items-center justify-center gap-2 rounded-xl",
            "border border-border bg-background font-space text-[13px] text-foreground/70",
            "transition-all duration-150 hover:border-foreground/20 hover:bg-accent hover:text-foreground",
          )}>
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}

// ─── Views ────────────────────────────────────────────────────────────────────
type View = "signin" | "signup" | "forgot";

const views: Record<View, { heading: string; sub: string }> = {
  signin: {
    heading: "Welcome back.",
    sub: "Sign in to continue building.",
  },
  signup: {
    heading: "Join the odd ones.",
    sub: "Build in public. Learn from real people.",
  },
  forgot: {
    heading: "Reset your password.",
    sub: "We'll send a reset link to your inbox.",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AuthPage() {
  const [view, setView] = React.useState<View>("signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const prev = view !== "signin" ? "signin" : null;

  return (
    <main className="relative min-h-[100svh] bg-background text-foreground">
      {/* ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[640px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      {/* top bar */}
      

      {/* card */}
      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[420px] items-center px-6 py-10 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: typeof EASE === "function" ? EASE : undefined }}
            className="w-full"
          >
            {/* heading */}
            <h1 className="font-space text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-foreground">
              {views[view].heading}
            </h1>
            <p className="mt-2.5 font-space text-[14px] leading-relaxed text-foreground/45">
              {views[view].sub}
            </p>

            <div className="mt-8 space-y-4">
              {/* forgot — just email + submit */}
              {view === "forgot" && (
                <>
                  <Field id="email" label="Email address" type="email"
                    placeholder="you@domain.com" value={email} onChange={setEmail} />
                  <Button3D className="w-full" type="button">
                    Send reset link
                  </Button3D>
                </>
              )}

              {/* signin */}
              {view === "signin" && (
                <>
                  <SocialButtons />
                  <OrDivider />
                  <Field id="email" label="Email" type="email"
                    placeholder="you@domain.com" value={email} onChange={setEmail} />
                  <Field id="password" label="Password" type="password"
                    placeholder="••••••••" value={password} onChange={setPassword}
                    action="Forgot password?" onAction={() => setView("forgot")} />
                  <Button3D className="w-full" type="button">
                    Sign in
                  </Button3D>
                  <p className="text-center font-space text-[12px] text-foreground/30">
                    Don&apos;t have an account?{" "}
                    <button type="button" onClick={() => setView("signup")}
                      className="text-foreground/55 hover:text-foreground transition-colors">
                      Sign up free
                    </button>
                  </p>
                </>
              )}

              {/* signup */}
              {view === "signup" && (
                <>
                  <SocialButtons />
                  <OrDivider />
                  <Field id="name" label="Full name" type="text"
                    placeholder="Your name" value={name} onChange={setName} />
                  <Field id="email" label="Email" type="email"
                    placeholder="you@domain.com" value={email} onChange={setEmail} />
                  <Field id="password" label="Password" type="password"
                    placeholder="Min. 8 characters" value={password} onChange={setPassword} />
                  <Button3D className="w-full" type="button">
                    Create account
                  </Button3D>
                  <p className="text-center font-space text-[12px] text-foreground/30">
                    By signing up you agree to our{" "}
                    <a href="#" className="text-foreground/55 hover:text-foreground transition-colors">Terms</a>
                    {" "}and{" "}
                    <a href="#" className="text-foreground/55 hover:text-foreground transition-colors">Privacy Policy</a>.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
