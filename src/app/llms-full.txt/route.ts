import { getPublicBlogPosts } from "@/lib/public-blogs";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

function line(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

export async function GET() {
  const posts = await getPublicBlogPosts().catch(() => []);

  const sections: string[] = [];

  sections.push(`# ${siteConfig.name} Robotics: Full Content`);
  sections.push(`> ${line(siteConfig.description)}`);
  sections.push(
    line(
      `This document contains the full text of published ${siteConfig.name} blog posts for language models and AI agents. Each post links back to its canonical page. Canonical site: ${siteConfig.url}.`,
    ),
  );

  for (const post of posts) {
    const meta = [
      `URL: ${absoluteUrl(`/blogs/${post.slug}`)}`,
      `Category: ${line(post.category)}`,
      `Author: ${line(post.author)}`,
      `Published: ${post.date}`,
      `Reading time: ${post.readingTime}`,
    ].join("\n");

    const content = (post.content ?? "").trim() || line(post.excerpt);

    sections.push([`## ${line(post.title)}`, meta, "", content].join("\n"));
  }

  const body = `${sections.join("\n\n")}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
