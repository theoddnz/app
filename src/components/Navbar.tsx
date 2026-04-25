"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = ["Platform", "Community", "Blogs"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: scrolled ? "16px" : "0px",
          left: "50%",
          transform: "translateX(-50%)",
          width: scrolled ? "auto" : "100vw",
          zIndex: 50,
          transition: "top 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className={`flex items-center justify-between transition-all duration-400 ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl border border-black/10 rounded-full px-5 py-2.5 shadow-lg shadow-black/5 gap-8 whitespace-nowrap"
              : "bg-transparent px-8 py-5 gap-8 max-w-7xl mx-auto"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-space text-sm font-bold tracking-tight text-black shrink-0 select-none"
          >
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-5 h-5 rounded-full bg-black flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="w-2 h-2 rounded-full bg-white block" />
              </span>
              TheOddOne
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative text-sm text-black/50 hover:text-black transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-black/5 font-inter group"
              >
                {item}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-3 h-px bg-black transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="#"
              className="text-sm text-black/50 hover:text-black transition-colors font-inter"
            >
              Sign in
            </Link>
            <Button
              className="rounded-full bg-black text-white hover:bg-black/80 text-sm px-5 h-9 font-inter transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            >
              Join waitlist
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 pb-10 transition-all duration-300 md:hidden ${
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
              className="font-space text-3xl font-bold text-black/20 hover:text-black transition-colors duration-200 py-2"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="rounded-full bg-black text-white text-base h-12 font-inter w-full"
            onClick={() => setMobileOpen(false)}
          >
            Join the waitlist →
          </Button>
          <Link
            href="#"
            className="text-center text-sm text-black/40 font-inter"
            onClick={() => setMobileOpen(false)}
          >
            Sign in
          </Link>
        </div>
      </div>
    </>
  );
}