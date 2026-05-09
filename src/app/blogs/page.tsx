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
  FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, tagColors } from "@/lib/posts";

const FILTERS = ["All", "ROS2", "Drones", "Hardware", "Philosophy"];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background text-foreground font-space">
      {/* ── HERO ── */}
      <section className="relative px-6 pb-0 pt-32 overflow-hidden">
        {/* faint grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Home size={14} strokeWidth={2} />
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">Blogs</span>
          </nav>

          <div className="grid gap-16 lg:grid-cols-[1fr_380px] lg:items-end pb-16">
            <div>
              <h1
                className="font-space font-bold leading-[0.9] tracking-tight lg:text-5xl"
               
              >
                Things we learned<br/>the hard way.
              </h1>
              
              <p className="mt-8 max-w-xl font-inter text-base leading-relaxed text-foreground/55 md:text-[1.05rem]">
                Build logs, essays, and
                practical notes from the messy middle of learning.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                {[
                  { icon: Pencil, label: `${posts.length} posts` },
                  { icon: TrendingUp, label: "Weekly drops" },
                  { icon: Rss, label: "Free forever" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-foreground/50">
                    <Icon size={14} strokeWidth={1.8} />
                    <span className="font-inter text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex flex-col justify-end gap-4 h-full pb-2">
               <p className="font-inter text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                  Filter by topic
               </p>
               <div className="flex flex-wrap gap-2">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-inter text-[11px] transition-colors ${
                      f === "All"
                        ? "border-foreground bg-foreground text-background font-medium"
                        : "border-foreground/10 bg-transparent text-foreground/50 hover:border-foreground/30 hover:text-foreground"
                    }`}
                  >
                    {f !== "All" && <Hash size={11} strokeWidth={2} className="opacity-60" />}
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/8 dark:border-white/[0.07]" />
      </section>

      {/* ── FEATURED & POST GRID ── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
           <div className="mb-10 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 w-fit">
                <FileText size={13} strokeWidth={1.8} className="text-foreground/40" />
                <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-foreground/40">
                  All Articles
                </span>
              </div>
           </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
             {/* FEATURED POST (takes 2 columns on lg) */}
             <Link
                href={`/blogs/${featured.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/8 bg-foreground/[0.02] p-8 transition-all duration-200 hover:border-foreground/20 hover:bg-foreground/[0.04] dark:border-white/[0.07] dark:hover:border-white/20 dark:bg-white/[0.015] dark:hover:bg-white/[0.03] lg:col-span-2 min-h-[300px]"
             >
                <div className="flex flex-col lg:flex-row gap-8 justify-between h-full">
                   <div className="flex flex-col flex-1">
                      <div className="mb-6 flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 font-inter text-[10px] uppercase tracking-[0.18em] ${tagColors[featured.tag]}`}>
                           {featured.tag}
                        </span>
                        <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-foreground/30 bg-foreground/5 dark:bg-white/5 px-2.5 py-1 rounded-full">
                           Featured
                        </span>
                      </div>
                      <h2 className="font-space text-2xl lg:text-3xl font-bold leading-tight text-foreground transition-opacity group-hover:opacity-80">
                        {featured.title}
                      </h2>
                      <p className="mt-4 font-inter text-sm leading-relaxed text-foreground/60 max-w-xl">
                        {featured.excerpt}
                      </p>
                   </div>
                   
                   <div className="flex flex-row lg:flex-col justify-between lg:justify-end items-center lg:items-end w-full lg:w-auto mt-auto lg:mt-0">
                      <div className="flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.15em] text-foreground/40">
                        <span>{featured.date}</span>
                        <span className="h-px w-3 bg-foreground/20" />
                        <span className="flex items-center gap-1.5">
                           <Clock size={11} strokeWidth={1.8} />
                           {featured.readTime}
                        </span>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 dark:bg-white/5 group-hover:bg-foreground/10 dark:group-hover:bg-white/10 transition-colors mt-0 lg:mt-6">
                        <ArrowUpRight size={16} strokeWidth={2} className="text-foreground/40 group-hover:text-foreground transition-colors" />
                      </div>
                   </div>
                </div>
             </Link>

            {/* REST OF THE POSTS */}
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-black/8 bg-background p-7 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm dark:border-white/[0.07] dark:hover:border-white/20 min-h-[300px]"
              >
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 font-inter text-[10px] uppercase tracking-[0.2em] ${tagColors[post.tag]}`}
                    >
                      {post.tag}
                    </span>
                  </div>

                  <h3 className="font-space text-xl font-semibold leading-snug text-foreground transition-opacity group-hover:opacity-75">
                    {post.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 font-inter text-sm leading-relaxed text-foreground/50">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-black/8 pt-5 dark:border-white/[0.07]">
                  <div className="flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.15em] text-foreground/40">
                    <span>{post.date}</span>
                    <span className="h-px w-3 bg-foreground/20" />
                    <span className="flex items-center gap-1">
                      <Clock size={11} strokeWidth={1.8} />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-inter text-xs text-foreground/30 transition-colors group-hover:text-foreground/60">
                     <span>Read</span>
                     <ChevronRight size={13} strokeWidth={1.8} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-foreground/[0.02] dark:border-white/[0.07] dark:bg-white/[0.015]">
            <div className="relative flex flex-col gap-10 p-10 md:flex-row md:items-center md:justify-between md:p-14">
              {/* text */}
              <div>
                <p className="mb-4 font-inter text-[10px] uppercase tracking-[0.28em] text-foreground/40">
                  Stay in the loop
                </p>
                <h3
                  className="font-space font-bold leading-tight"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                >
                  New notes drop
                  <br />
                  when something breaks.
                </h3>
                <p className="mt-5 max-w-sm font-inter text-sm leading-relaxed text-foreground/50">
                  No fluff. Just the stuff we wish someone had written when we
                  were figuring it out.
                </p>
              </div>

              {/* form */}
              <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                <div className="relative">
                  <Mail
                    size={15}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30"
                  />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-full border border-foreground/10 bg-background py-3.5 pl-11 pr-5 font-inter text-sm text-foreground placeholder:text-foreground/30 transition-colors focus:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-foreground/20 sm:w-72"
                  />
                </div>
                <button className="rounded-full bg-foreground px-8 py-3.5 font-inter text-sm font-medium text-background transition-colors hover:bg-foreground/90">
                  Get notified
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
