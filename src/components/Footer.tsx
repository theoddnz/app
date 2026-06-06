import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.25" cy="6.75" r="1.1" fill="currentColor" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <polygon points="10,8.5 10,15.5 16,12" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 10v7M7 7v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 17v-4c0-1.5 1-2 2-2s2 .5 2 2v4M11 10v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path d="M9 11.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM13 11.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z" fill="currentColor" />
      <path d="M15.5 5.5S17.5 6 19 8c1.5 2 1.5 5.5 1.5 5.5s-1 1.5-3 2L16 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 5.5S6.5 6 5 8C3.5 10 3.5 13.5 3.5 13.5s1 1.5 3 2L8 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 5.5C9.5 5 10.5 4.5 12 4.5s2.5.5 3.5 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 15.5c1 .5 2 .5 4 .5s3 0 4-.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const socialLinks = [
  { label: "X",        href: siteConfig.social.x,         icon: null },
  { label: "Instagram",href: siteConfig.social.instagram,  icon: InstagramIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin ?? "#", icon: LinkedInIcon },
  { label: "YouTube",  href: siteConfig.social.youtube  ?? "#", icon: YoutubeIcon },
  { label: "Discord",  href: siteConfig.social.discord  ?? "#", icon: DiscordIcon },
];

const navLinks = [
  { label: "Mission",        href: "/mission" },
  { label: "Learning paths", href: "/learn" },
  { label: "Community",      href: "/community" },
  { label: "Field notes",    href: "/blogs" },
  { label: "Sign in",        href: "/users/login" },
  { label: "Sign up",        href: "/users/signup" },
];

const exploreLinks = [
  { label: "Mission",        href: "/mission" },
  { label: "Learning paths", href: "/learn" },
  { label: "Field notes",    href: "/blogs" },
];

const communityLinks = [
  { label: "Community",  href: "/community" },
  { label: "Discord",    href: siteConfig.social.discord ?? "#" },
  { label: "Sign in",    href: "/users/login" },
  { label: "Sign up",    href: "/users/signup" },
];

function SocialButton({ label, href, icon: Icon }: { label: string; href: string; icon: React.ComponentType<{ className?: string }> | null }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`TheOddOnes on ${label}`}
      className="inline-flex size-10 items-center justify-center rounded-[10px] border border-black/10 text-black/45 transition-colors hover:border-black/25 hover:text-black dark:border-white/[0.10] dark:text-white/40 dark:hover:border-white/25 dark:hover:text-[#f0ebe5]"
    >
      {Icon ? (
        <Icon className="size-[18px]" />
      ) : (
        <span className="font-space text-[14px] font-bold leading-none">X</span>
      )}
    </Link>
  );
}

export default function Footer() {
  return (
    <div className="bg-background px-2 pb-0 pt-16 dark:bg-[#0a0806] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-t-[32px] bg-white p-3 shadow-[0_-4px_0_rgba(13,38,58,0.04),0_-12px_40px_rgba(13,38,58,0.10)] ring-1 ring-black/[0.05] dark:bg-neutral-900 dark:shadow-[0_-4px_0_rgba(0,0,0,0.2),0_-12px_40px_rgba(0,0,0,0.3)] dark:ring-white/[0.04]">
          <footer className="rounded-t-[22px] border border-b-0 border-black/[0.04] bg-[#f8f7f5] px-8 pb-10 pt-14 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/[0.04] dark:bg-neutral-950 dark:text-[#f0ebe5] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:px-12">

            {/* Main grid: brand | navigate | community | connect */}
            <div className="grid gap-12 pb-12 md:grid-cols-[1fr_1fr_1fr_1.2fr] md:gap-10 md:pb-16">

              {/* Brand */}
              <div className="flex flex-col gap-5">
                <Link href="/" aria-label="TheOddOnes home" className="inline-flex w-fit">
                  <Image src="/assets/theoddones-white-logo.png" alt="TheOddOnes" width={48} height={48} className="h-12 w-12 object-contain dark:hidden" />
                  <Image src="/assets/theoddones-black-logo.png" alt="TheOddOnes" width={48} height={48} className="hidden h-12 w-12 object-contain dark:block" />
                </Link>
                <p className="max-w-[18rem] font-heading text-[13px] text-black/45 dark:text-white/35">
                  A movement for builders who learn together in public — with focus, craft, and care.
                </p>
              </div>

              {/* Navigate */}
              <div>
                <p className="font-space text-[11px] uppercase tracking-[0.18em] text-black/30 dark:text-white/25">
                  Navigate
                </p>
                <ul className="mt-5 space-y-3">
                  {navLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="font-heading text-[15px] font-medium text-black/55 transition-colors hover:text-black dark:text-white/45 dark:hover:text-[#f0ebe5]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community */}
              <div>
                <p className="font-space text-[11px] uppercase tracking-[0.18em] text-black/30 dark:text-white/25">
                  Community
                </p>
                <ul className="mt-5 space-y-3">
                  {communityLinks.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="font-heading text-[15px] font-medium text-black/55 transition-colors hover:text-black dark:text-white/45 dark:hover:text-[#f0ebe5]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect */}
              <div>
                <p className="font-space text-[11px] uppercase tracking-[0.18em] text-black/30 dark:text-white/25">
                  Connect
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {socialLinks.map((s) => (
                    <SocialButton key={s.label} {...s} />
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-black/[0.08] pt-8 dark:border-white/[0.06]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Link href="/" aria-label="TheOddOnes home" className="inline-flex items-center gap-1.5">
                  <Image src="/assets/theoddones-white-logo.png" alt="TheOddOnes" width={32} height={32} className="h-8 w-8 object-contain dark:hidden" />
                  <Image src="/assets/theoddones-black-logo.png" alt="TheOddOnes" width={32} height={32} className="hidden h-8 w-8 object-contain dark:block" />
                  <span className="font-space text-[15px] font-bold tracking-[-0.02em] text-black/70 hover:text-black dark:text-white/60 dark:hover:text-[#f0ebe5]">
                    The<span className="text-secondary">Odd</span>Ones
                  </span>
                </Link>

                <p className="font-inter text-[12px] font-light tracking-[0.04em] text-black/35 dark:text-white/30">
                  © 2026 The<span className="text-secondary">Odd</span>Ones
                </p>

                <div className="flex items-center gap-4">
                  {socialLinks.map((s) => (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="font-space text-[12px] font-medium text-black/35 transition-colors hover:text-black dark:text-white/30 dark:hover:text-[#f0ebe5]"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </footer>
        </div>
      </div>
    </div>
  );
}