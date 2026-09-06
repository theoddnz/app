import type { Metadata } from "next";

import { logoutAction } from "@/app/admin-actions";
import { DashboardNav, type DashboardNavItem } from "@/components/admin/DashboardNav";
import { requireAdminSession } from "@/lib/admin-auth";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admin Dashboard",
  description: "Private TheOddOnes admin dashboard.",
  path: "/dashboard",
  noIndex: true,
});

const navItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "overview" },
  { href: "/dashboard/paths", label: "Paths", icon: "paths", section: "Content" },
  { href: "/dashboard/lessons", label: "Lessons", icon: "lessons", section: "Content" },
  { href: "/dashboard/mini-series", label: "Mini-series", icon: "lessons", section: "Content" },
  {
    href: "/dashboard/blogs",
    label: "Blogs",
    icon: "blogs",
    section: "Content",
    children: [
      { href: "/dashboard/blogs", label: "All blogs", icon: "blogs" },
      { href: "/dashboard/blogs/categories", label: "Categories", icon: "categories" },
    ],
  },
  { href: "/dashboard/users", label: "Users", icon: "users", section: "People" },
  { href: "/dashboard/authors", label: "Authors", icon: "author", section: "People" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdminSession();

  return (
    <main className="min-h-svh bg-muted/30 font-space text-foreground dark:bg-[#131313]">
      <div className="lg:pl-64">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <DashboardNav
            items={navItems}
            brandHref="/dashboard"
            consoleLabel="Admin console"
            logout={logoutAction}
          />

          <div className="mx-auto min-h-[calc(100svh-2rem)] max-w-375">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
