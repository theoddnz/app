"use client";

import { useRouter } from "next/navigation";
import { Button3D } from "@/components/ui/button-3d";

export default function CTA() {
  const router = useRouter();

  return (
    <section
      id="contribute"
      className="bg-background px-6 py-24 text-foreground dark:bg-[#0a0806] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-inter text-[10px] font-medium font-space tracking-[0.32em] uppercase text-foreground/40">
            For funders
          </p>

          <h3 className="mt-6 font-space text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold tracking-[-0.04em] leading-[1.12] text-foreground/90">
            Back the future of learning communities.
          </h3>

          <p className="mt-5 font-inter text-[14.5px] font-light leading-[1.9] text-foreground/55 font-space">
            TheOddOnes isn&apos;t a course platform. It&apos;s a cultural movement for
            builders who learn by shipping together, in public, with standards.
            If you fund craft and curiosity, you&apos;ll like what we&apos;re building.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* <div className="scale-[0.94] sm:scale-100">
              <Button3D
                className="btn-3d-root"
                onClick={() => router.push("/community")}
              >
                Fund the movement
              </Button3D>
            </div> */}

            <div className="scale-[0.94] sm:scale-100">
              <Button3D
                variant="ghost"
                className="btn-3d-root ghost"
                onClick={() => router.push("/community")}
              >
                Partner with us
              </Button3D>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
