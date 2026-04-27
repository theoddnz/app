// components/WaitlistForm.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button3D } from "@/components/ui/button-3d";
import { Armchair, Check } from "lucide-react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WaitlistForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState("");

//   async function handleSubmit() {
//     if (!name.trim() || !email.trim()) {
//       setError("Both fields are required.");
//       return;
//     }
//     setError("");
//     setLoading(true);

//     const { error: sbError } = await supabase
//       .from("waitlist")           // ← your table name
//       .insert([{ name: name.trim(), email: email.trim() }]);

//     setLoading(false);

//     if (sbError) {
//       setError(sbError.code === "23505"
//         ? "You're already on the list."
//         : "Something went wrong. Try again.");
//       return;
//     }

//     setDone(true);
//   }

  return (
    <section id="waitlist" className="bg-[#0a0806] px-6 py-24">
      <div className="max-w-4xl mx-auto">

        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-7">
    
        
          
       
          <p className="text-[12px] tracking-[0.28em] uppercase text-[rgba(196,98,45,0.6)] font-medium">
           Early access
          </p>
 
        </div>



        {/* Heading */}
        <h2
          className="font-space font-extrabold tracking-tight text-[#f0ebe5] leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
        >
          The ones who wait<br />
          never <span className="text-[#c4622d]">break & build anything.</span>
        </h2>

        {/* Para */}
        {/* <p className="text-[14px] font-light text-[rgba(240,235,229,0.4)] leading-[1.7] mb-10 max-w-[420px]">
          We're not launching a product.<br />
          We're finding{" "}
          <span className="font-medium text-[rgba(240,235,229,0.7)]">
            the people who were already building.
          </span>
          <br />
          If that's you — your seat's been empty long enough.
        </p> */}

        {/* Form / Success */}
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col gap-3.5"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.25)] font-medium">
                  Your name
                </label>
                <input
                  type="text"
                  placeholder="What do they call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-[14px] font-light text-[#f0ebe5] placeholder:text-white/[0.18] outline-none transition-all duration-200 focus:border-[rgba(196,98,45,0.5)] focus:bg-[rgba(196,98,45,0.04)] focus:shadow-[0_0_0_3px_rgba(196,98,45,0.08)]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] tracking-[0.12em] uppercase text-[rgba(255,255,255,0.25)] font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="The one you actually check"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                //   onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3.5 text-[14px] font-light text-[#f0ebe5] placeholder:text-white/[0.18] outline-none transition-all duration-200 focus:border-[rgba(196,98,45,0.5)] focus:bg-[rgba(196,98,45,0.04)] focus:shadow-[0_0_0_3px_rgba(196,98,45,0.08)]"
                />
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[12px] text-[rgba(196,98,45,0.8)] font-light"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* CTA */}
              <Button3D
                className="max-w-max mt-1.5 !rounded-xl [&_.btn-3d-face]:!rounded-xl [&_.btn-3d-shadow]:!rounded-xl"
                // onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Saving your seat…" : (
                  <>
                    Reserve my seat <Armchair size={15} strokeWidth={2} />
                  </>
                )}
              </Button3D>

              {/* <p className="text-center text-[11px] font-light text-[rgba(255,255,255,0.18)] mt-1 leading-relaxed">
                <br className="sm:hidden" /> Just a message when it's ready.
              </p> */}
            </motion.div>

          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-center text-center gap-4 py-10"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, type: "spring", bounce: 0.4 }}
                className="w-12 h-12 rounded-full flex items-center justify-center border border-[rgba(196,98,45,0.3)] bg-[rgba(196,98,45,0.1)]"
              >
                <Check size={20} strokeWidth={2.5} className="text-[#c4622d]" />
              </motion.div>

              <div>
                <p className="font-space font-extrabold text-[1.5rem] tracking-tight text-[#f0ebe5] mb-1.5">
                  Seat reserved.
                </p>
                <p className="text-[13px] font-light text-[rgba(240,235,229,0.4)] leading-relaxed">
                  You're one of us now.<br />
                  We'll find you when it's time.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}