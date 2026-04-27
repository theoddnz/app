import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Manifesto from "../components/Manifesto";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Manifesto />
      {/* <Features /> */}
      {/* <HowItWorks /> */}
      {/* <Testimonials /> */}
      {/* <CTA /> */}
      <WaitlistForm/>
      <Footer />
    </main>
  );
}
