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
} from "@/components/ui/huge-icons";
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
            padding: isMobile ? "18px 28px" : "24px 32px",
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
        "items-center gap-0.5 rounded-2xl p-1",
        "transition-all duration-300",
        scrolled
          ? "border border-foreground/[0.08] bg-background/60 shadow-sm backdrop-blur-md"
          : "bg-transparent",
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
              "relative rounded-[10px] px-4 py-1.5",
              "font-space text-[13px] font-medium",
              "transition-colors duration-200",
              active
                ? "bg-foreground/[0.06] text-foreground"
                : "text-foreground/40 hover:text-foreground/75",
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
            <ThemeSwitcher />
            {session ? (
              <div ref={profileRef} className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
                  aria-label="Open profile menu"
                  aria-expanded={profileOpen}
                >
                  <User className="size-5" />
                </button>

                {profileOpen ? (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-xl">
                    <div className="border-b border-border px-3 py-2">
                      <p className="truncate text-sm font-medium">{session.email}</p>
                      <p className="text-xs capitalize text-muted-foreground">{session.role}</p>
                    </div>
                    <Link href={accountHref} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setProfileOpen(false)}>
                      {session.role === "admin" ? <LayoutDashboard className="size-4" /> : <BookOpen className="size-4" />}
                      {session.role === "admin" ? "Dashboard" : "My learning"}
                    </Link>
                    <Link href="/settings" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted" onClick={() => setProfileOpen(false)}>
                      <Settings className="size-4" />
                      Profile settings
                    </Link>
                    <form action={logoutAction}>
                      <button type="submit" className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
                        <LogOut className="size-4" />
                        Log out
                      </button>
                    </form>
                  </div>
                ) : null}
              </div>
            ) : (
              <Button3D onClick={() => router.push("/users/signup")}>
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
              className="py-2 font-space text-3xl font-bold text-foreground/25 transition-colors duration-200 hover:text-foreground"
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
                router.push("/users/signup");
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
