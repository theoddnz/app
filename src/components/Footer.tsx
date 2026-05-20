import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Footer() {
  const groups: Array<{
    title: string;
    links: Array<{ label: string; href: string }>;
  }> = [
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
        { label: "My learning", href: "/my-learning" },
        { label: "Profile", href: "/settings" },
      ],
    },
    {
      title: "More",
      links: [
        { label: "Home", href: "/" },
        { label: "Admin", href: "/dashboard" },
        { label: "Login redirect", href: "/login" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-black/[0.06] bg-[#f5f3f0] px-6 pb-10 pt-16 text-black dark:border-white/[0.06] dark:bg-[#0a0806] dark:text-[#f0ebe5] md:px-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(196,98,45,0.4), transparent 70%)",
          filter: "blur(46px)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="py-12 md:py-16">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1.9fr] md:gap-16">
            {/* Left brand block */}
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-1"
                aria-label="TheOddOnes home"
              >
                <Image
                  src="/assets/theoddones-white-logo.png"
                  alt="TheOddOnes"
                  width={52}
                  height={52}
                  className="h-13 w-13 object-contain dark:hidden"
                />
                <Image
                  src="/assets/theoddones-black-logo.png"
                  alt="TheOddOnes"
                  width={52}
                  height={52}
                  className="hidden h-13 w-13 object-contain dark:block"
                />
                <span className="font-space text-[20px] font-extrabold leading-none tracking-[-0.03em] text-black/85 dark:text-[#f0ebe5]">
                  The<span className="text-[#c4622d]">Odd</span>Ones
                </span>
              </Link>
              <p className="max-w-[26rem] font-inter text-[13.5px] font-light leading-[1.85] text-black/45 dark:text-white/35">
                A movement for builders who learn together in public—with focus,
                craft, and care.
              </p>
              <div className="pt-1">
                <ThemeSwitcher />
              </div>
            </div>

            {/* Right links grid */}
            <div>
              <p className="font-space text-[12px] font-medium uppercase tracking-[0.22em] text-[rgba(196,98,45,0.75)]">
                Links
              </p>

              <div className="mt-9 grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 sm:gap-x-12">
            {groups.map((g) => (
              <div key={g.title} className="space-y-3">
                <p className="font-space text-[11px] uppercase tracking-[0.18em] text-black/35 dark:text-white/30">{g.title}</p>
                <ul className="space-y-3">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="font-space text-[14px] font-medium text-black/55 transition-colors hover:text-black dark:text-white/45 dark:hover:text-[#f0ebe5]"
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
        </div>

        <div className="border-t border-black/[0.08] pt-8 dark:border-white/[0.06]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1"
              aria-label="TheOddOnes home"
            >
              <Image
                src="/assets/theoddones-white-logo.png"
                alt="TheOddOnes"
                width={36}
                height={36}
                className="h-9 w-9 object-contain dark:hidden"
              />
              <Image
                src="/assets/theoddones-black-logo.png"
                alt="TheOddOnes"
                width={36}
                height={36}
                className="hidden h-9 w-9 object-contain dark:block"
              />
              <span className="font-space text-[16px] font-bold tracking-[-0.02em] text-black/70 hover:text-black dark:text-white/60 dark:hover:text-[#f0ebe5]">
                The<span className="text-secondary">Odd</span>Ones
              </span>
            </Link>
            <p className="font-inter text-[12px] font-light tracking-[0.04em] text-black/35 dark:text-white/30">
              © 2026 The<span className="text-secondary">Odd</span>Ones
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
