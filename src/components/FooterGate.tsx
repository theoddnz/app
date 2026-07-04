"use client";

import { usePathname } from "next/navigation";

const hiddenFooterRoutes = ["/dashboard", "/login", "/users/login", "/users/signup"];

export function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = hiddenFooterRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (hideFooter) {
    return null;
  }

  return <>{children}</>;
}
