import type { Metadata } from "next";

import { UserAuthCard } from "@/components/auth/UserAuthCard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to your TheOddOnes account.",
  path: "/login",
  noIndex: true,
});

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return <UserAuthCard mode="login" next={next} />;
}
