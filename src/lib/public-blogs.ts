import { desc, eq } from "drizzle-orm";

import { getDb } from "@/db";
import { blogPosts, learningPaths, users } from "@/db/schema";
import { POSTS, type Block } from "@/lib/blog-data";

const gradients = [
  "from-[#d96e3a] via-[#95431d] to-[#2a1109]",
  "from-[#0f766e] via-[#155e75] to-[#111827]",
  "from-[#7c2d12] via-[#365314] to-[#111827]",
  "from-[#1d4ed8] via-[#4338ca] to-[#18181b]",
];

export type PublicBlogPost = {
  source: "database" | "static";
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  role: string;
  date: string;
  readingTime: string;
  gradient: string;
  featured?: boolean;
  thumbnailUrl?: string;
  content?: string;
  body?: Block[];
};

function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min read`;
}

function gradientFor(slug: string) {
  const total = Array.from(slug).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return gradients[total % gradients.length];
}

function staticPosts(): PublicBlogPost[] {
  return POSTS.map((post) => ({
    source: "static",
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    author: post.author,
    role: post.role,
    date: post.date,
    readingTime: post.readingTime,
    gradient: post.gradient,
    featured: post.featured,
    body: post.body,
  }));
}

export async function getPublicBlogPosts(): Promise<PublicBlogPost[]> {
  const rows = await getDb()
    .select({
      slug: blogPosts.slug,
      title: blogPosts.title,
      excerpt: blogPosts.excerpt,
      content: blogPosts.content,
      thumbnailUrl: blogPosts.thumbnailUrl,
      createdAt: blogPosts.createdAt,
      pathName: learningPaths.name,
      authorName: users.name,
      authorRole: users.profileRole,
    })
    .from(blogPosts)
    .leftJoin(learningPaths, eq(blogPosts.pathId, learningPaths.id))
    .leftJoin(users, eq(blogPosts.authorId, users.id))
    .orderBy(desc(blogPosts.createdAt));

  const databasePosts = rows.map((post, index) => ({
    source: "database" as const,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.pathName ?? "Blog",
    author: post.authorName || "TheOddOnes",
    role: post.authorRole || "TheOddOnes team",
    date: formatDate(post.createdAt),
    readingTime: readingTime(post.content),
    gradient: gradientFor(post.slug),
    featured: index === 0,
    thumbnailUrl: post.thumbnailUrl || undefined,
    content: post.content,
  }));

  return [...databasePosts, ...staticPosts()];
}

export async function getPublicBlogPost(slug: string) {
  const posts = await getPublicBlogPosts();
  return posts.find((post) => post.slug === slug);
}
