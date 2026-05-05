import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-foreground py-32 px-6 text-background">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-inter text-xs text-background/45 tracking-widest uppercase mb-6">
          Early access
        </p>
        <h2 className="font-space text-[clamp(2.5rem,6vw,4.5rem)] font-700 text-background leading-tight tracking-tight mb-6">
          Are you the odd one?
        </h2>
        <p className="font-inter text-background/60 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          We&apos;re building this for a specific kind of person. If you read this far, you might be them.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto rounded-full bg-background text-foreground hover:bg-background/90  font-inter text-sm"
          >
            <Link href="/#waitlist">Join the waitlist</Link>
          </Button>
        </div>
   
      </div>
    </section>
  );
}
