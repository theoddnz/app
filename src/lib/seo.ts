import type { Metadata } from "next";

export const siteConfig = {
  name: "TheOddOnes",
  domain: "theodd1s.com",
  url: "https://theodd1s.com",
  title: "TheOddOnes - Learning community for people who think differently",
  tagline: "A place for people who think differently about learning.",
  description:
    "TheOddOnes is a build-first learning community for people who think differently about learning. Pick a path, build real projects, share progress, and grow with focused builders.",
  keywords: [
    "TheOddOnes",
    "TheOddOnes learning community",
    "learning community",
    "online learning community",
    "build-first learning",
    "people who think differently about learning",
    "project based learning community",
    "project based learning",
    "learn by building",
    "builder community",
    "learning paths",
    "practical learning",
    "build in public",
    "student dashboard",
    "skill based learning",
  ],
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
    title,
    description,
    applicationName: siteConfig.name,
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
      creator: "@theoddoneshub",
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
      : undefined,
  };
}
