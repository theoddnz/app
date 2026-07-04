import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, Home, LayoutDashboard, LogOut, Route, User, Users } from "@/components/ui/tabler-icons";

import { logoutAction } from "@/app/admin-actions";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { requireAdminSession } from "@/lib/admin-auth";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Private TheOddOnes admin dashboard.",
  path: "/dashboard",
  noIndex: true,
});

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/paths", label: "Paths", icon: Route },
  { href: "/dashboard/lessons", label: "Lessons", icon: BookOpen },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/authors", label: "Authors", icon: User },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAdminSession();

  return (
    <main className="min-h-screen bg-muted/25 font-space text-foreground dark:bg-[#131313]">
      <div className="w-full px-4 py-4 sm:px-5 lg:px-6">
        <aside className="fixed left-6 top-4 z-30 hidden h-[calc(100svh-2rem)] w-64 flex-col rounded-lg border border-border bg-background p-4 shadow-sm dark:bg-[#181818] lg:flex">
          <div className="border-b border-border pb-4">
            <div className="flex items-center justify-between gap-3">
              <Link href="/dashboard" className="block text-xl font-bold leading-none">
                The<span className="text-[#c4622d]">Odd</span>Ones
              </Link>
              <ThemeSwitcher />
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Admin console</p>
          </div>

          <div className="mt-4 rounded-lg bg-muted/60 p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="flex size-8 items-center justify-center rounded-md bg-background text-xs uppercase text-muted-foreground ring-1 ring-border">
                {session.email.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm">Admin</p>
                <p className="truncate text-xs text-muted-foreground">{session.email}</p>
              </div>
            </div>
          </div>

          <nav className="mt-8 space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground">
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-2 border-t border-border pt-4">
            <Link href="/" className="flex h-9 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <Home className="size-4" />
              Back to site
            </Link>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" className="h-9 w-full justify-start">
                <LogOut className="size-4" />
                Log out
              </Button>
            </form>
          </div>
        </aside>

        <div className="min-w-0 lg:pl-[17.25rem]">
          <div className="mb-4 space-y-3 rounded-lg border border-border bg-background p-3 shadow-sm dark:bg-[#181818] lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/dashboard" className="text-lg font-bold">
                The<span className="text-[#c4622d]">Odd</span>Ones
              </Link>
              <div className="flex items-center gap-2">
                <ThemeSwitcher />
                <form action={logoutAction}>
                  <Button type="submit" variant="outline" className="h-9">
                    <LogOut className="size-4" />
                    Log out
                  </Button>
                </form>
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
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
          </div>

          <div className="min-h-[calc(100svh-2rem)] rounded-lg bg-background/70 p-4 dark:bg-[#171717]/90 sm:p-5 lg:p-6">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
