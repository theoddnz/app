"use client";

import { useRouter } from "next/navigation";
import { Button3D } from "@/components/ui/button-3d";

export default function CTA() {
  const router = useRouter();

  return (
    <section
      id="contribute"
      className="relative bg-background px-2 py-20 text-foreground dark:bg-[#0a0806] md:px-10 md:py-28"
    >
      <div className="relative mx-auto max-w-6xl">

        {/* 3D card shell — same language as the roadmap cards */}
        <div className="rounded-[32px] bg-[#c4622d] p-3 shadow-[0_20px_0_rgba(140,50,10,0.35),0_32px_60px_rgba(100,30,5,0.45)] ring-1 ring-black/[0.08]">
          
          {/* inner surface */}
          <div
            className="relative overflow-hidden rounded-[22px] border border-white/[0.08] px-8 py-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] md:px-16 md:py-20"
            style={{
              background: "linear-gradient(160deg, #d4723a 0%, #b85525 50%, #a34420 100%)",
            }}
          >

            {/* grain overlay */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.22]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />

            {/* soft radial glow center */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,200,140,0.18) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 mx-auto max-w-3xl">

              <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                Join TheOddOnes movement
              </span>

              <h3 className="mt-6 font-heading text-[clamp(2.4rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                Build, break,{" "}
                <span className="text-white/55">and learn.</span>
              </h3>

              <div className="mt-10 flex items-center justify-center">
                <Button3D onClick={() => router.push("/community")}>
                  Join Now
                </Button3D>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}