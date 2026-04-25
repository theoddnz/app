import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    slug: "why-ros2-breaks-you-first",
    tag: "ROS2",
    date: "APR 2025",
    title: "Why ROS2 breaks you before it helps you.",
    excerpt:
      "Everyone who's touched ROS2 has a story. It usually starts with three days of install hell and ends with something that almost works. That gap is the whole point.",
    readTime: "6 min",
    featured: true,
  },
  {
    slug: "the-drone-that-crashed-twelve-times",
    tag: "DRONES",
    date: "MAR 2025",
    title: "The drone that crashed twelve times before it flew.",
    excerpt:
      "We tracked every failure on one build. Twelve distinct crashes. Here's what each one taught us and why we'd do it again.",
    readTime: "9 min",
    featured: false,
  },
  {
    slug: "firmware-before-you-understand-it",
    tag: "EMBEDDED",
    date: "MAR 2025",
    title: "Write firmware before you understand it.",
    excerpt:
      "The instinct is to learn first, build second. That instinct is wrong. Here's what happens when you flip the order.",
    readTime: "5 min",
    featured: false,
  },
  {
    slug: "soldering-is-a-philosophy",
    tag: "HARDWARE",
    date: "FEB 2025",
    title: "Soldering is a philosophy, not a skill.",
    excerpt:
      "Bad joints aren't a technique problem. They're a patience problem. And patience is the one thing robotics will either build in you or destroy.",
    readTime: "4 min",
    featured: false,
  },
  {
    slug: "what-happens-when-the-robot-doesnt-move",
    tag: "DEBUG",
    date: "FEB 2025",
    title: "What happens when the robot doesn't move.",
    excerpt:
      "You've written the code. You've checked the wiring. It still doesn't move. Here's the actual debugging process — not the clean version.",
    readTime: "7 min",
    featured: false,
  },
  {
    slug: "the-swarm-problem",
    tag: "ADVANCED",
    date: "JAN 2025",
    title: "The swarm problem nobody talks about.",
    excerpt:
      "Multi-agent coordination sounds fascinating until three of your bots are trying to occupy the same square meter. Communication is harder than locomotion.",
    readTime: "11 min",
    featured: false,
  },
  {
    slug: "obsession-is-the-only-prerequisite",
    tag: "PHILOSOPHY",
    date: "JAN 2025",
    title: "Obsession is the only prerequisite.",
    excerpt:
      "We don't care what you know. We care whether you think about this stuff in the shower. That's the baseline. Everything else is learnable.",
    readTime: "3 min",
    featured: false,
  },
];

const tagColors: Record<string, string> = {
  ROS2: "bg-black text-white",
  DRONES: "bg-[#f0eeeb] text-black",
  EMBEDDED: "bg-[#f0eeeb] text-black",
  HARDWARE: "bg-[#f0eeeb] text-black",
  DEBUG: "bg-[#f0eeeb] text-black",
  ADVANCED: "bg-black text-white",
  PHILOSOPHY: "bg-[#f0eeeb] text-black",
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero header */}
      <section className="pt-36 pb-16 px-6 border-b border-black/6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-black/20" />
              <p className="font-inter text-[11px] text-black/35 tracking-[0.25em] uppercase">
                Field notes
              </p>
            </div>
            <h1
              className="font-space font-bold leading-[0.95] tracking-tight text-black"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
            >
              Things we<br />learned<br />the hard way.
            </h1>
          </div>
          <div className="md:max-w-xs">
         
            <div className="flex flex-wrap gap-2">
              {["All", "ROS2", "Drones", "Hardware", "Philosophy"].map((f) => (
                <button
                  key={f}
                  className={`font-inter text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    f === "All"
                      ? "bg-black text-white border-black"
                      : "bg-white text-black/50 border-black/10 hover:border-black/30 hover:text-black"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="px-6 py-16 border-b border-black/6">
        <div className="max-w-6xl mx-auto">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="grid md:grid-cols-2 gap-0 border border-black/8 rounded-2xl overflow-hidden hover:border-black/20 transition-colors duration-300">
              {/* Visual side */}
              <div className="bg-[#0a0a0a] p-12 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
                {/* Abstract grid pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <span
                  className={`self-start font-inter text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${tagColors[featured.tag]}`}
                >
                  {featured.tag}
                </span>
                <p
                  className="font-space text-white/10 font-bold leading-none select-none"
                  style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
                >
                  01
                </p>
              </div>

              {/* Text side */}
              <div className="bg-[#f5f3f0] p-10 flex flex-col justify-between">
                <div>
                  <p className="font-inter text-[11px] text-black/25 tracking-[0.2em] uppercase mb-5">
                    {featured.date} · {featured.readTime} read
                  </p>
                  <h2
                    className="font-space font-bold text-black leading-tight mb-5 group-hover:opacity-70 transition-opacity"
                    style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                  >
                    {featured.title}
                  </h2>
                  <p className="font-inter text-black/50 text-sm leading-relaxed">
                    {featured.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-8">
                  <span className="font-inter text-sm text-black/40 group-hover:text-black transition-colors">
                    Read it
                  </span>
                
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Rest of posts */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/6 rounded-2xl overflow-hidden">
            {rest.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white p-8 hover:bg-[#f5f3f0] transition-colors duration-200 flex flex-col justify-between min-h-[280px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`font-inter text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 rounded-full ${tagColors[post.tag]}`}
                    >
                      {post.tag}
                    </span>
                    <span className="font-space text-3xl font-bold text-black/5">
                      0{i + 2}
                    </span>
                  </div>
                  <h3 className="font-space font-semibold text-base leading-snug text-black mb-3 group-hover:opacity-60 transition-opacity">
                    {post.title}
                  </h3>
                  <p className="font-inter text-xs text-black/40 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-5 border-t border-black/6">
                  <p className="font-inter text-[10px] text-black/25 tracking-[0.15em] uppercase">
                    {post.date} · {post.readTime}
                  </p>
                  <span className="text-black/20 group-hover:text-black transition-colors text-sm">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#0a0a0a] rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative">
              <p className="font-inter text-[11px] text-white/25 tracking-[0.25em] uppercase mb-3">
                Stay in the loop
              </p>
              <h3
                className="font-space font-bold text-white leading-tight"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                New notes drop<br />when something breaks.
              </h3>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-5 py-3 rounded-full bg-white/8 border border-white/10 text-white placeholder:text-white/20 font-inter text-sm focus:outline-none focus:border-white/30 transition-colors w-full sm:w-64"
              />
              <button className="px-6 py-3 rounded-full bg-white text-black font-inter text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
                Get notified →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}