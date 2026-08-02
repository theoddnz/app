import { desc } from "drizzle-orm";

import { getDb } from "@/db";
import { learningPaths } from "@/db/schema";
import { getPublicBlogPosts } from "@/lib/public-blogs";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

function line(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

export async function GET() {
  const [posts, paths] = await Promise.all([
    getPublicBlogPosts().catch(() => []),
    getDb()
      .select()
      .from(learningPaths)
      .orderBy(desc(learningPaths.createdAt))
      .catch(() => []),
  ]);

  const visiblePaths = paths.filter((path) => path.isVisible);

  const sections: string[] = [];

  sections.push(`# ${siteConfig.name} Robotics`);
  sections.push(`> ${line(siteConfig.description)}`);
  sections.push(
    line(
      `${siteConfig.name} is a build-first learning community for ROS 2, robotics, drones, robot perception, embedded systems, and software engineering. Content is organized into structured learning paths and technical blog posts written for people who learn by building real projects. Canonical site: ${siteConfig.url}.`,
    ),
  );

  sections.push(
    [
      "## Key pages",
      `- [Home](${absoluteUrl("/")}): Overview of ${siteConfig.name} and its build-first approach to robotics.`,
      `- [Learning paths](${absoluteUrl("/learn")}): Structured, project-based robotics and software learning tracks.`,
      `- [Blog](${absoluteUrl("/blogs")}): Technical articles on ROS 2, robotics, drones, and perception.`,
      `- [Mission](${absoluteUrl("/mission")}): Why ${siteConfig.name} exists and how it teaches.`,
      `- [Community](${absoluteUrl("/community")}): How to join and take part in the community.`,
      `- [Sponsors](${absoluteUrl("/sponsors")}): Organizations supporting the project.`,
    ].join("\n"),
  );

  if (visiblePaths.length > 0) {
    const items = visiblePaths.map((path) => {
      const status = path.isLaunched ? "Launched" : "In progress";
      const description = line(path.description) || "Project-based robotics learning path.";
      return `- [${line(path.name)}](${absoluteUrl(`/learn/${path.slug}`)}): ${description} Status: ${status}.`;
    });
    sections.push(["## Learning paths", ...items].join("\n"));
  }

  if (posts.length > 0) {
    const items = posts.map((post) => {
      const description = line(post.excerpt) || `${line(post.category)} article by ${line(post.author)}.`;
      return `- [${line(post.title)}](${absoluteUrl(`/blogs/${post.slug}`)}): ${description} Category: ${line(
        post.category,
      )}. Author: ${line(post.author)}. Published: ${post.date}. Reading time: ${post.readingTime}.`;
    });
    sections.push(["## Blog posts", ...items].join("\n"));
  }

  const links: string[] = ["## Links"];
  if (siteConfig.social.x) links.push(`- [X](${siteConfig.social.x})`);
  if (siteConfig.social.instagram) links.push(`- [Instagram](${siteConfig.social.instagram})`);
  if (siteConfig.social.youtube) links.push(`- [YouTube](${siteConfig.social.youtube})`);
  if (siteConfig.social.linkedin) links.push(`- [LinkedIn](${siteConfig.social.linkedin})`);
  links.push(`- [Sitemap](${absoluteUrl("/sitemap.xml")})`);
  links.push(`- [Full content for AI](${absoluteUrl("/llms-full.txt")})`);
  sections.push(links.join("\n"));

  const body = `${sections.join("\n\n")}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
