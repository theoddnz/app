import type { Metadata } from "next";

import { UserAuthCard } from "@/components/auth/UserAuthCard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sign up",
  description: "Create your TheOddOnes account.",
  path: "/signup",
  noIndex: true,
});

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <UserAuthCard mode="signup" next={next} />;
}
