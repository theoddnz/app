"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "@/components/ui/tabler-icons";
import type { PublicBlogPost } from "@/lib/public-blogs";

const categories = ["All", "Guides", "Engineering", "Product", "Community"] as const;

function PostMeta({ post }: { post: PublicBlogPost }) {
  return (
    <div className="mt-3 flex items-center gap-2 text-sm text-foreground/55">
      {post.authorImageUrl ? (
        <img src={post.authorImageUrl} alt="" className="size-6 rounded-full border border-border object-cover" />
      ) : (
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-[#c4622d]/15 text-[11px] font-bold text-[#c4622d]">
          {post.author.charAt(0)}
        </span>
      )}
      <span className="font-medium text-foreground/70">{post.author}</span>
      <span className="opacity-40">&middot;</span>
      <span>{post.date}</span>
    </div>
  );
}

function Cover({ post, large = false }: { post: PublicBlogPost; large?: boolean }) {
  if (post.thumbnailUrl) {
    return (
      <div className="relative aspect-16/10 overflow-hidden rounded-lg border border-border bg-muted dark:border-white/[0.08]">
        <img src={post.thumbnailUrl} alt="" className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <span className="absolute left-4 top-4 rounded-md bg-black/35 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
          {post.category}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative flex aspect-16/10 items-center justify-center overflow-hidden rounded-lg border border-border bg-linear-to-br dark:border-white/[0.08] ${post.gradient}`}
    >
      <span className="absolute left-4 top-4 rounded-md bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur">
        {post.category}
      </span>
      <span className={`px-5 text-center font-heading font-bold leading-tight text-white/90 ${large ? "text-xl sm:px-8 sm:text-3xl" : "text-lg sm:px-6 sm:text-xl"}`}>
        {post.title}
      </span>
    </div>
  );
}

export function BlogIndexClient({ posts }: { posts: PublicBlogPost[] }) {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const availableCategories = useMemo(() => {
    const dynamicCategories = posts.map((post) => post.category).filter((category) => !categories.includes(category as never));
    return [...categories, ...Array.from(new Set(dynamicCategories))];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = active === "All" || post.category === active;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [active, posts, query]);

  const featured = filtered.filter((post) => post.featured).slice(0, 2);
  const latest = filtered.filter((post) => !featured.includes(post));

  return (
    <main className="min-h-screen bg-background px-5 pt-28 pb-24 text-foreground font-space sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Blog
          </h1>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-foreground/50">
            <Search size={16} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search..."
              className="w-40 bg-transparent outline-none placeholder:text-foreground/40"
            />
          </div>
        </header>

        <nav className="mt-8 flex flex-wrap items-center gap-2">
          {availableCategories.map((category) => {
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

        {featured.length > 0 ? (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="group block rounded-xl bg-card p-2 shadow-[0_7px_0_rgba(13,38,58,0.055),0_14px_28px_rgba(13,38,58,0.10)] ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-0.5 dark:bg-[#181818] dark:shadow-[0_7px_0_rgba(0,0,0,0.22),0_14px_30px_rgba(0,0,0,0.34)] dark:ring-white/[0.07]"
              >
                <div className="rounded-lg bg-background/80 p-2 dark:bg-[#242424]">
                  <Cover post={post} large />
                  <div className="px-2 pb-3 pt-4">
                    <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-[#c4622d] sm:text-2xl">
                      {post.title}
                    </h2>
                    <PostMeta post={post} />
                  </div>
                </div>
              </Link>
            ))}
          </section>
        ) : null}

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
                  className="group block rounded-xl bg-card p-2 shadow-[0_6px_0_rgba(13,38,58,0.05),0_12px_24px_rgba(13,38,58,0.085)] ring-1 ring-black/[0.04] transition-transform duration-300 hover:-translate-y-0.5 dark:bg-[#181818] dark:shadow-[0_6px_0_rgba(0,0,0,0.2),0_12px_26px_rgba(0,0,0,0.32)] dark:ring-white/[0.07]"
                >
                  <div className="h-full rounded-lg bg-background/80 p-2 dark:bg-[#242424]">
                    <Cover post={post} />
                    <div className="px-2 pb-3 pt-4">
                      <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-[#c4622d] sm:text-lg">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/55">
                        {post.excerpt}
                      </p>
                      <PostMeta post={post} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
