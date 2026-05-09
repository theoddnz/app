import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhatWeProvoke from "../components/WhatWeProvoke";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import WhatYouGet from "@/components/Whatyouget";

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      <Hero />
      <WhatWeProvoke />
      <WhatYouGet/>
      <CTA />

    </main>
  );
}
