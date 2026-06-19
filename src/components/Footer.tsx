import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo";
import { getSiteViews, formatViews } from "@/lib/analytics";

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

const exploreLinks = [
  { label: "Mission",        href: "/mission" },
  { label: "Learning paths", href: "/learn" },
  { label: "Field notes",    href: "/blogs" },
];

const communityLinks = [
  { label: "Community",  href: "/community" },
  { label: "Discord",    href: siteConfig.social.discord ?? "#" },
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

function formatOrdinal(value: number) {
  const remainder = value % 100;
  const suffix = remainder >= 11 && remainder <= 13
    ? "th"
    : value % 10 === 1
      ? "st"
      : value % 10 === 2
        ? "nd"
        : value % 10 === 3
          ? "rd"
          : "th";

  return `${value.toLocaleString("en-US")}${suffix}`;
}

export default async function Footer() {
  const views = await getSiteViews();

  return (
    <div className="bg-background px-3 pt-16 dark:bg-[#0a0806] sm:px-5 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-t-[32px] bg-white p-2 shadow-[0_-4px_0_rgba(13,38,58,0.04),0_-12px_40px_rgba(13,38,58,0.10)] ring-1 ring-black/[0.05] dark:bg-neutral-900 dark:shadow-[0_-4px_0_rgba(0,0,0,0.2),0_-12px_40px_rgba(0,0,0,0.3)] dark:ring-white/[0.04] sm:p-3">
          <footer className="rounded-t-[24px] border border-b-0 border-black/[0.04] bg-[#f8f7f5] px-5 pb-6 pt-10 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/[0.04] dark:bg-neutral-950 dark:text-[#f0ebe5] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:px-8 sm:pt-12 lg:px-12">
            <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.8fr)_1fr_1fr] lg:gap-16 lg:pb-12">
              <div className="sm:col-span-2 lg:col-span-1">
                <Link href="/" aria-label="TheOddOnes home" className="inline-flex items-center gap-3">
                  <Image src="/assets/theoddones-white-logo.png" alt="" width={48} height={48} className="size-12 object-contain dark:hidden" />
                  <Image src="/assets/theoddones-black-logo.png" alt="" width={48} height={48} className="hidden size-12 object-contain dark:block" />
                  <span className="font-space text-xl font-bold tracking-[-0.03em]">
                    The<span className="text-secondary">Odd</span>Ones
                  </span>
                </Link>
                <p className="mt-5 max-w-sm font-heading text-base leading-7 text-black/50 dark:text-white/40">
                  A place for people who think differently about learning.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {socialLinks.map((social) => (
                    <SocialButton key={social.label} {...social} />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-space text-[11px] uppercase tracking-[0.18em] text-black/30 dark:text-white/25">
                  Explore
                </p>
                <ul className="mt-5 space-y-3">
                  {exploreLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-heading text-[15px] font-medium text-black/55 transition-colors hover:text-black dark:text-white/45 dark:hover:text-[#f0ebe5]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-space text-[11px] uppercase tracking-[0.18em] text-black/30 dark:text-white/25">
                  Community
                </p>
                <ul className="mt-5 space-y-3">
                  {communityLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-heading text-[15px] font-medium text-black/55 transition-colors hover:text-black dark:text-white/45 dark:hover:text-[#f0ebe5]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="flex flex-col gap-5 border-t border-black/[0.08] pt-6 dark:border-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
              <p className="font-inter text-xs tracking-[0.03em] text-black/35 dark:text-white/30">
                © 2026 The<span className="text-secondary">Odd</span>Ones
              </p>

              {views !== null && (
                <p className="font-inter text-xs text-black/50 dark:text-white/45">
                  You’re the <span className="font-semibold tabular-nums text-[#c4622d]">{formatOrdinal(views)}</span> visitor
                  <span className="sr-only">, based on {formatViews(views)} recorded page views</span>
                </p>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
