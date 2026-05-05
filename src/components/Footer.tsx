import Link from "next/link";
import { BookOpen, Bot, Braces, Bug, Cpu, RadioTower, Wrench } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

const linkGroups = {
  Platform: ["Learning Paths", "Go Lang", "Robotics", "Manual Testing"],
  Community: ["Discord", "GitHub", "Twitter / X", "YouTube"],
  Blogs: ["Tutorials", "Build Logs", "ROS Deep Dives", "Hardware"],
};

const hrefs: Record<string, string> = {
  "Learning Paths": "/learn",
  "Go Lang": "/learn/go-lang",
  Robotics: "/learn/robotics",
  "Manual Testing": "/learn/manual-testing",
  Tutorials: "/blogs",
  "Build Logs": "/blogs",
  "ROS Deep Dives": "/blogs",
  Hardware: "/blogs",
  Discord: "/community",
  GitHub: "/community",
  "Twitter / X": "/community",
  YouTube: "/community",
};

const labSignals = [
  { label: "Build", icon: Braces },
  { label: "Break", icon: Bug },
  { label: "Repair", icon: Wrench },
  { label: "Repeat", icon: RadioTower },
];

export default function Footer() {
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
        {/* <div className="mb-14 overflow-hidden rounded-2xl border border-black/[0.08] bg-background/65 shadow-[0_1px_0_rgba(255,255,255,0.65)_inset] dark:border-white/[0.08] dark:bg-white/[0.03]">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {labSignals.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="group flex min-h-28 flex-col justify-between border-black/[0.06] p-5 odd:border-r even:border-r-0 dark:border-white/[0.06] md:border-r md:last:border-r-0"
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className="text-black/32 transition-colors group-hover:text-[#c4622d] dark:text-white/35"
                />
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-[0.22em] text-black/32 dark:text-white/28">
                    Odd loop
                  </p>
                  <p className="mt-1 font-space text-xl font-bold leading-none">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <div className="grid grid-cols-2 gap-10 py-10 md:grid-cols-4 md:gap-12">
          <div className="col-span-2 flex flex-col gap-5 md:col-span-1">
            <Link
              href="/"
              className="group inline-flex items-center font-space text-[22px] font-extrabold leading-none tracking-[-0.02em] text-black dark:text-[#f0ebe5]"
            >
              The
              <span className="text-[#c4622d] transition-colors duration-300 group-hover:text-[#e07a3f]">
                Odd
              </span>
              Ones
            </Link>
            <p className="max-w-[250px] font-inter text-sm font-light leading-relaxed text-black/45 dark:text-white/35">
              A learning lab for people who build understanding sideways.
            </p>
            <div className="flex items-center gap-2 text-black/35 dark:text-white/30">
              <Cpu size={15} strokeWidth={1.8} />
              <BookOpen size={15} strokeWidth={1.8} />
              <Bot size={15} strokeWidth={1.8} />
            </div>
          </div>

          {Object.entries(linkGroups).map(([col, items]) => (
            <div key={col}>
              <p className="mb-5 font-space text-[11px] font-medium uppercase tracking-[0.18em] text-[rgba(196,98,45,0.75)]">
                {col}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href={hrefs[item] ?? "#"}
                      className="group relative inline-flex font-space text-[13.5px] font-normal text-black/45 transition-colors duration-200 hover:text-black dark:text-white/40 dark:hover:text-[#f0ebe5]"
                    >
                      <span className="relative">
                        {item}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#c4622d] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative select-none py-5">
          <h2
            className="whitespace-nowrap font-space font-extrabold leading-none text-transparent"
            style={{
              fontSize: "clamp(3.5rem, 15vw, 12rem)",
              WebkitTextStroke:
                "1px color-mix(in oklch, var(--foreground) 12%, transparent)",
            }}
          >
            TheOddOnes
          </h2>
        </div>

        <div className="flex flex-col gap-6 border-t border-black/[0.08] pt-8 dark:border-white/[0.06] md:flex-row md:items-center md:justify-between">
          <div className="flex w-full flex-wrap items-center justify-between gap-5 md:w-auto md:contents">
            <div className="flex flex-wrap items-center gap-5 font-inter text-[12px] text-black/40 dark:text-white/35">
              <Link href="#" className="transition-colors hover:text-black/70 dark:hover:text-white/70">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-black/70 dark:hover:text-white/70">
                Terms
              </Link>
              <Link href="#" className="transition-colors hover:text-black/70 dark:hover:text-white/70">
                Contact
              </Link>
            </div>

            <ThemeSwitcher />
          </div>

          <p className="font-inter text-[12px] font-light tracking-[0.04em] text-black/35 dark:text-white/30">
            © 2026 TheOddOnes / All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
