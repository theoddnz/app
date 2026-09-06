import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buildSeriesSlides } from "@/components/mini-course/curriculum";
import { CoursePlayerClient } from "@/components/mini-course/CoursePlayerClient";
import { Paywall } from "@/components/mini-course/Paywall";
import { getAppSession } from "@/lib/admin-auth";
import {
  getProgress,
  getPublishedSeriesMeta,
  getSeriesContent,
  hasActiveEntitlement,
  reconcileEntitlement,
} from "@/lib/mini-course";

// Per-user gating (entitlement + progress) — never cache.
export const dynamic = "force-dynamic";

function priceLabel(cents: number, currency: string) {
  if (!cents) return "Free";
  return (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPublishedSeriesMeta(slug);
  return {
    title: meta ? `${meta.title} · Mini-series` : "Mini-series",
    robots: { index: false, follow: false },
  };
}

export default async function MiniCourseSeriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const meta = await getPublishedSeriesMeta(slug);
  if (!meta) notFound();

  const session = await getAppSession();
  let entitled = session ? await hasActiveEntitlement(session.userId, meta.id) : false;

  // Just returned from Dodo checkout: confirm the subscription directly so
  // access is granted even before the webhook lands (e.g. on localhost).
  if (session && !entitled) {
    const subId = typeof sp.subscription_id === "string" ? sp.subscription_id : undefined;
    if (subId) {
      entitled = await reconcileEntitlement(session.userId, meta.id, subId);
    }
  }

  if (!session || !entitled) {
    return (
      <main className="min-h-dvh w-full overflow-hidden bg-background">
        <Paywall
          seriesId={meta.id}
          slug={meta.slug}
          title={meta.title}
          subtitle={meta.subtitle}
          priceLabel={priceLabel(meta.priceCents, meta.currency)}
          lessonCount={meta.lessonCount}
          isLoggedIn={Boolean(session)}
        />
      </main>
    );
  }

  const content = await getSeriesContent(slug);
  if (!content || content.lessons.length === 0) {
    return (
      <main className="grid h-dvh w-full place-items-center bg-background px-6 text-center">
        <p className="max-w-sm font-space text-[15px] text-muted-foreground">
          You&apos;re subscribed, but this series has no published lessons yet. Check back soon.
        </p>
      </main>
    );
  }

  const slides = buildSeriesSlides(content);
  const progress = await getProgress(session.userId, meta.id);

  return (
    <main className="h-dvh w-full overflow-hidden bg-background">
      <CoursePlayerClient seriesId={meta.id} slides={slides} initialProgress={progress} />
    </main>
  );
}
