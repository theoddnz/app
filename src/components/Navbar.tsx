"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button3D } from "./ui/button-3d";

const navLinks = ["Platform", "Community", "Blogs"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // on mobile: always full width, never pill
  const isPill = scrolled && !isMobile;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: isPill ? "14px" : "0px",
          left: "50%",
          transform: "translateX(-50%)",
          width: isPill ? "fit-content" : "100%",
          maxWidth: isPill ? "none" : "100vw",
          zIndex: 50,
          transition: "top 0.45s cubic-bezier(0.16, 1, 0.3, 1), width 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isPill ? "24px" : "32px",
            padding: isMobile
              ? "14px 20px"                          // mobile: always same padding
              : isPill ? "10px 20px" : "20px 32px",  // desktop: pill vs top
            maxWidth: isPill ? "none" : "80rem",
            margin: isPill ? "0" : "0 auto",
            whiteSpace: isPill ? "nowrap" : "normal",
            borderRadius: isPill ? "9999px" : "0px",
            background: scrolled ? "rgba(255,255,255,0.04)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid transparent",
            boxShadow: scrolled
              ? "0 0 0 1px rgba(255,255,255,0.03) inset, 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3), 0 0 40px rgba(180,90,40,0.06)"
              : "none",
            transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-sans text-xl font-bold text-[#f0ebe5] shrink-0 select-none flex items-center gap-2"
          >
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: "linear-gradient(135deg,#c4622d,#8b3a1a)",
                boxShadow: "0 0 12px rgba(196,98,45,0.5)",
              }}
              aria-hidden="true"
            >
              <span className="w-[7px] h-[7px] rounded-full bg-white/85 block" />
            </span>
            TheOddOnes
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-[13.5px] font-space font-medium text-[rgba(240,235,229,0.5)] hover:text-[rgba(240,235,229,0.95)] hover:bg-white/[0.06] cursor-pointer leading-8 transition-all duration-200 px-3.5 py-1.5 rounded-full group"
              >
                {item}
                <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-0 group-hover:w-3 h-[1.5px] bg-[#c4622d] transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button3D>Join waitlist</Button3D>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/[0.06] text-[#f0ebe5] transition-colors shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-10 transition-all duration-300 md:hidden backdrop-blur-2xl bg-[#0a0806]/80 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map((item, i) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="font-space text-3xl font-bold text-[rgba(240,235,229,0.2)] hover:text-[#f0ebe5] transition-colors duration-200 py-2"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="w-full">
          <Button3D className="w-full">Join the waitlist</Button3D>
        </div>
      </div>
    </>
  );
}