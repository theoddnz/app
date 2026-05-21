import type { Metadata } from "next";
import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { ArrowLeft, ArrowUpRight, ChevronRight, FileText } from "@/components/ui/huge-icons";
import { notFound } from "next/navigation";

import { getDb } from "@/db";
import { blogPosts, learningPaths } from "@/db/schema";
import { absoluteUrl, jsonLd, keywordVariants, pageMetadata, siteConfig } from "@/lib/seo";

type Props = {
  params: Promise<{ pathSlug: string }>;
};

export const dynamic = "force-dynamic";

const categoryHeroStyles = [
  "bg-[#fff4d8] text-[#1f1a10] border-[#f2d27c]",
  "bg-[#e0f2fe] text-[#102033] border-[#8ec7e8]",
  "bg-[#dcfce7] text-[#102217] border-[#86d39b]",
  "bg-[#ffe4e6] text-[#2c1218] border-[#f0a7b0]",
  "bg-[#ede9fe] text-[#1f1735] border-[#b8a8ee]",
  "bg-[#fef3c7] text-[#251709] border-[#e8bc5f]",
];

function getCategoryStyle(slug: string) {
  const total = slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return categoryHeroStyles[total % categoryHeroStyles.length];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pathSlug } = await params;
  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.slug, pathSlug),
  });

  if (!path) {
    return { title: "Path not found | TheOddOnes" };
  }

  return pageMetadata({
    title: `${path.name} Field Notes`,
    description:
      path.description || `Read ${path.name} field notes, build logs, and project-based learning essays from TheOddOnes.`,
    path: `/blogs/path/${path.slug}`,
    images: path.thumbnailUrl ? [path.thumbnailUrl] : undefined,
    keywords: [
      ...keywordVariants(path.name),
      `${path.name} field notes`,
      `${path.name} build logs`,
      "TheOddOnes field notes",
      "learning path notes",
    ],
  });
}

export default async function BlogsByPathPage({ params }: Props) {
  const { pathSlug } = await params;
  const path = await getDb().query.learningPaths.findFirst({
    where: eq(learningPaths.slug, pathSlug),
  });

  if (!path) {
    notFound();
  }

  const blogs = await getDb()
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.pathId, path.id))
    .orderBy(desc(blogPosts.createdAt));
  const heroStyle = getCategoryStyle(path.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${path.name} Field Notes`,
    description:
      path.description || `Read ${path.name} field notes, build logs, and learning essays from TheOddOnes.`,
    url: absoluteUrl(`/blogs/path/${path.slug}`),
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogs.map((blog, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: blog.title,
        url: absoluteUrl(`/blogs/${blog.slug}`),
        description: blog.excerpt,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground font-space">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs font-semibold text-foreground/40">
          <Link href="/blogs" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            <ArrowLeft size={14} />
            Blogs
          </Link>
          <ChevronRight size={12} className="opacity-40" />
          <span className="text-foreground/70">{path.name}</span>
        </nav>

        <header className={`relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-lg border p-8 text-center ${heroStyle}`}>
          <div className="absolute left-6 top-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-60">
            <FileText className="size-4" />
            {blogs.length} {blogs.length === 1 ? "post" : "posts"}
          </div>
        
          <div className="relative max-w-2xl">
            <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight">{path.name}</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 opacity-70">
              {path.description || "Path-specific field notes and learning essays."}
            </p>
          </div>
        </header>

        {blogs.length === 0 ? (
          <section className="py-20 text-sm text-muted-foreground">No blogs for this path yet.</section>
        ) : (
          <section className="grid gap-5 py-16 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="group flex min-h-[260px] flex-col justify-between rounded-lg border border-border bg-card p-6 transition-colors hover:bg-muted/35"
              >
                <div>
                {blog.thumbnailUrl ? (
                  <img src={blog.thumbnailUrl} alt="" className="mb-5 aspect-video w-full rounded-lg border border-border object-cover" />
                ) : null}
                <h2 className="text-xl font-semibold leading-snug">{blog.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/55">{blog.excerpt}</p>
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-sm text-foreground/50 group-hover:text-foreground">
                  Read post <ArrowUpRight className="size-4" />
                </span>
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
