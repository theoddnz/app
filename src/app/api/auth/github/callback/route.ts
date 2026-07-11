import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getDb } from "@/db";
import { users } from "@/db/schema";
import { createAppSession } from "@/lib/admin-auth";

const STATE_COOKIE = "github_oauth_state";

type GitHubUser = {
  id: number;
  name: string | null;
  login: string;
  email: string | null;
};

type GitHubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
};

function baseUrl(request: Request) {
  return process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || new URL(request.url).origin;
}

async function getAccessToken(code: string, request: Request) {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${baseUrl(request)}/api/auth/github/callback`,
    }),
  });

  const data = (await response.json()) as { access_token?: string; error_description?: string };

  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description ?? "GitHub token exchange failed.");
  }

  return data.access_token;
}

async function getGitHubProfile(accessToken: string) {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/vnd.github+json",
  };
  const userResponse = await fetch("https://api.github.com/user", { headers });

  if (!userResponse.ok) {
    throw new Error("Could not read GitHub profile.");
  }

  const profile = (await userResponse.json()) as GitHubUser;
  let email = profile.email;

  if (!email) {
    const emailResponse = await fetch("https://api.github.com/user/emails", { headers });

    if (emailResponse.ok) {
      const emails = (await emailResponse.json()) as GitHubEmail[];
      email = emails.find((item) => item.primary && item.verified)?.email ?? emails.find((item) => item.verified)?.email ?? null;
    }
  }

  if (!email) {
    throw new Error("Your GitHub account has no verified public or primary email.");
  }

  return {
    providerAccountId: String(profile.id),
    name: profile.name || profile.login,
    email: email.toLowerCase(),
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get(STATE_COOKIE)?.value;
  cookieStore.delete(STATE_COOKIE);

  if (!code || !state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(new URL("/login?error=github", request.url));
  }

  try {
    const accessToken = await getAccessToken(code, request);
    const profile = await getGitHubProfile(accessToken);
    const existing = await getDb().query.users.findFirst({
      where: eq(users.email, profile.email),
    });
    const role = existing?.role === "admin" ? "admin" : "student";
    const [user] = existing
      ? await getDb()
          .update(users)
          .set({
            name: existing.name || profile.name,
            authProvider: "github",
            providerAccountId: profile.providerAccountId,
            updatedAt: new Date(),
          })
          .where(eq(users.id, existing.id))
          .returning()
      : await getDb()
          .insert(users)
          .values({
            name: profile.name,
            email: profile.email,
            role,
            authProvider: "github",
            providerAccountId: profile.providerAccountId,
          })
          .returning();

    await createAppSession({ id: user.id, email: user.email, role });
    return NextResponse.redirect(new URL(role === "admin" ? "/dashboard" : "/learn", request.url));
  } catch {
    return NextResponse.redirect(new URL("/login?error=github", request.url));
  }
}
