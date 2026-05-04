import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { posts, tagColors } from "@/lib/posts";

export default function BlogPage() {
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="px-6 pb-16 pt-36 border-b border-black/6 dark:border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-6 bg-black/20 dark:bg-white/20" />
              <p className="font-inter text-[11px] uppercase tracking-[0.25em] text-black/35 dark:text-white/35">
                Field notes
              </p>
            </div>
            <h1
              className="font-space font-bold leading-[0.95] tracking-tight text-foreground"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              Things we
              <br />
              learned
              <br />
              the hard way.
            </h1>
          </div>
          <div className="md:max-w-sm">
            <p className="mb-6 font-inter text-sm leading-relaxed text-foreground/55">
              Medium-style reading, OddOnes energy: build logs, essays, and
              practical notes from the messy middle of learning.
            </p>
            <div className="flex flex-wrap gap-2">
              {["All", "ROS2", "Drones", "Hardware", "Philosophy"].map((f) => (
                <button
                  key={f}
                  className={`rounded-full border px-3 py-1.5 font-inter text-xs transition-colors ${
                    f === "All"
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/10 bg-background text-foreground/50 hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 border-b border-black/6 dark:border-white/[0.06]">
        <div className="mx-auto max-w-6xl">
          <Link href={`/blogs/${featured.slug}`} className="group block">
            <div className="grid overflow-hidden rounded-2xl border border-black/8 transition-colors duration-300 hover:border-black/20 dark:border-white/[0.08] dark:hover:border-white/20 md:grid-cols-2">
              <div className="relative flex min-h-[320px] flex-col justify-between overflow-hidden bg-[#0a0a0a] p-12">
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <span
                  className={`relative self-start rounded-full px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.2em] ${tagColors[featured.tag]}`}
                >
                  {featured.tag}
                </span>
                <p
                  className="relative select-none font-space font-bold leading-none text-white/10"
                  style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
                >
                  01
                </p>
              </div>

              <div className="flex flex-col justify-between bg-[#f5f3f0] p-10 dark:bg-white/[0.04]">
                <div>
                  <p className="mb-5 font-inter text-[11px] uppercase tracking-[0.2em] text-foreground/35">
                    {featured.date} / {featured.readTime} read
                  </p>
                  <h2
                    className="mb-5 font-space font-bold leading-tight text-foreground transition-opacity group-hover:opacity-70"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="font-inter text-sm leading-relaxed text-foreground/55">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2">
                  <span className="font-inter text-sm text-foreground/45 transition-colors group-hover:text-foreground">
                    Read it
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    className="text-foreground/30 transition-colors group-hover:text-foreground"
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-black/6 dark:bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group flex min-h-[280px] flex-col justify-between bg-background p-8 transition-colors duration-200 hover:bg-[#f5f3f0] dark:hover:bg-white/[0.04]"
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className={`rounded-full px-2.5 py-1 font-inter text-[10px] uppercase tracking-[0.2em] ${tagColors[post.tag]}`}
                    >
                      {post.tag}
                    </span>
                    <span className="font-space text-3xl font-bold text-foreground/10">
                      0{i + 2}
                    </span>
                  </div>
                  <h3 className="mb-3 font-space text-base font-semibold leading-snug text-foreground transition-opacity group-hover:opacity-60">
                    {post.title}
                  </h3>
                  <p className="line-clamp-3 font-inter text-xs leading-relaxed text-foreground/45">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-black/6 pt-5 dark:border-white/[0.06]">
                  <p className="font-inter text-[10px] uppercase tracking-[0.15em] text-foreground/35">
                    {post.date} / {post.readTime}
                  </p>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    className="text-foreground/25 transition-colors group-hover:text-foreground"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-2xl bg-[#0a0a0a] p-12 md:flex-row">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <p className="mb-3 font-inter text-[11px] uppercase tracking-[0.25em] text-white/25">
                Stay in the loop
              </p>
              <h3
                className="font-space font-bold leading-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                New notes drop
                <br />
                when something breaks.
              </h3>
            </div>
            <div className="relative flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-full border border-white/10 bg-white/8 px-5 py-3 font-inter text-sm text-white placeholder:text-white/20 transition-colors focus:border-white/30 focus:outline-none sm:w-64"
              />
              <button className="rounded-full bg-white px-6 py-3 font-inter text-sm text-black transition-colors hover:bg-white/90">
                <span className="inline-flex items-center gap-2">
                  Get notified
                  <Mail size={14} strokeWidth={1.8} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
