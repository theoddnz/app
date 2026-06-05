"use client";

import { Cpu, Orbit, RadioTower, Shapes, Sparkles, Waves } from "@/components/ui/tabler-icons";

const companies = [
  { name: "Loynix Studio", icon: Sparkles },
  { name: "CircuitLab", icon: Cpu },
  { name: "Northstar Works", icon: Orbit },
  { name: "Signal Forge", icon: RadioTower },
  { name: "Framecraft", icon: Shapes },
  { name: "Waveform Labs", icon: Waves },
];

export default function Collaborators() {
  return (
    <section className="bg-background px-6 py-20 font-space text-foreground md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">

        {/* Centered heading block */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-normal tracking-[0.08em] text-muted-foreground">
            Collaborators
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-[-0.025em] md:text-[42px] md:leading-[1.1]">
            Built for people who{" "}
            <em className="font-light not-italic text-foreground/70">ship real work.</em>
          </h2>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <div
            className="company-marquee-track flex w-max flex-row flex-nowrap gap-2.5"
            style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
          >
            {[0, 1].map((group) => (
              <div
                key={group}
                className="company-marquee-group flex shrink-0 flex-row flex-nowrap gap-2.5"
                style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
              >
                {companies.map(({ name, icon: Icon }) => (
                  <div
                    key={`${name}-${group}`}
                    className="flex h-12 w-[210px] shrink-0 items-center gap-2.5 rounded-full border border-border bg-background px-2.5 py-2 pr-4 transition-colors hover:border-border/60"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Icon className="size-[15px] text-muted-foreground" strokeWidth={1.6} />
                    </div>
                    <span className="whitespace-nowrap text-[13px] font-medium tracking-[-0.01em]">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
