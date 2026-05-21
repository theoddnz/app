import Hero from "../components/Hero";
import WhatWeProvoke from "../components/WhatWeProvoke";
import CTA from "../components/CTA";
import WhatYouGet from "@/components/Whatyouget";
import Collaborators from "@/components/Collaborators";
import { pageMetadata, siteConfig } from "@/lib/seo";

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
  return (
    <main className="overflow-x-hidden">

      <Hero />
      <WhatWeProvoke />
      <WhatYouGet/>

      <Collaborators />
      <CTA />

    </main>
  );
}
