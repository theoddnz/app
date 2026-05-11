import type { Metadata } from "next";

import { UserAuthCard } from "@/components/auth/UserAuthCard";

export const metadata: Metadata = {
  title: "Sign up | TheOddOnes",
};

export default function UserSignupPage() {
  return <UserAuthCard mode="signup" />;
}
