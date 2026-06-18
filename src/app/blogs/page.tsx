"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "@/components/ui/tabler-icons";
import { CATEGORIES, POSTS, type Category, type Post } from "@/lib/blog-data";

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-sm text-foreground/55">
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#c4622d]/15 text-[11px] font-bold text-[#c4622d]">
        {post.author.charAt(0)}
      </span>
      <span className="font-medium text-foreground/70">{post.author}</span>
      <span className="opacity-40">·</span>
      <span>{post.date}</span>
    </div>
  );
}

export default function BlogPage() {
  const [active, setActive] = useState<"All" | Category>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesCategory = active === "All" || post.category === active;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, query]);

  const featured = filtered.filter((post) => post.featured).slice(0, 2);
  const latest = filtered.filter((post) => !featured.includes(post));

  return (
    <main className="min-h-screen bg-background px-5 pt-28 pb-24 text-foreground font-space sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Blog
          </h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground/50">
              <Search size={16} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search..."
                className="w-40 bg-transparent outline-none placeholder:text-foreground/40"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] text-foreground/40 sm:inline">
                Ctrl K
              </kbd>
            </div>
          </div>
        </header>

        {/* Category tabs */}
        <nav className="mt-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => {
            const isActive = active === category;
            return (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-foreground text-background"
                    : "border border-border bg-card text-foreground/60 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>

        {/* Featured */}
        {featured.length > 0 ? (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group block"
              >
                <div
                  className={`relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br ${post.gradient}`}
                >
                  <span className="absolute left-5 top-5 rounded-md bg-black/30 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur">
                    {post.category}
                  </span>
                  <span className="px-6 text-center font-heading text-xl font-bold leading-tight text-white/90 sm:px-8 sm:text-3xl">
                    {post.title}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-[#c4622d] sm:text-2xl">
                  {post.title}
                </h2>
                <PostMeta post={post} />
              </Link>
            ))}
          </section>
        ) : null}

        {/* Latest posts */}
        <section className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/45">
            Latest Posts
          </h2>

          {latest.length === 0 ? (
            <p className="mt-8 text-sm text-foreground/50">No posts found.</p>
          ) : (
            <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="group block"
                >
                  <div
                    className={`relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-2xl border border-border bg-linear-to-br ${post.gradient}`}
                  >
                    <span className="absolute left-4 top-4 rounded-md bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
                      {post.category}
                    </span>
                    <span className="px-5 text-center font-heading text-lg font-bold leading-tight text-white/90 sm:px-6 sm:text-xl">
                      {post.title}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-[#c4622d] sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/55">
                    {post.excerpt}
                  </p>
                  <PostMeta post={post} />
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
