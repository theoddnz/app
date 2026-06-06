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

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "X", href: siteConfig.social.x, icon: null },
];

export default function Footer() {
  const groups = [
    {
      title: "Explore",
      links: [
        { label: "Mission", href: "/mission" },
        { label: "Learning paths", href: "/learn" },
        { label: "Community", href: "/community" },
        { label: "Field notes", href: "/blogs" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Sign in", href: "/users/login" },
        { label: "Sign up", href: "/users/signup" },
      ],
    },
  ];

  return (
    <div className="bg-background px-2 pb-0 pt-16 dark:bg-[#0a0806] md:px-10">
      <div className="mx-auto max-w-7xl">

        {/* 3D shell — top rounded, bottom flush */}
        <div className="rounded-t-[32px] bg-white p-3 shadow-[0_-4px_0_rgba(13,38,58,0.04),0_-12px_40px_rgba(13,38,58,0.10)] ring-1 ring-black/[0.05] dark:bg-neutral-900 dark:shadow-[0_-4px_0_rgba(0,0,0,0.2),0_-12px_40px_rgba(0,0,0,0.3)] dark:ring-white/[0.04]">
          <footer className="rounded-t-[22px] border border-b-0 border-black/[0.04] bg-[#f8f7f5] px-8 pb-10 pt-14 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-white/[0.04] dark:bg-neutral-950 dark:text-[#f0ebe5] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:px-12">

            {/* Main grid */}
            <div className="grid gap-12 pb-12 md:grid-cols-[1.1fr_1.9fr] md:gap-16 md:pb-16">

              {/* Brand */}
              <div className="flex flex-col gap-5">
                <Link href="/" aria-label="TheOddOnes home" className="inline-flex w-fit">
                  <Image
                    src="/assets/theoddones-white-logo.png"
                    alt="TheOddOnes"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain dark:hidden"
                  />
                  <Image
                    src="/assets/theoddones-black-logo.png"
                    alt="TheOddOnes"
                    width={48}
                    height={48}
                    className="hidden h-12 w-12 object-contain dark:block"
                  />
                </Link>

                <p className="max-w-[22rem] font-heading text-[13px]   text-black/45 dark:text-white/35">
                  A movement for builders who learn together in public — with focus, craft, and care.
                </p>

                <div className="flex items-center gap-2">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`TheOddOnes on ${label}`}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 text-black/45 transition-colors hover:border-black/25 hover:text-black dark:border-white/10 dark:text-white/40 dark:hover:border-white/25 dark:hover:text-[#f0ebe5]"
                    >
                      {Icon ? <Icon className="size-4" /> : <span className="font-space text-sm font-bold">X</span>}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col justify-center">
                <p className="font-heading text-lg  font-medium uppercase  text-[rgba(196,98,45,0.75)]">
                  Links
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-10 sm:gap-x-16">
                  {groups.map((g) => (
                    <div key={g.title} className="space-y-3">
                      <p className="font-space text-[11px] uppercase tracking-[0.18em] text-black/30 dark:text-white/25">
                        {g.title}
                      </p>
                      <ul className="space-y-3">
                        {g.links.map((l) => (
                          <li key={l.label}>
                            <Link
                              href={l.href}
                              className="font-heading text-lg font-medium text-black/55 transition-colors hover:text-black dark:text-white/45 dark:hover:text-[#f0ebe5]"
                            >
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-black/[0.08] pt-8 dark:border-white/[0.06]">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Link href="/" aria-label="TheOddOnes home" className="inline-flex items-center gap-1.5">
                  <Image
                    src="/assets/theoddones-white-logo.png"
                    alt="TheOddOnes"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain dark:hidden"
                  />
                  <Image
                    src="/assets/theoddones-black-logo.png"
                    alt="TheOddOnes"
                    width={32}
                    height={32}
                    className="hidden h-8 w-8 object-contain dark:block"
                  />
                  <span className="font-space text-[15px] font-bold tracking-[-0.02em] text-black/70 hover:text-black dark:text-white/60 dark:hover:text-[#f0ebe5]">
                    The<span className="text-secondary">Odd</span>Ones
                  </span>
                </Link>

                <p className="font-inter text-[12px] font-light tracking-[0.04em] text-black/35 dark:text-white/30">
                  © 2026 The<span className="text-secondary">Odd</span>Ones
                </p>

                <div className="flex items-center gap-2">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`TheOddOnes on ${label}`}
                      className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 text-black/45 transition-colors hover:border-black/25 hover:text-black dark:border-white/10 dark:text-white/40 dark:hover:border-white/25 dark:hover:text-[#f0ebe5]"
                    >
                      {Icon ? <Icon className="size-4" /> : <span className="font-space text-sm font-bold">X</span>}
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