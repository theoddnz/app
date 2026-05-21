import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { absoluteUrl, jsonLd, siteConfig } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
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
        url: siteConfig.url,
        description: siteConfig.description,
        logo: absoluteUrl("/assets/theoddones-white-logo.png"),
        sameAs: [siteConfig.social.x, siteConfig.social.instagram],
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
        alternateName: siteConfig.tagline,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} ${manrope.variable} bg-background text-foreground antialiased`}>
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
