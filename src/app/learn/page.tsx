import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { absoluteUrl, jsonLd, pageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Learning Paths",
  description:
    "Explore TheOddOnes learning paths: guided, build-first routes for people who learn by making things and sharing progress.",
  path: "/learn",
  keywords: ["learning paths", "guided learning paths", "build first learning", "project based learning"],
});

import {
  Bot,
  ChevronRight,
  Code2,
  Home,
  Play,
  TestTube2,
} from "@/components/ui/tabler-icons";
import { getLearningPaths } from "@/lib/learning";

// Local image imports — Next.js handles these correctly at build time
import ros2Thumbnail from "../../../assets/ros2-thumbnail.png";

export const dynamic = "force-dynamic";

const pathIcons = {
  "go-lang": Code2,
  robotics: Bot,
  "manual-testing": TestTube2,
};

// Map slug → imported static image


export default async function LearnPage() {
  const learningPaths = await getLearningPaths();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "TheOddOnes Learning Paths",
    description:
      "Explore TheOddOnes learning paths: guided, build-first routes for people who learn by making things and sharing progress.",
    url: absoluteUrl("/learn"),
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: learningPaths.map((path, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: path.name,
        url: absoluteUrl(`/learn/${path.slug}`),
        description: path.description,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />

      {/* Header */}
      <section className="px-6 pb-14 pt-36 border-b border-black/6 dark:border-white/[0.06]">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 font-inter text-xs font-semibold text-foreground/40"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Home size={14} strokeWidth={2} />
              Home
            </Link>
            <ChevronRight size={12} strokeWidth={2} className="opacity-40" />
            <span className="text-foreground/70">Learning paths</span>
          </nav>

          <h1 className="font-space text-4xl font-bold leading-[0.95] tracking-tight">
            Pick a path.
          </h1>
        </div>
      </section>

      {/* Paths grid */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2">
          {learningPaths.map((path) => {
            const Icon = pathIcons[path.slug as keyof typeof pathIcons] ?? Code2;

            return (
              <Link
                key={path.slug}
                href={`/learn/${path.slug}`}
                className="group block"
              >
                <div className="rounded-[34px] bg-white p-2.5 shadow-[0_18px_0_rgba(13,38,58,0.08),0_26px_45px_rgba(13,38,58,0.14)] ring-1 ring-black/[0.04] transition-transform duration-300 group-hover:-translate-y-1 dark:bg-[#f7f7f4]">
                  <div className="overflow-hidden rounded-[28px] border border-black/[0.03] bg-[#f8f8f6] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div className="relative h-[320px] w-full overflow-hidden rounded-[26px] bg-[#111] sm:h-[380px] md:h-[360px]">
                      <Image
                        src={ros2Thumbnail}
                        alt={path.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-white/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex size-16 items-center justify-center rounded-full bg-white/35 text-white shadow-[0_10px_35px_rgba(20,42,55,0.22)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                          <Play size={30} fill="currentColor" strokeWidth={1.5} />
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 px-3 py-4">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#29445b] shadow-[0_9px_18px_rgba(13,38,58,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-black/[0.04]">
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <div className="min-w-0 flex-1 rounded-full bg-white px-5 py-3 shadow-[0_9px_18px_rgba(13,38,58,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-black/[0.04]">
                        <p className="truncate font-space text-base font-semibold leading-tight text-[#29445b]">
                          {path.name}
                        </p>
                        {path.label && (
                          <span className="mt-0.5 block truncate font-inter text-[10px] uppercase tracking-[0.14em] text-[#29445b]/45">
                            {path.label}
                          </span>
                        )}
                      </div>
                      <span className="hidden shrink-0 rounded-full bg-white px-5 py-4 font-inter text-xs font-semibold text-[#29445b] shadow-[0_9px_18px_rgba(13,38,58,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-black/[0.04] sm:inline-flex">
                        Open
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
