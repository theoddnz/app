import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2, Clock3, FileText, Play, Route } from "lucide-react";

import { selectLearningPathAction } from "@/app/admin-actions";
import { Button } from "@/components/ui/button";
import { getLearningPaths } from "@/lib/learning";
import { pageMetadata } from "@/lib/seo";
import { getStudentDashboard } from "@/lib/student-learning";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "My Learning",
  description:
    "Your TheOddOnes learning dashboard with selected path, lessons, videos, and notes.",
  path: "/my-learning",
  noIndex: true,
});

function formatDuration(minutes: number) {
  if (minutes <= 0) return "Runtime soon";
  return `${minutes} min`;
}

export default async function MyLearningPage() {
  const dashboard = await getStudentDashboard();

  if (!dashboard.selectedPath) {
    const paths = await getLearningPaths();

    return (
      <main className="min-h-screen bg-background px-6 pt-32 text-foreground">
        <div className="mx-auto max-w-6xl">
          <section className="border-b border-border pb-12">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-inter text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Route className="size-3" />
              Path selection
            </p>
            <h1 className="font-space text-5xl font-bold tracking-tight">Choose your path.</h1>
            <p className="mt-5 max-w-xl font-inter text-sm leading-7 text-foreground/55">
              Pick one learning path to make it your dashboard. You can switch later.
            </p>
          </section>

          {paths.length === 0 ? (
            <section className="py-20 text-sm text-muted-foreground">
              We&apos;re cooking something insanely great. The paths are still under wraps.
            </section>
          ) : (
            <section className="grid gap-4 py-14 md:grid-cols-2 lg:grid-cols-3">
              {paths.map((path) => (
                <article key={path.id} className="flex min-h-[300px] flex-col justify-between rounded-lg border border-border bg-card p-6">
                  <div>
                    {path.thumbnailUrl ? (
                      <img src={path.thumbnailUrl} alt="" className="mb-5 aspect-video w-full rounded-lg border border-border object-cover" />
                    ) : null}
                    <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{path.label}</p>
                    <h2 className="font-space text-2xl font-semibold leading-tight">{path.name}</h2>
                    <p className="mt-4 line-clamp-4 text-sm leading-6 text-foreground/55">{path.description}</p>
                  </div>
                  <form action={selectLearningPathAction} className="mt-7">
                    <input type="hidden" name="pathId" value={path.id} />
                    <Button type="submit" className="w-full">
                      Choose path <ArrowUpRight className="size-4" />
                    </Button>
                  </form>
                </article>
              ))}
            </section>
          )}
        </div>
      </main>
    );
  }

  const { selectedPath, lessons, blogs, user } = dashboard;
  const readyLessons = lessons.filter((lesson) => !lesson.isHold);
  const firstVideoIndex = selectedPath.videos.items.findIndex((video) => !video.isFallback);
  const videoHref = `/learn/${selectedPath.slug}/watch?v=${Math.max(firstVideoIndex, 0)}`;

  return (
    <main className="min-h-screen bg-background px-6 pt-32 text-foreground">
      <div className="mx-auto max-w-6xl">
        <section className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-inter text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <CheckCircle2 className="size-3" />
              My learning
            </p>
            <h1 className="font-space text-5xl font-bold tracking-tight">{selectedPath.name}</h1>
            <p className="mt-5 max-w-2xl font-inter text-sm leading-7 text-foreground/55">
              {selectedPath.description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Welcome{user?.name ? `, ${user.name}` : ""}. This is your current path.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Progress shape</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="font-space text-2xl font-bold">{lessons.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Lessons</p>
              </div>
              <div>
                <p className="font-space text-2xl font-bold">{selectedPath.videos.items.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Videos</p>
              </div>
              <div>
                <p className="font-space text-2xl font-bold">{blogs.length}</p>
                <p className="mt-1 text-xs text-muted-foreground">Notes</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[1fr_340px]">
          <div className="rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h2 className="font-space text-xl font-semibold">Lessons</h2>
                <p className="mt-1 text-sm text-muted-foreground">{readyLessons.length} ready, {lessons.length - readyLessons.length} on hold</p>
              </div>
              <BookOpen className="size-5 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {lessons.length === 0 ? (
                <div className="p-6 text-sm text-muted-foreground">Lessons are being prepared for this path.</div>
              ) : (
                lessons.map((lesson, index) => (
                  <div key={lesson.id} className="grid gap-4 p-5 sm:grid-cols-[3rem_1fr_auto] sm:items-center">
                    <p className="font-space text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                    <div>
                      <p className="font-medium">{lesson.name}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{lesson.description || "Lesson details coming soon."}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock3 className="size-3" />
                      {lesson.isHold ? "On hold" : formatDuration(lesson.durationMinutes)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <Link href={videoHref} className="group block rounded-lg border border-border bg-foreground p-6 text-background transition-opacity hover:opacity-90">
              <Play className="size-8" />
              <h2 className="mt-8 font-space text-2xl font-semibold">Continue watching</h2>
              <p className="mt-3 text-sm leading-6 text-background/70">
                Open the video room for your selected path.
              </p>
              <span className="mt-7 inline-flex items-center gap-2 text-sm">
                Watch now <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>

            <Link href="/learn" className="block rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/35">
              <Route className="size-5 text-muted-foreground" />
              <h3 className="mt-5 font-space text-lg font-semibold">Switch path</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Choose a different path whenever your focus changes.</p>
            </Link>
          </aside>
        </section>

        <section className="pb-20">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-space text-2xl font-semibold">Path notes</h2>
            <FileText className="size-5 text-muted-foreground" />
          </div>
          {blogs.length === 0 ? (
            <div className="rounded-lg border border-border p-6 text-sm text-muted-foreground">No notes published for this path yet.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/35">
                  <h3 className="font-space text-lg font-semibold leading-snug">{blog.title}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{blog.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
