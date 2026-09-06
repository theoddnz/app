"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "@/components/ui/tabler-icons";
import { useActionState } from "react";

import { loginAction, signupAction } from "@/app/admin-actions";
import { SocialAuthButtons } from "@/components/auth/SocialAuthButtons";
import { Button3D } from "@/components/ui/button-3d";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { ActionState } from "@/types/admin";

const EASE = [0.16, 1, 0.3, 1] as const;

const initialState: ActionState = {
  ok: false,
  message: "",
};

const copy = {
  login: {
    heading: "Welcome back",
    sub: "Sign in to continue learning, writing, or managing TheOddOnes.",
    submit: "Sign in",
    switchText: "Don't have an account?",
    switchHref: "/signup",
    switchLabel: "Sign up free",
  },
  signup: {
    heading: "Create your account",
    sub: "Join TheOddOnes and start learning with a project-first path.",
    submit: "Create account",
    switchText: "Already have an account?",
    switchHref: "/login",
    switchLabel: "Sign in",
  },
};

function OrDivider() {
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border dark:bg-white/[0.08]" />
      <span className="font-sans text-[11px] font-semibold uppercase text-foreground/35">or</span>
      <div className="h-px flex-1 bg-border dark:bg-white/[0.08]" />
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
        <Label htmlFor={id} className="font-sans text-xs font-semibold text-foreground/55">
          {label}
        </Label>
        {action && actionHref ? (
          <Link href={actionHref} className="font-sans text-xs font-medium text-foreground/40 transition-colors hover:text-foreground/70">
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
            "h-11 w-full rounded-md border border-border bg-background px-4 dark:border-white/[0.08] dark:bg-[#181818]",
            "font-sans text-sm text-foreground placeholder:text-foreground/25",
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

export function UserAuthCard({ mode, next }: { mode: "login" | "signup"; next?: string }) {
  const isSignup = mode === "signup";
  const page = copy[mode];
  const [loginState, loginFormAction, loginPending] = useActionState(loginAction, initialState);
  const [signupState, signupFormAction, signupPending] = useActionState(signupAction, initialState);
  const state = isSignup ? signupState : loginState;
  const pending = isSignup ? signupPending : loginPending;

  return (
    <main className="relative grid min-h-[100svh] overflow-hidden bg-background px-4 py-4 text-foreground sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-56 max-w-xl rounded-full bg-secondary/10 blur-3xl"
      />
      <div className="relative mx-auto flex min-h-[calc(100svh-2rem)] w-full max-w-[430px] items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease: EASE }}
            className="w-full rounded-lg bg-card p-2 shadow-[0_8px_0_rgba(13,38,58,0.07),0_18px_42px_rgba(13,38,58,0.14)] ring-1 ring-black/[0.05] backdrop-blur dark:bg-[#181818] dark:shadow-[0_8px_0_rgba(0,0,0,0.25),0_18px_46px_rgba(0,0,0,0.42)] dark:ring-white/[0.08]"
          >
            <div className="rounded-lg border border-black/[0.04] bg-background/86 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] dark:border-white/[0.08] dark:bg-[#242424]/92 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:px-7 sm:py-6">
              <Link href="/" className="mb-5 inline-flex items-center gap-2" aria-label="TheOddOnes home">
                <Image
                  src="/assets/theoddones-white-logo.png"
                  alt="TheOddOnes"
                  width={44}
                  height={44}
                  priority
                  className="size-11 object-contain dark:hidden"
                />
                <Image
                  src="/assets/theoddones-black-logo.png"
                  alt="TheOddOnes"
                  width={44}
                  height={44}
                  priority
                  className="hidden size-11 object-contain dark:block"
                />
              </Link>

              <div>
                <h1 className="font-sans text-2xl font-extrabold leading-tight text-foreground sm:text-[1.85rem]">
                  {page.heading}
                </h1>
                <p className="mt-2 font-sans text-sm leading-6 text-foreground/50">{page.sub}</p>
              </div>

              <form action={isSignup ? signupFormAction : loginFormAction} className="mt-5 space-y-3.5">
                {next ? <input type="hidden" name="next" value={next} /> : null}
                <SocialAuthButtons />
                <OrDivider />

                {isSignup ? <Field id="name" label="Full name" placeholder="Your name" /> : null}
                <Field id="email" label="Email" type="email" placeholder="Email" />
                <Field
                  id="password"
                  label="Password"
                  type="password"
                  placeholder={isSignup ? "Min. 8 characters" : "Password"}
                  action={isSignup ? undefined : "Forgot password?"}
                  actionHref="/login"
                />

                {state.message ? <p className="text-sm text-destructive">{state.message}</p> : null}

                <Button3D className="w-full" type="submit" disabled={pending}>
                  {pending ? <Loader2 className="size-4 animate-spin" /> : null}
                  {page.submit}
                </Button3D>

                <p className="text-center font-sans text-xs leading-5 text-foreground/40">
                  {page.switchText}{" "}
                  <Link href={page.switchHref} className="font-semibold text-foreground/65 transition-colors hover:text-foreground">
                    {page.switchLabel}
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
