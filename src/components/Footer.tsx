import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/seo";
import { getSiteViews } from "@/lib/analytics";
import { ViewCountBadge } from "@/components/ViewCountBadge";

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z" />
    </svg>
  );
}

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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path
        d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M26.413,6.536c-1.971-.902-4.052-1.543-6.189-1.904-.292,.523-.557,1.061-.793,1.612-2.277-.343-4.592-.343-6.869,0-.236-.551-.5-1.089-.793-1.612-2.139,.365-4.221,1.006-6.194,1.909C1.658,12.336,.596,17.987,1.127,23.558h0c2.294,1.695,4.861,2.984,7.591,3.811,.615-.827,1.158-1.704,1.626-2.622-.888-.332-1.744-.741-2.56-1.222,.215-.156,.425-.316,.628-.472,4.806,2.26,10.37,2.26,15.177,0,.205,.168,.415,.328,.628,.472-.817,.483-1.676,.892-2.565,1.225,.467,.918,1.011,1.794,1.626,2.619,2.732-.824,5.301-2.112,7.596-3.808h0c.623-6.461-1.064-12.06-4.46-17.025Zm-15.396,13.596c-1.479,0-2.702-1.343-2.702-2.994s1.18-3.006,2.697-3.006,2.73,1.354,2.704,3.006-1.192,2.994-2.699,2.994Zm9.967,0c-1.482,0-2.699-1.343-2.699-2.994s1.18-3.006,2.699-3.006,2.723,1.354,2.697,3.006-1.189,2.994-2.697,2.994Z" />
    </svg>
  );
}

function RedditIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M27.332,10.323c-1.07,0-2.055,.361-2.842,.967-2.143-1.326-4.848-2.16-7.807-2.271v-.013c0-1.983,1.474-3.629,3.386-3.9v-.003c.347,1.47,1.666,2.564,3.242,2.564,1.84,0,3.331-1.491,3.331-3.331s-1.491-3.331-3.331-3.331c-1.609,0-2.95,1.14-3.262,2.657-2.694,.289-4.798,2.574-4.798,5.343v.017c-2.93,.123-5.605,.957-7.729,2.274-.789-.611-1.779-.974-2.853-.974-2.578,0-4.668,2.09-4.668,4.668,0,1.871,1.099,3.483,2.688,4.228,.155,5.419,6.06,9.778,13.323,9.778s13.176-4.364,13.323-9.787c1.576-.75,2.666-2.357,2.666-4.217,0-2.578-2.09-4.668-4.668-4.668ZM7.334,17.952c.078-1.693,1.203-2.992,2.51-2.992s2.307,1.373,2.229,3.066c-.078,1.693-1.054,2.308-2.363,2.308s-2.453-.689-2.375-2.382Zm13.596,4.424c-.804,1.922-2.703,3.273-4.919,3.273s-4.114-1.351-4.919-3.273c-.095-.228,.061-.483,.306-.508,1.437-.145,2.991-.225,4.613-.225s3.175,.08,4.613,.225c.245,.025,.401,.28,.306,.508Zm1.384-2.043c-1.307,0-2.285-.614-2.363-2.308-.078-1.693,.92-3.066,2.229-3.066s2.433,1.299,2.51,2.992c.078,1.693-1.068,2.382-2.375,2.382Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "X",        href: siteConfig.social.x,         icon: XIcon },
  { label: "Instagram",href: siteConfig.social.instagram,  icon: InstagramIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin ?? "#", icon: LinkedInIcon },
  { label: "YouTube",  href: siteConfig.social.youtube  ?? "#", icon: YoutubeIcon },
  { label: "Discord",  href: siteConfig.social.discord  ?? "#", icon: DiscordIcon },
  { label: "Reddit",   href: siteConfig.social.reddit   ?? "#", icon: RedditIcon },
];

const exploreLinks = [
  { label: "Mission",        href: "/mission" },
  { label: "Learning paths", href: "/learn" },
  { label: "Field notes",    href: "/blogs" },
];

const communityLinks = [
  { label: "Community",  href: "/community" },
  { label: "Sponsors",   href: "/sponsors" },
  { label: "Discord",    href: siteConfig.social.discord ?? "#" },
];

const importantLinks = [
  { label: "Log in",      href: "/login" },
  { label: "My learning", href: "/my-learning" },
  { label: "Sitemap",     href: "/sitemap.xml" },
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
    <footer className="w-full bg-[#f8f7f5] pt-16 text-black dark:bg-[#131313] dark:text-[#f0ebe5]">
      <div className="w-full sm:mx-auto sm:max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 border-y border-dashed border-black/[0.08] dark:border-white/[0.08] lg:grid-cols-[1.45fr_0.75fr_0.75fr_0.75fr_0.75fr]">
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
              <ViewCountBadge views={views} />
            </div>

            <p className="mt-16 hidden font-space text-sm text-black/45 dark:text-white/35 lg:mt-20 lg:block">
              Copyright {currentYear} TheOddOnes. All rights reserved.
            </p>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Community" links={communityLinks} />
          <FooterColumn title="Important" links={importantLinks} />
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
