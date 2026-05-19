import { MetadataRoute } from "next";

import { getDb } from "@/db";
import { blogPosts, learningPaths as learningPathRows } from "@/db/schema";
import { posts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";

const now = new Date();
export const dynamic = "force-dynamic";
const staticRouteEntries = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/mission", priority: 0.8, changeFrequency: "monthly" },
  { path: "/community", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/learn", priority: 0.9, changeFrequency: "weekly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = staticRouteEntries.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));

  let blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: post.featured ? 0.85 : 0.7,
  }));

  let learnRoutes: MetadataRoute.Sitemap = [];

  let blogPathRoutes: MetadataRoute.Sitemap = [];

  try {
    const [dbPosts, dbPaths] = await Promise.all([
      getDb().select().from(blogPosts),
      getDb().select().from(learningPathRows),
    ]);

    if (dbPosts.length > 0) {
      blogRoutes = dbPosts.map((post) => ({
        url: absoluteUrl(`/blogs/${post.slug}`),
        lastModified: post.updatedAt,
        changeFrequency: "monthly",
        priority: 0.75,
        images: post.thumbnailUrl ? [absoluteUrl(post.thumbnailUrl)] : undefined,
      }));
    }

    if (dbPaths.length > 0) {
      learnRoutes = dbPaths
        .filter((path) => path.isVisible)
        .map((path) => ({
          url: absoluteUrl(`/learn/${path.slug}`),
          lastModified: path.updatedAt,
          changeFrequency: "monthly",
          priority: path.isLaunched ? 0.9 : 0.75,
          images: path.thumbnailUrl ? [absoluteUrl(path.thumbnailUrl)] : undefined,
        }));

      blogPathRoutes = dbPaths
        .filter((path) => path.isVisible)
        .map((path) => ({
          url: absoluteUrl(`/blogs/path/${path.slug}`),
          lastModified: path.updatedAt,
          changeFrequency: "monthly",
          priority: 0.65,
        }));
    }
  } catch {
    // Keep sitemap generation available in local builds without database access.
  }

  return [...staticRoutes, ...learnRoutes, ...blogPathRoutes, ...blogRoutes];
}
