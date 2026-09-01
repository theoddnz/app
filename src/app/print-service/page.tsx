import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  ChevronRight,
  Home,
  Sparkles,
  Wrench,
  Zap,
} from "@/components/ui/tabler-icons";
import { MapPin } from "@/components/print-service/icons";

import PrintServiceBrowser from "@/components/print-service/PrintServiceBrowser";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "3D Printing Service Near You",
  description:
    "Find local 3D printer owners near you, compare materials and price per gram, and book a print. Enable your location to see makers on the map.",
  path: "/print-service",
  keywords: [
    "3D printing service",
    "3D printer near me",
    "local 3D printing",
    "book 3D print",
    "PLA PETG resin printing",
    "on-demand 3D printing",
  ],
});

const steps = [
  {
    icon: MapPin,
    title: "Share your location",
    body: "Enable location and the map centers on you, showing makers nearby with live distance.",
  },
  {
    icon: Wrench,
    title: "Pick a maker",
    body: "Compare materials, turnaround, rating, and price per gram to find the right printer.",
  },
  {
    icon: Zap,
    title: "Book the print",
    body: "Send a booking request and coordinate pickup or delivery once the print is done.",
  },
];

export default function PrintServicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-[#131313]">
      <section className="border-b border-black/6 px-6 pb-14 pt-32 dark:border-white/[0.06]">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
              <Home size={14} strokeWidth={2} />
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">3D Printing Service</span>
          </nav>

          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4622d] dark:border-white/[0.08] dark:bg-[#181818]">
              <Sparkles size={13} strokeWidth={2} />
              Local makers, on demand
            </p>
            <h1 className="mt-6 font-space text-4xl font-bold uppercase leading-[0.96] tracking-tight md:text-5xl">
              Get it printed nearby.
            </h1>
            <p className="mt-5 font-space text-[15px] leading-8 text-muted-foreground md:text-base">
              Need a part printed? Enable your location to find 3D printer owners around you, compare materials and price, and send a booking request in a couple of taps.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-[22px] border border-black/[0.05] bg-muted/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:border-white/[0.08] dark:bg-[#242424] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-[13px] bg-card text-[#c4622d] shadow-[0_8px_18px_rgba(13,38,58,0.08)] ring-1 ring-black/[0.05] dark:bg-[#181818] dark:ring-white/[0.08]">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1.5 font-space text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center gap-2">
            <Bot size={18} className="text-[#c4622d]" strokeWidth={1.8} />
            <h2 className="font-heading text-2xl font-semibold leading-tight text-foreground">
              Makers on the map
            </h2>
          </div>
          <PrintServiceBrowser />
        </div>
      </section>
    </main>
  );
}
