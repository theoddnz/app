import type { Metadata } from "next";

import { UserAuthCard } from "@/components/auth/UserAuthCard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to your TheOddOnes account.",
  path: "/users/login",
  noIndex: true,
});

export default function UserLoginPage() {
  return <UserAuthCard mode="login" />;
}
