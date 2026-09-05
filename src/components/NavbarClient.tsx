"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRightIcon,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "@/components/ui/tabler-icons";
import { usePathname } from "next/navigation";

import { logoutAction } from "@/app/admin-actions";
import { Button3D } from "@/components/ui/button-3d";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { AppSession } from "@/types/admin";

const navLinks = [
  { label: "Mission", href: "/mission" },
  { label: "Paths", href: "/learn" },
  { label: "Community", href: "/community" },
  { label: "Blogs", href: "/blogs" },
];

export function NavbarClient({ session }: { session: AppSession | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const hideNavbar =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/author/dashboard" ||
    pathname.startsWith("/author/dashboard/") ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/mini-course" ||
    pathname.startsWith("/mini-course/");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!profileRef.current?.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const accountHref = session?.role === "admin" ? "/dashboard" : "/my-learning";

  if (hideNavbar) {
    return null;
  }

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 bg-transparent"
        style={{
          width: "100%",
          maxWidth: "100vw",
          background: scrolled
            ? "color-mix(in oklch, var(--background) 72%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(18px) saturate(160%)" : "blur(0px)",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(160%)" : "blur(0px)",
          boxShadow: "none",
          transition: "background-color 360ms ease, backdrop-filter 360ms ease",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            padding: isMobile ? "18px 28px" : "16px 32px",
            width: "100%",
            maxWidth: "76rem",
            margin: "0 auto",
            position: "relative",
            whiteSpace: "normal",
            borderRadius: "0px",
            background: "transparent",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            border: "0",
            boxShadow: "none",
          }}
        >
          <Link href="/" className="flex shrink-0 select-none items-center gap-1" aria-label="TheOddOnes home">
            <Image
              src="/assets/theoddones-white-logo.png"
              alt="TheOddOnes"
              width={50}
              height={50}
              priority
              className="h-14 w-14 object-contain dark:hidden"
            />
            <Image
              src="/assets/theoddones-black-logo.png"
              alt="TheOddOnes"
              width={50}
              height={50}
              priority
              className="hidden h-14 w-14 object-contain dark:block"
            />
            {/* <span className="font-space text-xl font-bold text-foreground">
              The<span className="text-[#c4622d]">Odd</span>Ones
            </span> */}
          </Link>

      <div
      className={[
        "absolute left-1/2 hidden -translate-x-1/2 md:flex",
        "items-center gap-1 rounded-full bg-white/86 p-1.5",
        "shadow-[0_8px_0_rgba(13,38,58,0.06),0_16px_30px_rgba(13,38,58,0.12)]",
        "ring-1 ring-black/[0.05] backdrop-blur-md",
        "transition-all duration-300",
        "dark:bg-[#181818]/88 dark:shadow-[0_8px_0_rgba(0,0,0,0.24),0_16px_30px_rgba(0,0,0,0.34)] dark:ring-white/[0.08]",
      ].join(" ")}
    >
      {navLinks.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
 
        return (
          <Link
            key={item.label}
            href={item.href}
            className={[
              "relative rounded-full px-4 py-2",
              "font-heading text-[13px] font-medium",
              "transition-all duration-200",
              active
                ? "bg-[#c4622d] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] dark:bg-[#c4622d] dark:text-white dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_6px_14px_rgba(0,0,0,0.18)]"
                : "text-[#29445b]/55 hover:bg-[#c4622d]/10 hover:text-[#c4622d] hover:shadow-[0_6px_14px_rgba(196,98,45,0.12),inset_0_1px_0_rgba(255,255,255,0.9)] dark:text-[#f0ebe5]/52 dark:hover:bg-[#c4622d]/15 dark:hover:text-[#e8854f] dark:hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
            ].join(" ")}
          >
            {item.label}
            {/* {active && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 size-[3px] rounded-full bg-secondary" />
            )} */}
          </Link>
        );
      })}
    </div>

          <div className="hidden shrink-0 items-center gap-3 font-space md:flex">
            <div className="rounded-full bg-white/86 p-1 shadow-[0_8px_0_rgba(13,38,58,0.05),0_14px_24px_rgba(13,38,58,0.1)] ring-1 ring-black/[0.05] backdrop-blur-md dark:bg-[#181818]/88 dark:shadow-[0_8px_0_rgba(0,0,0,0.24),0_14px_24px_rgba(0,0,0,0.32)] dark:ring-white/[0.08]">
              <ThemeSwitcher />
            </div>
            {session ? (
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="flex size-12 items-center justify-center rounded-full bg-white/86 text-[#29445b] shadow-[0_8px_0_rgba(13,38,58,0.05),0_14px_24px_rgba(13,38,58,0.1)] ring-1 ring-black/[0.05] transition-transform duration-200 hover:-translate-y-0.5 dark:bg-[#181818] dark:text-[#f2f2f2] dark:shadow-[0_8px_0_rgba(0,0,0,0.24),0_14px_24px_rgba(0,0,0,0.32)] dark:ring-white/[0.08]"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                >
                  <User className="size-5" />
                </button>

                {profileOpen ? (
                  <div className="absolute right-0 mt-4 w-60 overflow-hidden rounded-[24px] bg-white p-2 text-[#29445b] shadow-[0_10px_0_rgba(13,38,58,0.06),0_20px_38px_rgba(13,38,58,0.14)] ring-1 ring-black/[0.05] dark:bg-[#181818] dark:text-[#f2f2f2] dark:shadow-[0_10px_0_rgba(0,0,0,0.22),0_20px_38px_rgba(0,0,0,0.34)] dark:ring-white/[0.08]">
                    <div className="rounded-[18px] bg-[#f8f8f6] px-4 py-3 ring-1 ring-black/[0.03] dark:bg-[#242424] dark:ring-white/[0.08]">
                      <p className="truncate text-sm font-medium">{session.email}</p>
                      <p className="text-xs capitalize text-[#29445b]/45 dark:text-[#a3a3a3]">{session.role}</p>
                    </div>
                    <Link href={accountHref} className="mt-1 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-[#29445b]/70 transition-colors hover:bg-[#f8f8f6] hover:text-[#29445b] dark:text-[#f2f2f2]/70 dark:hover:bg-[#242424] dark:hover:text-[#f2f2f2]" onClick={() => setProfileOpen(false)}>
                      {session.role === "admin" ? <LayoutDashboard className="size-4" /> : <BookOpen className="size-4" />}
                      {session.role === "admin" ? "Dashboard" : "My learning"}
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-[#29445b]/70 transition-colors hover:bg-[#f8f8f6] hover:text-[#29445b] dark:text-[#f2f2f2]/70 dark:hover:bg-[#242424] dark:hover:text-[#f2f2f2]" onClick={() => setProfileOpen(false)}>
                      <Settings className="size-4" />
                      Profile settings
                    </Link>
                    <form action={logoutAction}>
                      <button type="submit" className="flex w-full items-center gap-2 rounded-full px-4 py-2.5 text-left text-sm text-[#29445b]/70 transition-colors hover:bg-[#f8f8f6] hover:text-[#29445b] dark:text-[#f2f2f2]/70 dark:hover:bg-[#242424] dark:hover:text-[#f2f2f2]">
                        <LogOut className="size-4" />
                        Log out
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            ) : (
              <Button3D onClick={() => router.push("/signup")}>
                Join now <ArrowRightIcon size={15} strokeWidth={2} />
              </Button3D>
            )}
          </div>

          <button
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.06] md:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-background/85 px-8 pb-10 pt-24 backdrop-blur-2xl transition-all duration-700 ease-out md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ paddingTop: "88px" }}
      >
        <div className="flex flex-1 flex-col gap-1">
          {navLinks.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 font-heading text-3xl font-bold text-foreground/25 transition-colors duration-200 hover:text-foreground"
              style={{ transitionDelay: `${index * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          {session ? (
            <>
              <Link href={accountHref} onClick={() => setMobileOpen(false)} className="py-2 font-space text-3xl font-bold text-foreground/25 transition-colors duration-200 hover:text-foreground">
                {session.role === "admin" ? "Dashboard" : "My learning"}
              </Link>
              <Link href="/settings" onClick={() => setMobileOpen(false)} className="py-2 font-space text-3xl font-bold text-foreground/25 transition-colors duration-200 hover:text-foreground">
                Settings
              </Link>
            </>
          ) : null}
        </div>

        <div className="flex w-full items-center gap-3 pt-6">
          <ThemeSwitcher />
          {session ? (
            <form action={logoutAction} className="flex-1">
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-space font-semibold">
                <LogOut className="size-4" />
                Log out
              </button>
            </form>
          ) : (
            <Button3D
              className="flex-1"
              onClick={() => {
                setMobileOpen(false);
                router.push("/signup");
              }}
            >
              Join now <ArrowRightIcon size={15} strokeWidth={2} />
            </Button3D>
          )}
        </div>
      </div>
    </>
  );
}
