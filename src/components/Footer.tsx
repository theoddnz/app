import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] px-6 pt-20 pb-10">
      <div className="max-w-6xl mx-auto">

        {/* Top — big wordmark + tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-white/6">
          <h2
            className="font-space font-bold text-white leading-none tracking-tighter select-none"
            style={{ fontSize: "clamp(4rem, 14vw, 11rem)" }}
          >
            TheOddOnes.
          </h2>
          {/* <div className="md:max-w-xs md:pb-2">
            <p className="font-inter text-white/30 text-sm leading-relaxed">
              For people who think the best way to learn something
              is to break it in front of everyone.
            </p>
          </div> */}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8">

          {/* Left — brand + year */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60 block" />
            </span>
            <p className="font-inter text-white/20 text-xs tracking-widest uppercase">
              TheOddOne — 2026
            </p>
          </div>

          {/* Center — minimal links */}
          <div className="flex items-center gap-6">
            {[
              { label: "Blog", href: "/blog" },
              { label: "Twitter", href: "#" },
              { label: "GitHub", href: "#" },
              { label: "Contact", href: "#" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="font-inter text-xs text-white/20 hover:text-white/60 transition-colors tracking-wide"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right — handmade note */}
          <p className="font-inter text-[11px] text-white/12 tracking-wider">
            Built by odd ones, for odd ones.
          </p>

        </div>
      </div>
    </footer>
  );
}