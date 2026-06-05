"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";
import { Armchair, Check, Mail, User, Sparkles } from "@/components/ui/tabler-icons";

import { Button3D } from "@/components/ui/button-3d";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- Field (icon-prefixed, glass, premium) ---------- */
function Field({
  id,
  label,
  icon: Icon,
  ...props
}: {
  id: string;
  label: string;
  icon: React.ElementType;
} & React.ComponentProps<"input">) {
  return (
    <div className="group relative flex flex-col gap-2">
      <Label
        htmlFor={id}
        className="text-[10.5px] tracking-[0.22em] uppercase text-foreground/40 font-medium transition-colors duration-200 group-focus-within:text-[rgba(196,98,45,0.9)]"
      >
        {label}
      </Label>

      <div className="relative">
        <Icon
          size={15}
          strokeWidth={1.75}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 transition-colors duration-200 group-focus-within:text-[#c4622d]"
        />
        <Input
          id={id}
          {...props}
          className={cn(
            "h-[52px] w-full rounded-xl",
            "border border-foreground/[0.08] bg-foreground/[0.015]",
            "pl-11 pr-4 text-[14.5px] font-light text-foreground",
            "placeholder:text-foreground/[0.35] placeholder:font-light",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]",
            "outline-none transition-all duration-200",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            "focus:border-[rgba(196,98,45,0.5)]",
            "focus:bg-[rgba(196,98,45,0.03)]",
            "focus:shadow-[inset_0_1px_0_rgba(255,255,255,0.02),0_0_0_4px_rgba(196,98,45,0.08)]"
          )}
        />
      </div>
    </div>
  );
}

/* ---------- Form ---------- */
export default function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      toast.error("Both fields are required.", {
        description: "We need a name and an email to save your seat.",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("waitlist")
      .insert([{ name: name.trim(), email: email.trim() }]);
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.warning("You're already on the list.", {
          description: "We'll find you when it's time.",
        });
      } else {
        toast.error("Something went wrong.", {
          description: "Please try again in a moment.",
        });
      }
      return;
    }

    toast.success("Seat reserved.", {
      description: "You're one of us now.",
      icon: <Sparkles size={16} className="text-[#c4622d]" />,
    });
    setDone(true);
  }

  return (
    <section id="waitlist" className="relative scroll-mt-24 bg-background px-6 md:px-10 py-24 overflow-hidden text-foreground dark:bg-[#0a0806]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -right-40 h-[560px] w-[560px] -translate-y-1/2 rounded-full opacity-[0.15]"
        style={{
          background: "radial-gradient(closest-side, rgba(196,98,45,0.4), transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center">
        {/* ── LEFT — editorial ── */}
        <div>
          <div className="flex items-center gap-2.5 mb-7">
 
            <p className="text-[11px] tracking-[0.3em] uppercase text-[rgba(196,98,45,0.7)] font-medium">
              Early access
            </p>
          </div>

          <h2
            className="font-space font-extrabold tracking-tight text-foreground leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3.25rem)" }}
          >
            The ones who wait<br />
            never <span className="text-[#c4622d]">break & build anything.</span>
          </h2>

          {/* <p className="text-[14.5px] font-light text-white/45 leading-[1.75] max-w-[440px]">
            We're not launching a product.<br />
            We're finding{" "}
            <span className="font-medium text-white/75">the people who were already building.</span>
            <br />
            If that's you — your seat's been empty long enough.
          </p> */}

          {/* tiny counter */}
          {/* <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.015] px-4 py-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c4622d] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c4622d]" />
            </span>
            <span className="text-[11.5px] tracking-[0.14em] uppercase text-white/50 font-medium">
              247 builders already in
            </span>
          </div> */}
        </div>

        {/* ── RIGHT — form card ── */}
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative"
            >
              {/* Card */}
              <div className="relative rounded-2xl border border-foreground/[0.08] bg-gradient-to-b from-foreground/[0.025] to-foreground/[0.005] p-7 md:p-8 backdrop-blur-sm">
                {/* Corner accent */}
                <div
                  aria-hidden
                  className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[rgba(196,98,45,0.4)] to-transparent"
                />

                <div className="flex items-center gap-2 mb-6">
                  <div className="h-7 w-7 rounded-lg bg-[rgba(196,98,45,0.1)] border border-[rgba(196,98,45,0.25)] flex items-center justify-center">
                    <Armchair size={13} className="text-[#c4622d]" strokeWidth={2} />
                  </div>
                  <p className="text-[12px] tracking-[0.14em] uppercase text-foreground/60 font-medium">
                    Reserve your seat
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <Field
                    id="waitlist-name"
                    label="Your name"
                    icon={User}
                    type="text"
                    placeholder="What do they call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Field
                    id="waitlist-email"
                    label="Email"
                    icon={Mail}
                    type="email"
                    placeholder="The one you actually check"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />

                  <Button3D
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full mt-2 !rounded-xl [&_.btn-3d-face]:!rounded-xl [&_.btn-3d-shadow]:!rounded-xl"
                  >
                    {loading ? (
                      "Saving your seat…"
                    ) : (
                      <>
                        Reserve my seat <Armchair size={15} strokeWidth={2} />
                      </>
                    )}
                  </Button3D>

                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="relative rounded-2xl border border-[rgba(196,98,45,0.2)] bg-gradient-to-b from-[rgba(196,98,45,0.05)] to-foreground/[0.005] p-10 flex flex-col items-center text-center gap-5"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, type: "spring", bounce: 0.4 }}
                className="w-14 h-14 rounded-full flex items-center justify-center border border-[rgba(196,98,45,0.35)] bg-[rgba(196,98,45,0.1)]"
              >
                <Check size={22} strokeWidth={2.5} className="text-[#c4622d]" />
              </motion.div>

              <div>
                <p className="font-space font-extrabold text-[1.6rem] tracking-tight text-foreground mb-2">
                  Seat reserved.
                </p>
                <p className="text-[13.5px] font-light text-foreground/50 leading-relaxed">
                  You&apos;re one of us now.<br />
                  We&apos;ll find you when it&apos;s time.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
