import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  FileText,
  Route,
  Users,
} from "@/components/ui/tabler-icons";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatCard } from "@/components/admin/DashboardCards";
import { UsersChart } from "@/components/admin/UsersChart";
import { getDb } from "@/db";
import { blogPosts, learningPaths, lessons, users } from "@/db/schema";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

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
  const authors = displayedUsers.filter((user) => user.role === "author").length;

  const recentUsers = [...displayedUsers]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);
  const recentBlogs = [...allBlogs]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const now = new Date();
  const usersPerMonth = Array.from({ length: 6 }, (_, index) => {
    const monthDate = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    const count = displayedUsers.filter((user) => {
      const created = user.createdAt;
      return (
        created.getFullYear() === monthDate.getFullYear() &&
        created.getMonth() === monthDate.getMonth()
      );
    }).length;

    return {
      label: monthDate.toLocaleString("en", { month: "short" }),
      count,
    };
  });

  const stats = [
    { label: "Users", value: displayedUsers.length, hint: `${students} students, ${authors} authors`, icon: Users, accent: true },
    { label: "Paths", value: paths.length, hint: `${visiblePaths} visible, ${launchedPaths} launched`, icon: Route },
    { label: "Lessons", value: allLessons.length, hint: `${heldLessons} on hold`, icon: BookOpen },
    { label: "Blogs", value: allBlogs.length, hint: "Path-specific posts", icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Overview"
        title="Admin dashboard"
        description="A snapshot of your platform - users, paths, lessons, and blogs at a glance."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard
            key={item.label}
            label={item.label}
            value={item.value}
            hint={item.hint}
            icon={item.icon}
            accent={item.accent}
          />
        ))}
      </section>

      <UsersChart data={usersPerMonth} />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold">Recent members</h2>
            <Link href="/dashboard/users" className="inline-flex items-center gap-1 text-xs font-medium text-[#c4622d] hover:underline">
              View all <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          {recentUsers.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">No members yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentUsers.map((user) => (
                <li key={user.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold uppercase text-muted-foreground">
                    {(user.name || user.email).slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{user.name || "Unnamed user"}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <span className="shrink-0 text-xs capitalize text-muted-foreground">{user.role}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-base font-semibold">Recent blogs</h2>
            <Link href="/dashboard/blogs" className="inline-flex items-center gap-1 text-xs font-medium text-[#c4622d] hover:underline">
              View all <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
          {recentBlogs.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">No blogs yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {recentBlogs.map((blog) => (
                <li key={blog.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#c4622d]/10 text-[#c4622d]">
                    <FileText className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{blog.title}</p>
                    <p className="truncate text-xs text-muted-foreground">/{blog.slug}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatDate(blog.createdAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
