import type { Metadata } from "next";

export const siteConfig = {
  name: "TheOddOnes",
  domain: "theodd1s.com",
  url: "https://theodd1s.com",
  title: "TheOddOnes - Build-first learning for contrarian builders",
  description:
    "TheOddOnes is a build-first learning platform for robotics, Go, testing, and systems learners who learn by building, breaking, repairing, and repeating.",
  keywords: [
    "TheOddOnes",
    "build-first learning",
    "robotics learning",
    "ROS 2 course",
    "Go programming course",
    "manual testing course",
    "project based learning",
    "systems learning",
    "hardware learning",
    "contrarian learners",
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
}: {
  title: string;
  description?: string;
  path?: string;
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImages = images?.filter(Boolean).map((image) => absoluteUrl(image));

  return {
    title,
    description,
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
