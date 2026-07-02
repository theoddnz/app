"use client";

import { ArrowRight, Clock, ArrowBigDown, FlaskConical, Bot } from "@/components/ui/tabler-icons";
import { cn } from "@/lib/utils";

const paths = [
  {
    label: "Path 01",
    title: "Cursor",
    description:
      "Code editing that helps you move fast without breaking things on purpose.",
    icon: ArrowBigDown,
    available: true,
  },
  {
    label: "Path 02",
    title: "Robotics",
    description:
      "From sensors to actuators. Build machines that respond to the real world.",
    icon: Bot,
    available: true,
  },
  {
    label: "Path 03",
    title: "Testing",
    description:
      "Ship with confidence. Write tests that catch real bugs before your users do.",
    icon: FlaskConical,
    available: true,
  },
  {
    label: "Coming soon",
    title: "More paths",
    description: "New disciplines are on the way. The best is still ahead.",
    icon: Clock,
    available: false,
  },
];

export default function AvailablePaths() {
  return (
    <section className="bg-background font-space px-6 py-16 text-foreground md:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-normal tracking-[0.06em] text-muted-foreground">
            Available paths
          </p>
          <h2 className="mt-3 text-3xl font-light tracking-[-0.025em] md:text-[40px] md:leading-[1.1]">
            One platform.{" "}
            <em className="font-light not-italic text-foreground/60">
              Three disciplines.
            </em>
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Pick your path. Go deep. Ship something real.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map(({ label, title, description, icon: Icon, available }) => (
            <div
              key={title}
              className={cn(
                "group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors",
                available
                  ? "cursor-pointer hover:border-border/60"
                  : "cursor-default opacity-50"
              )}
            >
              {/* Icon */}
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
                <Icon className="size-5 text-muted-foreground" strokeWidth={1.6} />
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-1.5">
                <p className="text-[10px] font-medium uppercase tracking-[0.07em] text-muted-foreground">
                  {label}
                </p>
                <p className="text-[16px] font-medium leading-tight tracking-[-0.02em]">
                  {title}
                </p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>

              {/* Footer */}
              {available ? (
                <div className="flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
                  <ArrowRight className="size-3.5" strokeWidth={1.8} />
                  Start learning
                </div>
              ) : (
                <span className="inline-flex w-fit items-center rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                  Notify me
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
