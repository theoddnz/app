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
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-2">
          {learningPaths.map((path) => {
            const Icon = pathIcons[path.slug as keyof typeof pathIcons] ?? Code2;
          

            return (
              <Link
                key={path.slug}
                href={`/learn/${path.slug}`}
                className="group flex flex-col gap-3"
              >
                {/* Card thumbnail */}
               <div className="relative h-[440px] md:h-[420px] w-full overflow-hidden rounded-3xl bg-[#111]">
  <Image
    src={ros2Thumbnail}
    alt={path.name}
    fill
    className="object-cover transition-transform duration-700 group-hover:scale-105"
  />
</div>

                {/* Name + label row */}
                <div className="flex flex-col gap-0.5 px-0.5">
                  <p className="font-space text-[13px] font-semibold leading-snug text-foreground transition-opacity duration-200 group-hover:opacity-55">
                    {path.name}
                  </p>
                  {path.label && (
                    <span className="font-inter text-[11px] uppercase tracking-[0.14em] text-foreground/35">
                      {path.label}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}