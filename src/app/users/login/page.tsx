import type { Metadata } from "next";

import { UserAuthCard } from "@/components/auth/UserAuthCard";

export const metadata: Metadata = {
  title: "Sign in | TheOddOnes",
};

export default function UserLoginPage() {
  return <UserAuthCard mode="login" />;
}
