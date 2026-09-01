"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PenLine,
  Route,
  Shapes,
  User,
  Users,
  X,
} from "@/components/ui/tabler-icons";
import { cn } from "@/lib/utils";

const iconMap = {
  overview: LayoutDashboard,
  paths: Route,
  lessons: BookOpen,
  blogs: FileText,
  categories: Shapes,
  users: Users,
  author: User,
  write: PenLine,
} as const;

export type NavIconKey = keyof typeof iconMap;

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: NavIconKey;
  section?: string;
  children?: { href: string; label: string; icon: NavIconKey }[];
};

type DashboardNavProps = {
  items: DashboardNavItem[];
  brandHref: string;
  consoleLabel: string;
  logout: () => void | Promise<void>;
};

function isActive(pathname: string, href: string) {
  if (href === "/dashboard" || href === "/author/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardNav({
  items,
  brandHref,
  consoleLabel,
  logout,
}: DashboardNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const brand = (
    <Link href={brandHref} className="block text-xl font-bold leading-none tracking-tight">
      The<span className="text-[#c4622d]">Odd</span>Ones
    </Link>
  );

  const navList = (onNavigate?: () => void) => (
    <nav className="space-y-0.5">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon];
        const active = isActive(pathname, item.href);
        const previousSection = index > 0 ? items[index - 1].section : undefined;
        const showSection = item.section && item.section !== previousSection;

        return (
          <Fragment key={item.href}>
            {showSection ? (
              <p className="px-3 pb-1 pt-4 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                {item.section}
              </p>
            ) : null}
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#c4622d]/10 text-[#c4622d]"
                  : "text-foreground/65 hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className={cn("size-4 transition-colors", active ? "text-[#c4622d]" : "text-muted-foreground group-hover:text-foreground")} />
              {item.label}
            </Link>

            {item.children ? (
              <div className="ml-6 mt-0.5 space-y-0.5 border-l border-border pl-3">
                {item.children.map((child) => {
                  const ChildIcon = iconMap[child.icon];
                  const childActive = isActive(pathname, child.href) && pathname !== item.href;

                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onNavigate}
                      aria-current={childActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors",
                        childActive
                          ? "text-[#c4622d]"
                          : "text-foreground/55 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <ChildIcon className="size-3.5" />
                      {child.label}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </Fragment>
        );
      })}
    </nav>
  );

  const footer = (onNavigate?: () => void) => (
    <div className="space-y-2 border-t border-border pt-4">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Home className="size-4" />
        Back to site
      </Link>
      <form action={logout}>
        <Button type="submit" variant="outline" className="h-9 w-full justify-start">
          <LogOut className="size-4" />
          Log out
        </Button>
      </form>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-svh w-64 flex-col bg-background px-3 py-5 dark:bg-[#181818] lg:flex">
        <div className="flex items-start justify-between gap-3 px-2">
          <div className="min-w-0">
            {brand}
            <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70">
              {consoleLabel}
            </p>
          </div>
          <ThemeSwitcher />
        </div>

        <div className="mt-5 flex-1 overflow-y-auto pr-0.5">{navList()}</div>

        <div className="mt-auto border-t border-border/60 pt-3">{footer()}</div>
      </aside>

      {/* Mobile top bar */}
      <div className="mb-4 rounded-2xl border border-border/80 bg-background p-3 shadow-sm dark:border-white/8 dark:bg-[#181818] lg:hidden">
        <div className="flex items-center justify-between gap-3">
          {brand}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="mt-3 border-t border-border pt-3">
            <div>{navList(() => setMobileOpen(false))}</div>
            <div className="mt-4 border-t border-border pt-3">{footer(() => setMobileOpen(false))}</div>
          </div>
        ) : null}
      </div>
    </>
  );
}
