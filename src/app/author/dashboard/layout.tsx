import type { Metadata } from "next";

import { logoutAction } from "@/app/admin-actions";
import { DashboardNav, type DashboardNavItem } from "@/components/admin/DashboardNav";
import { requireAuthorSession } from "@/lib/admin-auth";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Author Dashboard",
  description: "Private TheOddOnes author dashboard.",
  path: "/author/dashboard",
  noIndex: true,
});

const navItems: DashboardNavItem[] = [
  { href: "/author/dashboard", label: "Blogs", icon: "blogs" },
  { href: "/author/dashboard/profile", label: "Profile", icon: "author", section: "Account" },
];

export default async function AuthorDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAuthorSession();

  return (
    <main className="min-h-svh bg-muted/30 font-space text-foreground dark:bg-[#131313]">
      <div className="lg:pl-64">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <DashboardNav
            items={navItems}
            brandHref="/author/dashboard"
            consoleLabel="Author console"
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
