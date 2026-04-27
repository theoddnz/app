import Link from "next/link";
import { Armchair,  MessageCircle, } from "lucide-react";
import { Button3D } from "./ui/button-3d";

const linkGroups = {
  Platform:  ["Features", "Roadmap", "Changelog", "Open Source"],
  Community: ["Discord", "GitHub", "Twitter / X", "YouTube"],
  Blogs:     ["Tutorials", "Build Logs", "ROS Deep Dives", "Hardware"],
};

const socials = [
  { icon: MessageCircle,         label: "GitHub",   href: "#" },
  { icon: MessageCircle,        label: "Twitter",  href: "#" },
  { icon: MessageCircle,        label: "YouTube",  href: "#" },
  { icon: MessageCircle,  label: "Discord",  href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0806] px-6 md:px-10 pt-24 pb-10 overflow-hidden">
      {/* Ambient orange glow, top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-[0.18]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,98,45,0.35), transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* ── TOP — CTA band ── */}
        {/* <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-16 border-b border-white/[0.06]">
          <div className="max-w-xl">
            <p className="text-[11px] tracking-[0.28em] uppercase text-[rgba(196,98,45,0.7)] font-medium mb-4">
              Still reading?
            </p>
            <h3
              className="font-space font-extrabold text-[#f0ebe5] leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            >
              Then your seat's already <span className="text-[#c4622d]">warm.</span>
            </h3>
          </div>

          <Button3D className="max-w-max !rounded-xl [&_.btn-3d-face]:!rounded-xl [&_.btn-3d-shadow]:!rounded-xl">
            Reserve my seat <Armchair size={15} strokeWidth={2} />
          </Button3D>
        </div> */}

        {/* ── MIDDLE — links ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="font-space font-extrabold text-[#f0ebe5] text-[22px] tracking-[-0.02em] leading-none group inline-flex items-center"
            >
              The<span className="text-[#c4622d] transition-colors duration-300 group-hover:text-[#e07a3f]">Odd</span>Ones
            </Link>
            <p className="text-md font-light text-white/35 leading-relaxed max-w-[240px]">
              Built by the odd ones, for the ones
            </p>

            {/* Status pill */}
            {/* <div className="inline-flex items-center gap-2 mt-2 w-max rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c4622d] opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#c4622d]" />
              </span>
              <span className="text-[11px] tracking-[0.14em] uppercase text-white/50 font-medium">
                Building in public
              </span>
            </div> */}
          </div>

          {/* Link groups */}
          {Object.entries(linkGroups).map(([col, items]) => (
            <div key={col}>
              <p className="text-[11px] font-space tracking-[0.18em] uppercase font-medium text-[rgba(196,98,45,0.75)] mb-5">
                {col}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group relative font-space inline-flex text-[13.5px] font-normal text-white/40 hover:text-[#f0ebe5] transition-colors duration-200"
                    >
                      <span className="relative">
                        {item}
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#c4622d] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── GIANT WORDMARK ── */}
        <div className="relative select-none py-6">
          <h2
            className="font-space font-extrabold text-transparent leading-none tracking-[-0.05em] whitespace-nowrap"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 12rem)",
              WebkitTextStroke: "1px rgba(240,235,229,0.08)",
            }}
          >
            TheOddOnes
          </h2>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-white/[0.06]">
          <p className="text-[12px] font-light text-white/30 tracking-[0.04em]">
            © 2026 TheOddOnes · All rights reserved
          </p>

          <div className="flex flex-wrap items-center gap-5 text-[12px] text-white/35">
            <Link href="#" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Contact</Link>
          </div>

          {/* Socials */}
          {/* <div className="flex items-center gap-1.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-md text-white/40 hover:text-[#f0ebe5] hover:bg-white/[0.04] transition-all duration-200"
              >
                <Icon size={15} strokeWidth={1.8} />
              </Link>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  );
}