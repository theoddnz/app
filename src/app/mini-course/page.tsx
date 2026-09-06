import type { Metadata } from "next";
import Link from "next/link";
import { Play, Sparkles } from "@/components/ui/tabler-icons";

import { listPublishedSeries } from "@/lib/mini-course";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mini-series",
  description: "Short, build-first robotics mini-series.",
  robots: { index: false, follow: false },
};

function priceLabel(cents: number, currency: string) {
  if (!cents) return "Free";
  return `${(cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  })}/mo`;
}

export default async function MiniCourseIndexPage() {
  const series = await listPublishedSeries();

  return (
    <main className="min-h-dvh bg-background px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted px-3 py-1 font-space text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="size-3.5 text-[#c4622d]" />
            Mini-series
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Build-first, in a <span className="text-[#c4622d]">weekend.</span>
          </h1>
          <p className="mt-4 font-space text-[15px] leading-relaxed text-muted-foreground">
            Short, vertical robotics courses. Watch a clip, answer a quick check, build something real.
          </p>
        </div>

        {series.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center font-space text-muted-foreground">
            No mini-series published yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {series.map((s) => (
              <Link
                key={s.id}
                href={`/mini-course/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  {s.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.thumbnailUrl} alt={s.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="grid size-full place-items-center bg-linear-to-br from-[#c4622d]/20 to-transparent">
                      <Play className="size-10 text-[#c4622d]" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="font-heading text-lg font-bold leading-tight text-foreground">{s.title}</h2>
                  {s.subtitle ? <p className="mt-1.5 line-clamp-2 font-space text-[13px] text-muted-foreground">{s.subtitle}</p> : null}
                  <div className="mt-4 flex items-center justify-between pt-2">
                    <span className="font-space text-[13px] font-semibold text-foreground">{priceLabel(s.priceCents, s.currency)}</span>
                    {s.lessonCount > 0 ? (
                      <span className="font-space text-[12px] text-muted-foreground">{s.lessonCount} lessons</span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
