"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "@/components/ui/huge-icons";
import { useActionState } from "react";

import { loginAction, signupAction } from "@/app/admin-actions";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Button3D } from "@/components/ui/button-3d";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/types/admin";

const EASE = [0.16, 1, 0.3, 1];

const initialState: ActionState = {
  ok: false,
  message: "",
};

const copy = {
  login: {
    heading: "Welcome back.",
    sub: "Sign in as admin or student.",
    submit: "Sign in",
    switchText: "Don't have an account?",
    switchHref: "/users/signup",
    switchLabel: "Sign up free",
  },
  signup: {
    heading: "Join the odd ones.",
    sub: "Create a student account and start learning.",
    submit: "Create account",
    switchText: "Already have an account?",
    switchHref: "/users/login",
    switchLabel: "Sign in",
  },
};

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

function OrDivider() {
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="font-space text-[11px] tracking-[0.18em] text-foreground/30">or</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  action,
  actionHref,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  action?: string;
  actionHref?: string;
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
        {action && actionHref ? (
          <Link href={actionHref} className="font-space text-[11.5px] text-foreground/40 transition-colors hover:text-foreground/70">
            {action}
          </Link>
        ) : null}
      </div>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={inputType}
          placeholder={placeholder}
          className={cn(
            "h-11 w-full rounded-xl border border-border bg-background px-4",
            "font-space text-[14px] text-foreground placeholder:text-foreground/25",
            "focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:ring-offset-0",
            isPassword && "pr-10",
          )}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShow((previous) => !previous)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/35 transition-colors hover:text-foreground/60"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export function UserAuthCard({ mode }: { mode: "login" | "signup" }) {
  const isSignup = mode === "signup";
  const page = copy[mode];
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState);
  const [signupState, signupFormAction, signupPending] = useActionState(signupAction, initialState);
  const state = isSignup ? signupState : loginState;
  const pending = isSignup ? signupPending : loginPending;

  return (
    <main className="relative min-h-[100svh] bg-background text-foreground">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[640px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
      </div>

      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="inline-flex items-center gap-2 font-space text-sm text-foreground/55 hover:text-foreground">
          <ArrowLeft className="size-4" />
          Home
        </Link>
        <OddOnesLogo className="text-foreground" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-72px)] max-w-[420px] items-center px-6 py-10 md:px-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: typeof EASE === "function" ? EASE : undefined }}
            className="w-full"
          >
            <h1 className="font-space text-[2rem] font-bold leading-[1.05] tracking-[-0.04em] text-foreground">
              {page.heading}
            </h1>
            <p className="mt-2.5 font-space text-[14px] leading-relaxed text-foreground/45">{page.sub}</p>

            <form action={isSignup ? signupFormAction : loginFormAction} className="mt-8 space-y-4">
              <SocialAuthButtons />
              <OrDivider />

              {isSignup ? <Field id="name" label="Full name" placeholder="Your name" /> : null}
              <Field id="email" label="Email" type="email" placeholder="you@domain.com" />
              <Field
                id="password"
                label="Password"
                type="password"
                placeholder={isSignup ? "Min. 8 characters" : "Password"}
                action={isSignup ? undefined : "Forgot password?"}
                actionHref="/users/login"
              />

              {state.message ? <p className="text-sm text-destructive">{state.message}</p> : null}

              <Button3D className="w-full" type="submit" disabled={pending}>
                {pending ? <Loader2 className="size-4 animate-spin" /> : null}
                {page.submit}
              </Button3D>

              <p className="text-center font-space text-[12px] text-foreground/30">
                {page.switchText}{" "}
                <Link href={page.switchHref} className="text-foreground/55 transition-colors hover:text-foreground">
                  {page.switchLabel}
                </Link>
              </p>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
