import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-black py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-inter text-xs text-white/30 tracking-widest uppercase mb-6">
          Early access
        </p>
        <h2 className="font-space text-[clamp(2.5rem,6vw,4.5rem)] font-700 text-white leading-tight tracking-tight mb-6">
          Are you the odd one?
        </h2>
        <p className="font-inter text-white/50 text-lg mb-12 max-w-md mx-auto leading-relaxed">
          We're building this for a specific kind of person. If you read this far, you might be them.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  
          <Button
            size="lg"
            className="w-full sm:w-auto rounded-full bg-white text-black hover:bg-white/90  font-inter text-sm"
          >
            Join the waitlist 
          </Button>
        </div>
   
      </div>
    </section>
  );
}
