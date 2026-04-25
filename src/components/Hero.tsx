import { Button } from "@/components/ui/button";
import {
  Terminal,
  Cpu,
  Wrench,
  GitBranch,
  Zap,
} from "lucide-react";

const floatingIcons = [
  { Icon: Terminal, label: "ROS", className: "float-1 top-[28%] left-[14%]", rotate: "-3deg" },
  { Icon: Cpu, label: "Hardware", className: "float-2 top-[22%] right-[14%]", rotate: "4deg" },
  { Icon: Wrench, label: "Repair", className: "float-3 top-[55%] left-[8%]", rotate: "-2deg" },
  { Icon: GitBranch, label: "Build", className: "float-4 top-[50%] right-[9%]", rotate: "5deg" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#f0eeeb] flex flex-col items-center justify-start pt-36 overflow-hidden">

      {/* Floating Tech Icons */}
      {floatingIcons.map(({ Icon, label, className, rotate }) => (
        <div
          key={label}
          className={`absolute ${className} hidden md:flex`}
          style={{ transform: `rotate(${rotate})` }}
        >
          <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center border border-black/8">
            <Icon size={28} strokeWidth={1.5} className="text-black" />
          </div>
        </div>
      ))}

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-6">
        <p className="text-sm font-inter text-black/50 tracking-widest uppercase mb-5">
          For the contrarians. The obsessives. The ones who break things on purpose.
        </p>

        <h1 className="font-space text-[clamp(3rem,8vw,5.5rem)] font-700 leading-[1.0] tracking-tight text-black mb-6">
          Meet<br />TheOddOne.
        </h1>

        <p className="font-inter text-lg text-black/55 max-w-md mb-10 leading-relaxed">
          A place for people who think differently about learning.
        </p>

        <div className="flex items-center gap-4">
          <Button
            size="lg"
            className="rounded-full cursor-pointer bg-black text-white hover:bg-black/85 px-8 py-6 text-base font-inter"
          >
            Enter
          </Button>
 
        </div>
      </div>

      {/* Hero visual — abstract "head" stand-in using geometric shapes */}
      <div className="relative mt-16 w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-black/5" />
        <div className="relative w-40 h-40 rounded-full bg-gradient-to-b from-black/10 to-black/20 flex items-center justify-center">
          <Zap size={56} strokeWidth={1.2} className="text-black/30" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
