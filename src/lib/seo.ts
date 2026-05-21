import type { Metadata } from "next";

export const siteConfig = {
  name: "TheOddOnes",
  domain: "theodd1s.com",
  url: "https://theodd1s.com",
  title: "TheOddOnes - Build-First Learning Paths for Curious Builders",
  tagline: "A place for people who think differently about learning.",
  description:
    "TheOddOnes is a build-first learning community with practical learning paths, field notes, and project-based lessons for curious builders who learn by making.",
  keywords: [
    "TheOddOnes",
    "The Odd Ones",
    "theodd1s",
    "TheOddOnes learning community",
    "build first learning platform",
    "learning community",
    "online learning community",
    "build-first learning",
    "people who think differently about learning",
    "project based learning community",
    "project based learning",
    "project based courses",
    "learn by building",
    "learn robotics by building",
    "learn programming by building",
    "learn manual testing",
    "learn embedded systems",
    "builder community",
    "learning paths",
    "online learning paths",
    "practical learning",
    "hands on learning",
    "build in public",
    "student dashboard",
    "skill based learning",
  ],
  social: {
    handle: "theoddoneshub",
    x: "https://x.com/theoddoneshub",
    instagram: "https://www.instagram.com/theoddoneshub",
  },
} as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(path, siteConfig.url).toString();
}

export function pageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  images,
  type = "website",
  noIndex = false,
  keywords = [],
}: {
  title: string;
  description?: string;
  path?: string;
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
}): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImages = images?.filter(Boolean).map((image) => absoluteUrl(image)) ?? [
    absoluteUrl("/opengraph-image"),
  ];
  const mergedKeywords = [...new Set([...siteConfig.keywords, ...keywords])];

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    applicationName: siteConfig.name,
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "education",
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: resolvedImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImages,
      creator: `@${siteConfig.social.handle}`,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function keywordVariants(...parts: Array<string | null | undefined>) {
  const cleaned = parts
    .filter(Boolean)
    .flatMap((part) => String(part).split(/[,|]/))
    .map((part) => part.trim())
    .filter(Boolean);

  return [...new Set(cleaned.flatMap((part) => [part, `${part} learning path`, `${part} project based learning`]))];
}

export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
