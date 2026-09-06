import { desc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { BookOpen, PenLine, Trash2, Video } from "@/components/ui/tabler-icons";

import { deleteMiniSeriesAction } from "@/app/(admin)/dashboard/mini-series/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EmptyState, StatCard } from "@/components/admin/DashboardCards";
import { MiniSeriesCreateDialog } from "@/components/admin/MiniSeriesCreateDialog";
import { Button } from "@/components/ui/button";
import { getDb } from "@/db";
import { miniSeries, miniSeriesLessons } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

function formatPrice(cents: number, currency: string) {
  if (!cents) return "Free";
  return `${(cents / 100).toLocaleString(undefined, { style: "currency", currency: currency.toUpperCase() })}/mo`;
}

export default async function MiniSeriesAdminPage() {
  await requireAdminSession();

  const db = getDb();
  const rows = await db
    .select({
      id: miniSeries.id,
      title: miniSeries.title,
      slug: miniSeries.slug,
      status: miniSeries.status,
      priceCents: miniSeries.priceCents,
      currency: miniSeries.currency,
      createdAt: miniSeries.createdAt,
      lessonCount: sql<number>`(select count(*) from ${miniSeriesLessons} where ${miniSeriesLessons.seriesId} = ${miniSeries.id})`,
    })
    .from(miniSeries)
    .orderBy(desc(miniSeries.createdAt));

  const published = rows.filter((r) => r.status === "published").length;

  return (
    <div className="space-y-8">
      <AdminHeader
        eyebrow="Content"
        title="Mini-series"
        description="Paid, video-first mini courses with monthly subscription access, notes, quizzes, and projects."
        actions={<MiniSeriesCreateDialog />}
      />

      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard label="Total series" value={rows.length} hint="All drafts + published" icon={Video} accent />
        <StatCard label="Published" value={published} hint="Live for learners" icon={BookOpen} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">All series</h2>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{rows.length} total</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {rows.length === 0 ? (
            <EmptyState
              icon={Video}
              title="No mini-series yet"
              description="Create your first series, then add lessons and upload videos."
              action={<MiniSeriesCreateDialog />}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 border-collapse text-left text-sm">
                <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-medium">Series</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Status</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium md:table-cell">Lessons</th>
                    <th scope="col" className="hidden px-5 py-3 font-medium lg:table-cell">Price</th>
                    <th scope="col" className="px-5 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((series) => (
                    <tr key={series.id} className="transition-colors hover:bg-muted/30">
                      <td className="px-5 py-4 align-middle">
                        <p className="font-medium">{series.title}</p>
                        <p className="truncate text-xs text-muted-foreground">/{series.slug}</p>
                      </td>
                      <td className="hidden px-5 py-4 align-middle md:table-cell">
                        <span
                          className={
                            series.status === "published"
                              ? "inline-flex h-7 items-center rounded-full bg-emerald-500/10 px-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                              : "inline-flex h-7 items-center rounded-full bg-muted px-2.5 text-xs font-medium text-muted-foreground"
                          }
                        >
                          {series.status}
                        </span>
                      </td>
                      <td className="hidden px-5 py-4 align-middle text-muted-foreground md:table-cell">{series.lessonCount}</td>
                      <td className="hidden whitespace-nowrap px-5 py-4 align-middle text-muted-foreground lg:table-cell">
                        {formatPrice(series.priceCents, series.currency)}
                      </td>
                      <td className="px-5 py-4 align-middle">
                        <div className="flex items-center justify-end gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/dashboard/mini-series/${series.id}/edit`}>
                              <PenLine className="size-4" />
                              Edit
                            </Link>
                          </Button>
                          <form action={deleteMiniSeriesAction}>
                            <input type="hidden" name="id" value={series.id} />
                            <Button type="submit" variant="destructive" size="icon-sm" aria-label={`Delete ${series.title}`}>
                              <Trash2 className="size-3.5" />
                            </Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
