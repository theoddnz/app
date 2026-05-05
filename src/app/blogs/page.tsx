import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  Rss,
  ChevronRight,
  Clock,
  Pencil,
  TrendingUp,
  Hash,
  Home,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, tagColors } from "@/lib/posts";

const FILTERS = ["All", "ROS2", "Drones", "Hardware", "Philosophy"];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative px-6 pb-0 pt-32 overflow-hidden">
        {/* subtle dot-grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Home size={14} strokeWidth={2} />
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">Field notes</span>
          </nav>

          {/* eyebrow */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-foreground/20" />
            <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-foreground/35">
              Field notes
            </p>
          </div>

          {/* headline + meta split */}
          <div className="grid gap-12 pb-16 lg:grid-cols-[1fr_380px] lg:items-end">
            {/* big headline */}
            <h1
              className="font-space font-bold leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 6.2rem)" }}
            >
              Things we learned
              <br />
              <span className="text-foreground/25">the hard way.</span>
            </h1>

            {/* right col — description + filters */}
            <div className="flex flex-col gap-7">
              <p className="font-inter text-sm leading-relaxed text-foreground/50">
                Medium-style reading, OddOnes energy. Build logs, essays, and
                practical notes from the messy middle of learning.
              </p>

              {/* stat row */}
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { icon: Pencil, label: `${posts.length} posts` },
                  { icon: TrendingUp, label: "Weekly drops" },
                  { icon: Rss, label: "Free forever" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-foreground/35">
                    <Icon size={13} strokeWidth={1.8} />
                    <span className="font-inter text-xs">{label}</span>
                  </div>
                ))}
              </div>

              {/* filter pills */}
              <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-inter text-[11px] transition-colors ${
                      f === "All"
                        ? "border-foreground bg-foreground text-background"
                        : "border-foreground/10 bg-transparent text-foreground/45 hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {f !== "All" && <Hash size={10} strokeWidth={2} />}
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/7 dark:border-white/[0.07]" />
      </section>

      {/* ── FEATURED ── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          {/* label */}
          <div className="mb-8 flex items-center justify-between">
            <p className="font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/30">
              Featured
            </p>
            <Link
              href={`/blogs/${featured.slug}`}
              className="flex items-center gap-1 font-inter text-xs text-foreground/35 transition-colors hover:text-foreground"
            >
              Read now <ChevronRight size={13} strokeWidth={1.8} />
            </Link>
          </div>

          <Link href={`/blogs/${featured.slug}`} className="group block">
            <div className="grid overflow-hidden rounded-2xl border border-black/8 transition-all duration-300 hover:border-black/18 dark:border-white/[0.08] dark:hover:border-white/18 lg:grid-cols-[0.9fr_1.1fr]">

              {/* left — visual panel */}
              <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-[#0b0b0b] p-10 md:p-12">
                {/* grid lines */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.09]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
                {/* tag */}
                <span
                  className={`relative self-start rounded-full px-3 py-1.5 font-inter text-[10px] uppercase tracking-[0.22em] ${tagColors[featured.tag]}`}
                >
                  {featured.tag}
                </span>

                {/* ghost number */}
                <p
                  aria-hidden
                  className="relative select-none font-space font-bold leading-none text-white/[0.07]"
                  style={{ fontSize: "clamp(6rem, 14vw, 11rem)" }}
                >
                  01
                </p>
              </div>

              {/* right — content panel */}
              <div className="flex flex-col justify-between bg-[#f6f4f1] p-10 dark:bg-white/[0.035] md:p-12">
                <div>
                  <div className="mb-6 flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                    <span>{featured.date}</span>
                    <span className="h-px w-4 bg-foreground/20" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} strokeWidth={1.8} />
                      {featured.readTime} read
                    </span>
                  </div>

                  <h2
                    className="font-space font-bold leading-[1.05] text-foreground transition-opacity group-hover:opacity-65"
                    style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.15rem)" }}
                  >
                    {featured.title}
                  </h2>

                  <p className="mt-5 font-inter text-sm leading-relaxed text-foreground/52">
                    {featured.excerpt}
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-3">
                  <span className="font-inter text-sm text-foreground/40 transition-colors group-hover:text-foreground">
                    Read it
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    className="text-foreground/25 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── POST GRID ── */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          {/* label */}
          <p className="mb-8 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/30">
            All posts
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/8 bg-background p-7 transition-all duration-200 hover:border-black/18 dark:border-white/[0.07] dark:hover:border-white/18 min-h-[280px]"
              >
                {/* ghost index */}
                <span
                  aria-hidden
                  className="absolute right-7 top-7 font-space text-5xl font-bold text-foreground/[0.05] select-none"
                >
                  {String(i + 2).padStart(2, "0")}
                </span>

                {/* top */}
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.2em] ${tagColors[post.tag]}`}
                    >
                      {post.tag}
                    </span>
                  </div>

                  <h3 className="font-space text-[1.05rem] font-semibold leading-snug text-foreground transition-opacity group-hover:opacity-60">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 font-inter text-xs leading-relaxed text-foreground/42">
                    {post.excerpt}
                  </p>
                </div>

                {/* bottom meta */}
                <div className="mt-7 flex items-center justify-between border-t border-black/6 pt-5 dark:border-white/[0.06]">
                  <div className="flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.15em] text-foreground/30">
                    <span>{post.date}</span>
                    <span className="h-px w-3 bg-foreground/20" />
                    <span className="flex items-center gap-1">
                      <Clock size={10} strokeWidth={1.8} />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                    className="text-foreground/20 transition-all group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl bg-[#0b0b0b] text-white">
            {/* dot-grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative flex flex-col gap-10 p-10 md:flex-row md:items-center md:justify-between md:p-12">
              {/* text */}
              <div>
                <p className="mb-3 font-inter text-[10px] uppercase tracking-[0.28em] text-white/25">
                  Stay in the loop
                </p>
                <h3
                  className="font-space font-bold leading-tight text-white"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                >
                  New notes drop
                  <br />
                  when something breaks.
                </h3>
                <p className="mt-4 max-w-sm font-inter text-sm leading-relaxed text-white/38">
                  No fluff. Just the stuff we wish someone had written when we
                  were figuring it out.
                </p>
              </div>

              {/* form */}
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <div className="relative">
                  <Mail
                    size={14}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-full border border-white/10 bg-white/7 py-3 pl-10 pr-5 font-inter text-sm text-white placeholder:text-white/20 transition-colors focus:border-white/28 focus:outline-none sm:w-64"
                  />
                </div>
                <button className="rounded-full bg-white px-7 py-3 font-inter text-sm font-medium text-black transition-colors hover:bg-white/88">
                  Get notified
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
