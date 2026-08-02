import { getPublicBlogPost } from "@/lib/public-blogs";
import { absoluteUrl, siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

function line(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublicBlogPost(slug).catch(() => undefined);

  if (!post) {
    return new Response("Not found\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const meta = [
    `# ${line(post.title)}`,
    `> ${line(post.excerpt)}`,
    "",
    `URL: ${absoluteUrl(`/blogs/${post.slug}`)}`,
    `Site: ${siteConfig.name} (${siteConfig.url})`,
    `Category: ${line(post.category)}`,
    `Author: ${line(post.author)}`,
    `Published: ${post.date}`,
    `Reading time: ${post.readingTime}`,
  ].join("\n");

  const content = (post.content ?? "").trim() || line(post.excerpt);
  const body = `${meta}\n\n${content}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
