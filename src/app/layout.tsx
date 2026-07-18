import type { Metadata } from "next";
import { Manrope, Phudu } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import { FooterGate } from "@/components/FooterGate";
import Navbar from "@/components/Navbar";
import { absoluteUrl, jsonLd, roboticsKeywords, siteConfig } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

const phudu = Phudu({
  subsets: ["latin"],
  variable: "--font-phudu",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [...siteConfig.keywords],
  authors: [{ name: "TheOddOnes", url: siteConfig.url }],
    creator: "TheOddOnes",
    publisher: "TheOddOnes",
  category: "education",
  manifest: "/manifest.webmanifest",
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      {
        url: "/assets/theoddones-white-logo.png",
        media: "(prefers-color-scheme: light)",
        type: "image/png",
      },
      {
        url: "/assets/theoddones-black-logo.png",
        media: "(prefers-color-scheme: dark)",
        type: "image/png",
      },
    ],
    apple: "/assets/theoddones-white-logo.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: `@${siteConfig.social.handle}`,
  },
  robots: {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "EducationalOrganization"],
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        alternateName: ["The Odd Ones", "TheOddOnes Robotics"],
        url: siteConfig.url,
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        logo: absoluteUrl("/assets/theoddones-white-logo.png"),
        sameAs: [siteConfig.social.x, siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.youtube]
          .filter(Boolean),
        knowsAbout: [...roboticsKeywords],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: siteConfig.url,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        alternateName: ["The Odd Ones", "TheOddOnes Robotics"],
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#site-navigation`,
        name: "TheOddOnes important links",
        itemListElement: [
          { "@type": "SiteNavigationElement", position: 1, name: "Learning paths", url: absoluteUrl("/learn") },
          { "@type": "SiteNavigationElement", position: 2, name: "Blogs", url: absoluteUrl("/blogs") },
          { "@type": "SiteNavigationElement", position: 3, name: "Community", url: absoluteUrl("/community") },
          { "@type": "SiteNavigationElement", position: 4, name: "Mission", url: absoluteUrl("/mission") },
          { "@type": "SiteNavigationElement", position: 5, name: "Sponsors", url: absoluteUrl("/sponsors") },
        ],
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} ${manrope.variable} ${phudu.variable} bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
          />

          <Toaster
            theme="system"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--popover)",
                border: "1px solid var(--border)",
                color: "var(--popover-foreground)",
              },
            }}
          />
          <FooterGate>
            <Footer />
          </FooterGate>
        </ThemeProvider>
        {process.env.NEXT_PUBLIC_CF_BEACON_TOKEN && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            strategy="afterInteractive"
            data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CF_BEACON_TOKEN}"}`}
          />
        )}
      </body>
    </html>
  );
}
