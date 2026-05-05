"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRightIcon, Menu, X } from "lucide-react";
import { Button3D } from "./ui/button-3d";

const navLinks = [
  { label: "Paths", href: "/learn" },
  { label: "Community", href: "/community" },
  { label: "Blogs", href: "/blogs" },
];

const NAV_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const NAV_DURATION = "820ms";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const goToWaitlist = () => {
    const waitlist = document.getElementById("waitlist");

    if (waitlist) {
      waitlist.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileOpen(false);
      return;
    }

    window.location.href = "/#waitlist";
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isPill = scrolled;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: isPill ? (isMobile ? "10px" : "14px") : "0px",
          left: "50%",
          transform: "translateX(-50%)",
          width: isPill ? (isMobile ? "calc(100% - 28px)" : "fit-content") : "100%",
          maxWidth: isPill ? (isMobile ? "calc(100vw - 28px)" : "none") : "100vw",
          zIndex: 50,
          transition: `top ${NAV_DURATION} ${NAV_EASE}, width ${NAV_DURATION} ${NAV_EASE}, max-width ${NAV_DURATION} ${NAV_EASE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isPill ? "24px" : "32px",
            padding: isMobile
              ? isPill ? "10px 12px" : "14px 20px"
              : isPill ? "10px 20px" : "20px 32px",
            maxWidth: isPill ? "none" : "80rem",
            margin: isPill ? "0" : "0 auto",
            whiteSpace: isPill ? "nowrap" : "normal",
            borderRadius: isPill ? "9999px" : "0px",
            background: scrolled ? "color-mix(in oklch, var(--background) 82%, transparent)" : "transparent",
            backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
            border: scrolled
              ? "1px solid color-mix(in oklch, var(--foreground) 10%, transparent)"
              : "1px solid transparent",
            boxShadow: scrolled
              ? "0 0 0 1px color-mix(in oklch, var(--foreground) 4%, transparent) inset, 0 8px 32px rgba(0,0,0,0.18), 0 0 40px rgba(180,90,40,0.06)"
              : "none",
            transition: `gap ${NAV_DURATION} ${NAV_EASE}, padding ${NAV_DURATION} ${NAV_EASE}, max-width ${NAV_DURATION} ${NAV_EASE}, margin ${NAV_DURATION} ${NAV_EASE}, border-radius ${NAV_DURATION} ${NAV_EASE}, background-color ${NAV_DURATION} ${NAV_EASE}, border-color ${NAV_DURATION} ${NAV_EASE}, box-shadow ${NAV_DURATION} ${NAV_EASE}, backdrop-filter ${NAV_DURATION} ${NAV_EASE}`,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-space text-xl font-bold text-foreground shrink-0 select-none flex items-center gap-2"
          >
         
            TheOddOnes
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-[13.5px] font-space font-medium text-foreground/55 hover:text-foreground hover:bg-foreground/[0.06] cursor-pointer leading-8 transition-all duration-200 px-3.5 py-1.5 rounded-full group"
              >
                {item.label}
                <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-0 group-hover:w-3 h-[1.5px] bg-[#c4622d] transition-all duration-300 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button3D onClick={goToWaitlist}>
              Get me in <ArrowRightIcon size={15} strokeWidth={2} />
            </Button3D>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex items-center cursor-pointer justify-center rounded-full hover:bg-foreground/[0.06] text-foreground transition-colors shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col pt-24 px-8 pb-10 transition-all duration-700 ease-out md:hidden backdrop-blur-2xl bg-background/85 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 flex-1">
          {navLinks.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-space text-3xl font-bold text-foreground/25 hover:text-foreground transition-colors duration-200 py-2"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* <div className="w-full">
          <Button3D onClick={goToWaitlist} className="w-full">Join the waitlist</Button3D>
        </div> */}
      </div>
    </>
  );
}
