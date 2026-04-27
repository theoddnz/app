import Link from "next/link";
import { Button3D } from "./ui/button-3d";

const links = {
  Platform:  ["Features", "Roadmap", "Changelog", "Open Source"],
  Community: ["Discord", "GitHub", "Twitter / X", "YouTube"],
  Blogs:     ["Tutorials", "Build Logs", "ROS Deep Dives", "Hardware"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0a0806] px-6 md:px-10 pt-20 pb-9">
      <div className="max-w-6xl mx-auto">

        {/* ── TOP — wordmark + CTA ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-white/[0.06]">

          <div className="relative select-none">
            <h2
              className="font-space font-extrabold text-[#f0ebe5] leading-none tracking-[-0.04em]"
              style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}
            >
              TheOddOne<span className="text-[#c4622d]">.</span>
            </h2>
            <div
              className="absolute bottom-[-10px] left-0 w-[300px] h-[80px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(196,98,45,0.12) 0%, transparent 70%)",
                filter: "blur(16px)",
              }}
            />
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 md:pb-2 shrink-0">
      
            <Button3D
           
            >
              Join the waitlist 
            </Button3D>
          </div>
        </div>

        {/* ── MIDDLE — 3-col links ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 py-10 border-b border-white/[0.06]">
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <p className="text-[10px] tracking-[0.14em] uppercase font-medium text-[rgba(196,98,45,0.7)] mb-3.5">
                {col}
              </p>
              <div className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-[13.5px] font-light text-[rgba(240,235,229,0.35)] hover:text-[rgba(240,235,229,0.85)] transition-colors duration-200 leading-none"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-7">

          <div className="flex items-center gap-2">
            <span
              className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg,#c4622d,#7a3010)",
                boxShadow: "0 0 10px rgba(196,98,45,0.4)",
              }}
            >
              <span className="w-[6px] h-[6px] rounded-full bg-white/80 block" />
            </span>
            <span className="font-space font-bold text-[13px] text-[rgba(240,235,229,0.3)] tracking-tight">
              TheOddOne
            </span>
          </div>

          <span className="text-md text-neutral-300 tracking-[0.04em]">
            © 2026  All rights reserved
          </span>

          <span className="text-sm font-light italic text-neutral-600 tracking-[0.02em]">
            Built by odd ones, for odd ones..
          </span>

        </div>
      </div>
    </footer>
  );
}