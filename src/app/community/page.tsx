import Link from "next/link";
import {
  Bell,
  ChevronRight,
  Hash,
  Home,
  MessageCircle,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function DiscordMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 127.14 96.36"
      className="h-24 w-24 md:h-32 md:w-32"
      fill="currentColor"
    >
      <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2.04a75.57 75.57 0 0 0 64.32 0c.87.7 1.76 1.38 2.66 2.04a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.37-4.51-51.1-18.9-72.15ZM42.45 65.69c-6.27 0-11.43-5.73-11.43-12.77s5.06-12.78 11.43-12.78c6.41 0 11.54 5.78 11.43 12.78.01 7.04-5.06 12.77-11.43 12.77Zm42.24 0c-6.27 0-11.43-5.73-11.43-12.77s5.06-12.78 11.43-12.78c6.41 0 11.54 5.78 11.43 12.78 0 7.04-5.02 12.77-11.43 12.77Z" />
    </svg>
  );
}

const stats = [
  { icon: Hash, label: "Channels", value: "ROS, Go, testing, builds" },
  { icon: MessageCircle, label: "Signal", value: "Useful help over noise" },
  { icon: Bell, label: "Status", value: "Opening soon" },
];

const perks = [
  { icon: Zap, text: "Real-time help on ROS, Go, and testing" },
  { icon: Users, text: "Builders who actually read the error message" },
  { icon: MessageCircle, text: "Build logs, feedback loops, and war stories" },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-space">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pb-0 pt-32 md:px-10">
        {/* grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-24 h-[560px] w-[560px] rounded-full opacity-[0.13]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(196,98,45,0.5), transparent 72%)",
            filter: "blur(52px)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          {/* ── BREADCRUMB ── */}
          <nav
            aria-label="Breadcrumb"
            className="mb-12 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Home size={14} strokeWidth={2} />
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">Community</span>
          </nav>

          {/* ── TWO COL ── */}
          <div className="grid gap-16 pb-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">

            {/* LEFT — Discord visual */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-full max-w-[400px]">
                {/* outer glow ring */}
                <div className="absolute inset-0 rounded-2xl opacity-20"
                  style={{ boxShadow: "0 0 80px 20px rgba(88,101,242,0.3)" }} />

                <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0c0c0c]">
                  {/* dot grid */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Discord pill */}
                  <div className="relative flex h-52 w-52 items-center justify-center rounded-[2rem] border border-white/10 bg-[#5865f2] text-white shadow-[0_20px_60px_rgba(88,101,242,0.4)] md:h-64 md:w-64">
                    <DiscordMark />
                  </div>

                  {/* coming soon badge — bottom center */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c4622d] opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c4622d]" />
                    </span>
                    <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/50">
                      Warming up
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — copy */}
            <div className="order-1 lg:order-2">
              {/* eyebrow */}
              <div className="mb-7 flex items-center gap-3">
              
                <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-foreground/32">
                  Community
                </p>
              </div>

              {/* headline */}
              <h1
                className="font-space font-bold leading-[0.93] tracking-tight"
                style={{ fontSize: "clamp(3rem, 7.5vw, 5.8rem)" }}
              >
                Discord is
                <br />
                <span className="text-foreground/25">warming up.</span>
              </h1>

              {/* description */}
              <p className="mt-8 max-w-lg font-inter text-base leading-[1.85] text-foreground/52 md:text-[1.05rem]">
                The<span className="text-secondary">Odd</span>Ones community isn&apos;t open yet. We&apos;re setting up
                a small, useful Discord for builders who want feedback, build
                logs, and people who actually read the error message.
              </p>

              {/* perks */}
              <ul className="mt-8 flex flex-col gap-3">
                {perks.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 font-inter text-sm text-foreground/48">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(196,98,45,0.22)] bg-[rgba(196,98,45,0.06)]">
                      <Icon size={13} strokeWidth={1.9} className="text-[#c4622d]" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>

              {/* invite notice */}
              <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-foreground/8 px-4 py-2.5">
                <Sparkles size={13} strokeWidth={1.8} className="text-[#c4622d]" />
                <span className="font-inter text-xs text-foreground/40">
                  Invite links will appear here when the room is ready.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/6 dark:border-white/[0.06]" />
      </section>

      {/* ── STATS STRIP ── */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 divide-y divide-black/7 dark:divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 px-0 py-10 sm:px-10 first:pl-0 last:pr-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[rgba(196,98,45,0.2)] bg-[rgba(196,98,45,0.06)]">
                  <Icon size={17} strokeWidth={1.8} className="text-[#c4622d]" />
                </div>
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-[0.22em] text-foreground/28">
                    {label}
                  </p>
                  <p className="mt-2 font-inter text-sm leading-snug text-foreground/65">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
    </main>
  );
}
