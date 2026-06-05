import Link from "next/link";
import { BookOpen, Eye, FileText, Route, Users } from "@/components/ui/tabler-icons";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { getDb } from "@/db";
import { blogPosts, learningPaths, lessons, users } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [paths, allLessons, allBlogs, allUsers] = await Promise.all([
    getDb().select().from(learningPaths),
    getDb().select().from(lessons),
    getDb().select().from(blogPosts),
    getDb().select().from(users),
  ]);
  const visiblePaths = paths.filter((path) => path.isVisible).length;
  const launchedPaths = paths.filter((path) => path.isLaunched).length;
  const heldLessons = allLessons.filter((lesson) => lesson.isHold).length;
  const students = allUsers.filter((user) => user.role === "student").length;

  return (
      <div className="space-y-8">
        <AdminHeader
          title="Admin dashboard"
          description="Choose a section. Paths and lessons are managed on separate pages now."
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Users", value: allUsers.length, sub: `${students} students`, icon: Users },
            { label: "Paths", value: paths.length, sub: `${visiblePaths} visible, ${launchedPaths} launched`, icon: Route },
            { label: "Lessons", value: allLessons.length, sub: `${heldLessons} on hold`, icon: BookOpen },
            { label: "Blogs", value: allBlogs.length, sub: "Path-specific posts", icon: FileText },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <Icon className="size-5 text-muted-foreground" />
                </div>
                <p className="mt-4 text-3xl font-semibold">{item.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.sub}</p>
              </div>
            );
          })}
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <Eye className="size-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Quick view</h2>
          </div>
          <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
            <p className="rounded-lg bg-muted p-3">Students land on `/learn` after sign in.</p>
            <p className="rounded-lg bg-muted p-3">Visible paths are the ones you should show publicly.</p>
            <p className="rounded-lg bg-muted p-3">Held lessons can wait while the path remains live.</p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link href="/dashboard/paths" className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <Route className="size-6" />
              <span className="text-sm text-muted-foreground">{paths.length} total</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">Paths</h2>
            <p className="mt-2 text-sm text-muted-foreground">Create and manage course/path details, thumbnails, visibility, and launch state.</p>
            <span className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
              Open paths
            </span>
          </Link>

          <Link href="/dashboard/lessons" className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <BookOpen className="size-6" />
              <span className="text-sm text-muted-foreground">{allLessons.length} total</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">Lessons</h2>
            <p className="mt-2 text-sm text-muted-foreground">Add lessons under paths, store video links, thumbnails, duration, and hold state.</p>
            <span className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
              Open lessons
            </span>
          </Link>

          <Link href="/dashboard/blogs" className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/40">
            <div className="flex items-center justify-between">
              <FileText className="size-6" />
              <span className="text-sm text-muted-foreground">{allBlogs.length} total</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">Blogs</h2>
            <p className="mt-2 text-sm text-muted-foreground">Write path-specific blogs with markdown, preview, thumbnails, and inline images.</p>
            <span className="mt-5 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground">
              Open blogs
            </span>
          </Link>
        </section>
      </div>
  );
}
