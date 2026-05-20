"use client";

import { Code, Search } from "@/components/ui/huge-icons";

export function SocialAuthButtons() {
  const providers = [
    { label: "GitHub", icon: Code, href: "/api/auth/github/start", disabled: false },
    { label: "Google", icon: Search, href: "#", disabled: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {providers.map(({ label, icon: Icon, href, disabled }) => (
        <a
          key={label}
          href={href}
          aria-disabled={disabled}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault();
            }
          }}
          title={disabled ? `${label} login is not connected yet` : `Continue with ${label}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background font-space text-sm font-medium text-foreground/70 transition-colors hover:bg-muted aria-disabled:cursor-not-allowed aria-disabled:opacity-65"
        >
          <Icon className="size-4" />
          {label}
        </a>
      ))}
    </div>
  );
}
