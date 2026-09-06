import type { Metadata } from "next";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";
import { getPublicBlogPosts } from "@/lib/public-blogs";
import { pageMetadata } from "@/lib/seo";

// Cache the list; admin blog mutations call revalidatePath("/blogs") for instant refresh.
export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Robotics, ROS2 and Software Field Notes",
  description:
    "Read TheOddOnes field notes on robotics, ROS2, drone software, embedded systems, testing, product building, and project-based engineering.",
  path: "/blogs",
  keywords: [
    "robotics blog",
    "ROS2 blog",
    "drone software blogs",
    "robotics field notes",
    "software engineering blog",
    "embedded systems blog",
    "project based learning blog",
  ],
});

export default async function BlogPage() {
  const posts = await getPublicBlogPosts();

  return <BlogIndexClient posts={posts} />;
}
