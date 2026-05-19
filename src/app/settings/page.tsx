import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { ArrowUpRight, BadgeCheck, BookOpen, CalendarDays, Mail, Shield, User } from "lucide-react";

import { getDb } from "@/db";
import { learningPaths, userPathSelections, users } from "@/db/schema";
import { ProfileForm } from "@/components/ProfileForm";
import { Button } from "@/components/ui/button";
import { getAppSession } from "@/lib/admin-auth";
import { pageMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Profile Settings",
  description: "Manage your TheOddOnes profile.",
  path: "/settings",
  noIndex: true,
});

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default async function SettingsPage() {
  const session = await getAppSession();

  if (!session) {
    redirect("/users/login");
  }

  const [user, selection] = await Promise.all([
    getDb().query.users.findFirst({
      where: eq(users.id, session.userId),
    }),
    getDb().query.userPathSelections.findFirst({
      where: eq(userPathSelections.userId, session.userId),
    }),
  ]);

  if (!user) {
    redirect("/users/login");
  }

  const selectedPath = selection
    ? await getDb().query.learningPaths.findFirst({
        where: eq(learningPaths.id, selection.pathId),
      })
    : null;

  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-inter text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <User className="size-3" />
              Account
            </p>
            <h1 className="font-space text-5xl font-bold tracking-tight">Profile settings.</h1>
            <p className="mt-5 max-w-xl font-inter text-sm leading-7 text-foreground/55">
              Your account, role, and current learning path in one place.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-foreground text-background">
                <User className="size-6" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-space text-lg font-semibold">{user.name || "Odd One"}</p>
                <p className="truncate text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[1fr_360px]">
          <ProfileForm name={user.name} />

          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="font-space text-lg font-semibold">Account details</h2>
              <div className="mt-5 space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="size-4 text-muted-foreground" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="size-4 text-muted-foreground" />
                  <span className="capitalize">{user.role}</span>
                </div>
                <div className="flex items-center gap-3">
                  <BadgeCheck className="size-4 text-muted-foreground" />
                  <span className="capitalize">{user.authProvider} account</span>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="size-4 text-muted-foreground" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>
            </div>

            {user.role === "student" ? (
              <div className="rounded-lg border border-border bg-card p-5">
                <BookOpen className="size-5 text-muted-foreground" />
                <h2 className="mt-5 font-space text-lg font-semibold">Current path</h2>
                {selectedPath ? (
                  <>
                    <p className="mt-2 text-sm font-medium">{selectedPath.name}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{selectedPath.description || "Path details are being prepared."}</p>
                    <Button asChild className="mt-5 w-full">
                      <Link href="/my-learning">
                        Open dashboard <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">No path selected yet.</p>
                    <Button asChild className="mt-5 w-full">
                      <Link href="/learn">
                        Choose path <ArrowUpRight className="size-4" />
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-5">
                <Shield className="size-5 text-muted-foreground" />
                <h2 className="mt-5 font-space text-lg font-semibold">Admin access</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">You can manage paths, lessons, blogs, and users from the admin dashboard.</p>
                <Button asChild className="mt-5 w-full">
                  <Link href="/dashboard">
                    Open dashboard <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
