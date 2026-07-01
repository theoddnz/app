import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { getPublicBlogPosts } from "@/lib/public-blogs";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublicBlogPosts();

  return <BlogIndexClient posts={posts} />;
}
