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

const legalLinks = [
  { label: "Privacy policy", href: "/privacy-policy" },
];

function SocialButton({ label, href, icon: Icon }: { label: string; href: string; icon: React.ComponentType<{ className?: string }> | null }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`TheOddOnes on ${label}`}
      className="inline-flex size-10 items-center justify-center rounded-md border border-black/[0.08] bg-white/55 text-black/45 transition-colors hover:border-black/20 hover:text-black dark:border-white/[0.10] dark:bg-white/[0.03] dark:text-white/40 dark:hover:border-white/25 dark:hover:text-[#f0ebe5] sm:size-11"
    >
      {Icon ? (
        <Icon className="size-[18px]" />
      ) : (
        <span className="font-heading text-[14px] font-semibold leading-none tracking-[0.08em]">X</span>
      )}
    </Link>
  );
}

function FooterColumn({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div className="border-t border-dashed border-black/[0.08] px-6 py-7 dark:border-white/[0.08] sm:px-8 sm:py-8 lg:border-l lg:border-t-0">
      <p className="font-heading text-[13px] uppercase tracking-[0.18em] text-primary sm:tracking-[0.22em]">
        {title}
      </p>
      <ul className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="font-space text-[14px] font-medium text-black/50 transition-colors hover:text-black dark:text-white/45 dark:hover:text-[#f0ebe5] sm:text-[15px]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const views = await getSiteViews();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f8f7f5] pt-16 text-black dark:bg-[#0a0806] dark:text-[#f0ebe5]">
      <div className="w-full sm:mx-auto sm:max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 border-y border-dashed border-black/[0.08] dark:border-white/[0.08] lg:grid-cols-[1.65fr_0.85fr_0.85fr_0.85fr]">
          <div className="col-span-2 px-6 py-8 sm:px-8 lg:col-span-1 lg:py-10">
            <Link href="/" aria-label="TheOddOnes home" className="inline-flex items-center gap-1">
              <Image src="/assets/theoddones-white-logo.png" alt="" width={40} height={40} className="size-10 object-contain dark:hidden" />
              <Image src="/assets/theoddones-black-logo.png" alt="" width={40} height={40} className="hidden size-10 object-contain dark:block" />
              <span className="font-space text-sm">
                The<span className="text-secondary">Odd</span>Ones
              </span>
            </Link>

            <p className="mt-8 max-w-sm font-space text-[15px] leading-7 text-black/50 dark:text-white/45">
              A place for people who think differently about learning.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <SocialButton key={social.label} {...social} />
              ))}
            </div>

            <div className="mt-7">
              {views !== null ? (
                <p className="inline-flex items-center rounded-full border border-black/[0.08] bg-white/55 px-4 py-2 font-space text-sm font-medium text-black/60 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/55">
                  <span className="mr-2 size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  {formatViews(views)} views
                  <span className="sr-only">, based on {views.toLocaleString("en-US")} recorded page views</span>
                </p>
              ) : (
                <p className="inline-flex items-center rounded-full border border-black/[0.08] bg-white/55 px-4 py-2 font-space text-sm font-medium text-black/45 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-white/35">
                  <span className="mr-2 size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  Views updating
                </p>
              )}
            </div>

            <p className="mt-16 hidden font-space text-sm text-black/45 dark:text-white/35 lg:mt-20 lg:block">
              Copyright {currentYear} TheOddOnes. All rights reserved.
            </p>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Community" links={communityLinks} />
          <div className="sm:col-span-2 lg:col-span-1">
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="relative h-[96px] overflow-hidden border-b border-dashed border-black/[0.08] dark:border-white/[0.08] sm:h-[190px] lg:h-[240px]">
          <p className="absolute left-1/2 top-2 -translate-x-1/2 select-none whitespace-nowrap font-heading text-[clamp(3.7rem,14vw,13rem)] font-bold leading-none text-black/[0.04] dark:text-white/[0.04] sm:top-0 sm:text-[clamp(4.8rem,15vw,13rem)] sm:text-black/[0.035]">
            TheOddOnes
          </p>
        </div>

        <p className="border-b border-dashed border-black/[0.08] px-6 py-5 font-space text-sm text-black/45 dark:border-white/[0.08] dark:text-white/35 lg:hidden">
          Copyright {currentYear} TheOddOnes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
