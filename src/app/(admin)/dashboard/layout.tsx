import Link from "next/link";
import { BookOpen, FileText, LayoutDashboard, LogOut, Route, Users } from "lucide-react";

import { logoutAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { requireAdminSession } from "@/lib/admin-auth";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/paths", label: "Paths", icon: Route },
  { href: "/dashboard/lessons", label: "Lessons", icon: BookOpen },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return (
    <main className="mt-20 min-h-[80svh] bg-background font-space text-foreground">
      <div className="mx-auto flex max-w-7xl gap-6 px-5 py-8 md:px-8">
        <aside className="sticky top-24 hidden h-[calc(100svh-7rem)] w-64 shrink-0 flex-col rounded-lg border border-border bg-card p-4 lg:flex">
          <Link href="/dashboard" className="text-xl font-bold">
            The<span className="text-[#c4622d]">Odd</span>Ones
          </Link>
          <p className="mt-2 truncate text-xs text-muted-foreground">{session.email}</p>

          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-muted hover:text-foreground">
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Users className="size-4" />
              Admin
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Manage paths, lessons, blogs, and users.</p>
          </div>

          <form action={logoutAction} className="mt-3">
            <Button type="submit" variant="outline" className="h-9 w-full">
              <LogOut className="size-4" />
              Log out
            </Button>
          </form>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex gap-2 overflow-x-auto lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Button key={item.href} asChild variant="outline" className="h-9 shrink-0">
                  <Link href={item.href}>
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}
