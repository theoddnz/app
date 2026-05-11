"use client";

import { useRouter } from "next/navigation";
import { Button3D } from "@/components/ui/button-3d";

export default function CTA() {
  const router = useRouter();

  return (
    <section
      id="contribute"
      className="bg-background px-6 py-20 text-foreground dark:bg-[#0a0806] md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-space text-[11px] font-normal tracking-[0.08em] text-muted-foreground">
            For funders
          </p>

          <h3 className="mt-3 font-space text-3xl font-light tracking-[-0.025em] text-foreground md:text-[42px] md:leading-[1.1]">
            Back the future of
            <br />
            <em className="font-light not-italic text-foreground/70">learning communities.</em>
          </h3>

          <p className="mx-auto mt-4 max-w-xl font-space text-[15px] font-light leading-relaxed text-muted-foreground">
            The<span className="text-secondary">Odd</span>Ones isn&apos;t a course platform. It&apos;s a cultural movement for
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
