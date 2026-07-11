import { and, desc, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/ui/tabler-icons";

import { updateAuthorBlogPostAction } from "@/app/admin-actions";
import { BlogForm } from "@/components/admin/BlogForm";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { blogCategories, blogPosts, learningPaths } from "@/db/schema";
import { requireAuthorSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function EditAuthorBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireAuthorSession();
  const { id } = await params;

  const [blog, paths, categories] = await Promise.all([
    getDb().query.blogPosts.findFirst({
      where: and(eq(blogPosts.id, id), eq(blogPosts.authorId, session.userId)),
    }),
    getDb()
      .select({
        id: learningPaths.id,
        name: learningPaths.name,
      })
      .from(learningPaths)
      .orderBy(desc(learningPaths.createdAt)),
    getDb()
      .select({
        id: blogCategories.id,
        name: blogCategories.name,
      })
      .from(blogCategories)
      .orderBy(desc(blogCategories.createdAt)),
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <Button asChild variant="outline" className="h-9">
          <Link href="/author/dashboard">
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Link>
        </Button>

        <BlogForm
          paths={paths}
          categories={categories}
          action={updateAuthorBlogPostAction}
          initialValues={{
            id: blog.id,
            pathId: blog.pathId,
            categoryId: blog.categoryId,
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            thumbnailUrl: blog.thumbnailUrl,
          }}
          heading="Edit blog"
          description="Update your public blog post. Slugs are kept unique automatically."
          submitLabel="Save changes"
        />
    </div>
  );
}
