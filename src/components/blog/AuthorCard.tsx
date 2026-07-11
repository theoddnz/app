"use client";

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93 6.06-6.93zm-1.29 19.5h2.04L6.48 3.24H4.29l13.32 17.41z" />
    </svg>
  );
}

export function AuthorCard({
  name,
  imageUrl,
  linkedin = "#",
  x = "#",
}: {
  name: string;
  imageUrl?: string;
  linkedin?: string;
  x?: string;
}) {
  const fallback = name.charAt(0);

  return (
    <div className="group/author relative inline-flex">
      <button
        type="button"
        className="flex items-center gap-3 rounded-xl text-left outline-none"
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" className="size-10 rounded-full border border-border object-cover" />
        ) : (
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-[#c4622d]/15 text-sm font-bold text-[#c4622d]">
            {fallback}
          </span>
        )}
        <span className="text-sm">
          <span className="block font-semibold text-foreground/85">{name}</span>
        </span>
      </button>

      {/* Hover popover */}
      <div
        className="pointer-events-none absolute left-0 top-full z-20 w-64 origin-top-left translate-y-1 scale-95 pt-3 opacity-0 transition-all duration-150 group-hover/author:pointer-events-auto group-hover/author:translate-y-0 group-hover/author:scale-100 group-hover/author:opacity-100"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg shadow-black/10">
          {imageUrl ? (
            <img src={imageUrl} alt="" className="size-11 shrink-0 rounded-full border border-border object-cover" />
          ) : (
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-[#c4622d]/15 text-base font-bold text-[#c4622d]">
              {fallback}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground/90">{name}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} on LinkedIn`}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground/55 transition-colors hover:text-[#c4622d]"
            >
              <LinkedInIcon />
            </a>
            <a
              href={x}
              target="_blank"
              rel="noreferrer"
              aria-label={`${name} on X`}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground/55 transition-colors hover:text-[#c4622d]"
            >
              <XIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
