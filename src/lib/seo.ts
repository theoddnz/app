import type { Metadata } from "next";

export const siteConfig = {
  name: "TheOddOnes",
  domain: "www.theodd1s.com",
  url: "https://www.theodd1s.com",
  title: "TheOddOnes | ROS 2 and Robotics Learning Community",
  tagline: "Build-first ROS 2 and robotics learning for curious engineers.",
  description:
    "TheOddOnes is a build-first community for learning ROS 2, robotics, drones, robot perception, embedded systems, and software through practical projects.",
  keywords: [
    "TheOddOnes",
    "The Odd Ones",
    "theodd1s",
    "TheOddOnes learning community",
    "robotics learning platform",
    "robotics learning paths",
    "learn robotics",
    "learn robotics by building",
    "robotics course",
    "robotics projects",
    "robotics for beginners",
    "robotics engineering",
    "robotics software",
    "robotics programming",
    "robotics perception",
    "robot perception",
    "computer vision robotics",
    "autonomous robotics",
    "mobile robotics",
    "aerial robotics",
    "drone robotics",
    "drone software",
    "learn drones",
    "drone programming",
    "UAV software",
    "autonomous drones",
    "ROS2",
    "learn ROS2",
    "ROS2 robotics",
    "ROS2 navigation",
    "ROS2 simulation",
    "ROS2 tutorials",
    "Nav2",
    "robot operating system",
    "robot operating system 2",
    "embedded systems",
    "embedded software",
    "mechatronics",
    "electronics projects",
    "Arduino robotics",
    "Raspberry Pi robotics",
    "robot simulation",
    "Gazebo simulation",
    "software engineering learning",
    "learn software by building",
    "software projects",
    "Golang learning path",
    "manual testing",
    "QA testing",
    "build first learning platform",
    "learning community",
    "online learning community",
    "build-first learning",
    "people who think differently about learning",
    "project based learning community",
    "project based learning",
    "project based courses",
    "learn by building",
    "learn programming by building",
    "learn manual testing",
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
    linkedin:"",
    youtube:"",
    discord:"",
    reddit:""
  },
} as const;

export const roboticsKeywords = [
  "robotics",
  "robotics learning",
  "robotics engineering",
  "robotics software",
  "robotics programming",
  "robotics projects",
  "robotics perception",
  "ROS2",
  "ROS2 course",
  "ROS2 learning path",
  "ROS2 navigation",
  "ROS2 simulation",
  "robot operating system",
  "drone software",
  "aerial robotics",
  "UAV programming",
  "autonomous drones",
  "embedded robotics",
  "robot perception",
  "computer vision robotics",
  "software engineering",
  "project based robotics",
] as const;

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
  authors,
  publishedTime,
}: {
  title: string;
  description?: string;
  path?: string;
  images?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  authors?: string[];
  publishedTime?: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedImages = (images?.filter(Boolean) ?? ["/opengraph-image"]).map((image) => ({
    url: absoluteUrl(image),
    width: 1200,
    height: 630,
    alt: `${title} - ${siteConfig.name}`,
  }));
  const mergedKeywords = [...new Set([...siteConfig.keywords, ...roboticsKeywords, ...keywords])];
  const openGraph =
    type === "article"
      ? {
          title,
          description,
          url: canonical,
          siteName: siteConfig.name,
          locale: "en_US",
          type: "article" as const,
          images: resolvedImages,
          authors,
          publishedTime,
          tags: mergedKeywords.slice(0, 20),
        }
      : {
          title,
          description,
          url: canonical,
          siteName: siteConfig.name,
          locale: "en_US",
          type: "website" as const,
          images: resolvedImages,
        };

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
      languages: {
        "en-US": canonical,
      },
    },
    openGraph,
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

  return [
    ...new Set(
      cleaned.flatMap((part) => [
        part,
        `${part} learning path`,
        `${part} course`,
        `${part} projects`,
        `${part} project based learning`,
        `learn ${part}`,
        `learn ${part} by building`,
      ]),
    ),
  ];
}

export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
