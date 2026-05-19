"use client";

import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";
import { usePathname } from "next/navigation";

import { logoutAction } from "@/app/admin-actions";
import { Button3D } from "@/components/ui/button-3d";
import type { AppSession } from "@/types/admin";

const navLinks = [
  { label: "Mission", href: "/mission" },
  { label: "Paths", href: "/learn" },
  { label: "Community", href: "/community" },
  { label: "Blogs", href: "/blogs" },
];

const NAV_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const NAV_DURATION = "820ms";
const BANNER_HEIGHT = 36;

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
      <div className="fixed left-0 top-0 z-[60] flex h-9 w-full items-center justify-center bg-[#c4622d] px-4 text-center text-white">
        <p className="truncate font-space text-[11px] font-semibold tracking-[0.12em] sm:text-xs">
          One more thing is cooking. Stay tuned.
        </p>
      </div>
      <nav
        style={{
          position: "fixed",
          top: `${BANNER_HEIGHT}px`,
          left: "0px",
          width: "100%",
          maxWidth: "100vw",
          zIndex: 50,
          background: "color-mix(in oklch, var(--background) 82%, transparent)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: scrolled ? "0 4px 18px rgba(0,0,0,0.07)" : "none",
          transition: `background-color ${NAV_DURATION} ${NAV_EASE}, border-color ${NAV_DURATION} ${NAV_EASE}, box-shadow ${NAV_DURATION} ${NAV_EASE}, backdrop-filter ${NAV_DURATION} ${NAV_EASE}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "32px",
            padding: isMobile ? "14px 20px" : "18px 32px",
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
            transition: `background-color ${NAV_DURATION} ${NAV_EASE}, border-color ${NAV_DURATION} ${NAV_EASE}, box-shadow ${NAV_DURATION} ${NAV_EASE}, backdrop-filter ${NAV_DURATION} ${NAV_EASE}`,
          }}
        >
          <Link href="/" className="flex shrink-0 select-none items-center font-space text-xl font-bold text-foreground">
            The<span className="text-[#c4622d]">Odd</span>Ones
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 rounded-2xl border border-foreground/10 bg-background/70 p-1 shadow-[0_1px_8px_rgba(0,0,0,0.06)] md:flex">
            {navLinks.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={
                    active
                      ? "rounded-xl bg-background px-5 py-2 font-space text-sm font-semibold text-foreground shadow-sm"
                      : "rounded-xl px-5 py-2 font-space text-sm font-semibold text-foreground/50 transition-colors hover:text-foreground"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden shrink-0 items-center gap-3 font-space md:flex">
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
        style={{ paddingTop: `${BANNER_HEIGHT + 72}px` }}
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

        <div className="w-full pt-6">
          {session ? (
            <form action={logoutAction}>
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-space font-semibold">
                <LogOut className="size-4" />
                Log out
              </button>
            </form>
          ) : (
            <Button3D
              className="w-full"
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
