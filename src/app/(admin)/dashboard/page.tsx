import Link from "next/link";
import { BookOpen, FileText, Route, Users } from "@/components/ui/tabler-icons";

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
  const displayedUsers = allUsers.filter((user) => user.role !== "admin");
  const students = displayedUsers.filter((user) => user.role === "student").length;
  const adminLinks = [
    {
      href: "/dashboard/users",
      title: "Users",
      description: "Review registered users, roles, sign-in method, and profile details.",
      total: displayedUsers.length,
      icon: Users,
    },
    {
      href: "/dashboard/paths",
      title: "Paths",
      description: "Create and manage course details, thumbnails, visibility, and launch state.",
      total: paths.length,
      icon: Route,
    },
    {
      href: "/dashboard/lessons",
      title: "Lessons",
      description: "Add lessons under paths, store video links, thumbnails, duration, and hold state.",
      total: allLessons.length,
      icon: BookOpen,
    },
    {
      href: "/dashboard/blogs",
      title: "Blogs",
      description: "Write path-specific blogs with markdown, preview, thumbnails, and inline images.",
      total: allBlogs.length,
      icon: FileText,
    },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Admin dashboard"
        description="A simple overview of users, paths, lessons, and blogs."
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Users", value: displayedUsers.length, sub: `${students} students`, icon: Users },
          { label: "Paths", value: paths.length, sub: `${visiblePaths} visible, ${launchedPaths} launched`, icon: Route },
          { label: "Lessons", value: allLessons.length, sub: `${heldLessons} on hold`, icon: BookOpen },
          { label: "Blogs", value: allBlogs.length, sub: "Path-specific posts", icon: FileText },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <Icon className="size-5 text-muted-foreground" />
              </div>
              <p className="mt-3 text-2xl font-semibold">{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.sub}</p>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <div>
            <h2 className="text-xl font-semibold">Manage</h2>
            <p className="mt-1 text-sm text-muted-foreground">Open the section you want to update.</p>
          </div>
          <span className="rounded-md bg-muted px-3 py-1 text-sm text-muted-foreground">4 sections</span>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {adminLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href} className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/45">
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-muted-foreground" />
                  <span className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{item.total} total</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.description}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
