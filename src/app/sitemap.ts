import { MetadataRoute } from "next";

import { getDb } from "@/db";
import { blogPosts, learningPaths as learningPathRows } from "@/db/schema";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";
const staticRouteEntries = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/mission", priority: 0.8, changeFrequency: "monthly" },
  { path: "/community", priority: 0.7, changeFrequency: "monthly" },
  { path: "/sponsors", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blogs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/learn", priority: 0.9, changeFrequency: "weekly" },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = staticRouteEntries.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    changeFrequency,
    priority,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];
  let learnRoutes: MetadataRoute.Sitemap = [];
  let blogPathRoutes: MetadataRoute.Sitemap = [];

  try {
    const [dbPosts, dbPaths] = await Promise.all([
      getDb().select().from(blogPosts),
      getDb().select().from(learningPathRows),
    ]);

    blogRoutes = dbPosts.map((post) => ({
      url: absoluteUrl(`/blogs/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
      images: post.thumbnailUrl ? [absoluteUrl(post.thumbnailUrl)] : undefined,
    }));

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
    // Keep sitemap generation available with only confirmed static pages if database access fails.
  }

  return [...staticRoutes, ...learnRoutes, ...blogPathRoutes, ...blogRoutes];
}
