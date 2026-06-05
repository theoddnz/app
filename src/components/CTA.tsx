"use client";

import { useRouter } from "next/navigation";
import { Button3D } from "@/components/ui/button-3d";

export default function CTA() {
  const router = useRouter();

  return (
    <section
      id="contribute"
      className="relative bg-background px-6 py-28 text-foreground dark:bg-[#0a0806] md:px-10 md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[360px] w-[640px] rounded-full bg-secondary/[0.07] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">

          <span  className="inline-flex items-center rounded-full border border-border/60 bg-muted px-3 py-1 font-space text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Join the movement
          </span>

       
          <h3 className="mt-6 font-space  text-[clamp(3.2rem,9vw,6rem)] font-extrabold  leading-[1.1] tracking-[-0.03em] text-foreground md:text-[2.75rem]">
            Build in public.{" "}
            <span className="text-foreground/60">Ship with people who get it.</span>
          </h3>

          <div className="mt-10 flex items-center justify-center">
            <Button3D onClick={() => router.push("/community")}>
              Join Now
            </Button3D>
          </div>

        </div>
      </div>
    </section>
  );
}