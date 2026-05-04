import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Manifesto from "../components/Manifesto";
import Footer from "../components/Footer";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Manifesto />
      <WaitlistForm />
      <Footer />
    </main>
  );
}
