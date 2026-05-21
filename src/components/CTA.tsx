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
      {/* subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[360px] w-[640px] rounded-full bg-secondary/[0.07] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">

          {/* eyebrow */}
          <span className="inline-block font-space text-[10.5px] font-medium tracking-[0.22em] text-muted-foreground/60 uppercase">
            For funders
          </span>

        
          {/* heading */}
          <h3 className="mt-6 font-space text-[2rem] font-light leading-[1.1] tracking-[-0.03em] text-foreground md:text-[2.75rem]">
            Back the future of{" "}
            <span className="text-foreground/40">learning communities.</span>
          </h3>

          {/* body */}
          <p className="mx-auto mt-5 max-w-lg font-space text-[14.5px] font-light leading-[1.75] text-muted-foreground/70">
            The<span className="text-secondary font-normal">Odd</span>Ones isn&apos;t a course platform.
            It&apos;s a cultural movement for builders who learn by shipping
            together — in public, with standards.
          </p>

          {/* cta */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button3D
              variant="ghost"
              onClick={() => router.push("/community")}
            >
              Partner with us
            </Button3D>

           
          </div>

    

        </div>
      </div>
    </section>
  );
}