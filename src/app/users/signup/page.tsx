import type { Metadata } from "next";

import { UserAuthCard } from "@/components/auth/UserAuthCard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sign up",
  description: "Create your TheOddOnes account.",
  path: "/users/signup",
  noIndex: true,
});

export default function UserSignupPage() {
  return <UserAuthCard mode="signup" />;
}
