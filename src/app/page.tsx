import Hero from "../components/Hero";
import WhatWeProvoke from "../components/WhatWeProvoke";
import WhyWeStarted from "../components/WhyWeStarted";
import CTA from "../components/CTA";
import WhatYouGet from "@/components/Whatyouget";
import Collaborators from "@/components/Collaborators";
import { absoluteUrl, jsonLd, pageMetadata, siteConfig } from "@/lib/seo";
import FAQ from "@/components/landing/FAQ";
import WhyTheOddOnes from "@/components/landing/WhyTheOddOnes";
import Pricing from "@/components/landing/Pricings";

export const metadata = pageMetadata({
  title: "TheOddOnes Learning Community",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "TheOddOnes",
    "learning community for builders",
    "build first learning platform",
    "people who think differently about learning",
  ],
});

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#home`,
    url: siteConfig.url,
    name: siteConfig.title,
    description: siteConfig.description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#organization`,
    },
    primaryImageOfPage: absoluteUrl("/opengraph-image"),
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />

      <Hero />
      <WhatWeProvoke />
      {/* <WhyTheOddOnes/> */}
      {/* <WhatYouGet/> */}
      {/* <Pricing/> */}
      {/* <FAQ/> */}
    

      {/* <Collaborators /> */}
      <WhyWeStarted />
      <CTA />

    </main>
  );
}
