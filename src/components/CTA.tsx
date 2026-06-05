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

          <span className="inline-block font-space text-[10.5px] font-medium tracking-[0.22em] text-muted-foreground/60 uppercase">
            Join the movement
          </span>

          <h3 className="mt-6 font-space text-[2rem] font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-[2.75rem]">
            Build in public.{" "}
            <span className="text-foreground/40">Ship with people who get it.</span>
          </h3>

          <p className="mx-auto mt-5 max-w-lg font-space text-[14.5px] font-light leading-[1.75] text-muted-foreground/70">
            <span className="text-secondary font-normal">Odd</span>Ones is where serious builders come to learn fast, ship real things, and grow alongside a community that holds the bar high.
          </p>

          <div className="mt-10 flex items-center justify-center">
            <Button3D onClick={() => router.push("/community")}>
              Get early access
            </Button3D>
          </div>

        </div>
      </div>
    </section>
  );
}