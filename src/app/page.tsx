import Hero from "../components/Hero";
import WhatWeProvoke from "../components/WhatWeProvoke";
import CTA from "../components/CTA";
import WhatYouGet from "@/components/Whatyouget";
import Collaborators from "@/components/Collaborators";
import AvailablePaths from "@/components/Availablepaths";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Build-first learning for people who think differently",
  path: "/",
});

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      <Hero />
      <WhatWeProvoke />
      <WhatYouGet/>
      <AvailablePaths />
      <Collaborators />
      <CTA />

    </main>
  );
}
