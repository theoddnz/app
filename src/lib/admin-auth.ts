import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AppSession, UserRole } from "@/types/admin";

const SESSION_COOKIE = "odd_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters.");
  }

  return new TextEncoder().encode(secret);
}

export async function createAppSession(user: { id: string; email: string; role: UserRole }) {
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);
  const token = await new SignJWT({ userId: user.id, email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function getAppSession(): Promise<AppSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, getSecretKey());
    const userId = verified.payload.userId;
    const email = verified.payload.email;
    const role = verified.payload.role;
    const expiresAt = verified.payload.exp;

    if (
      typeof userId !== "string" ||
      typeof email !== "string" ||
      (role !== "admin" && role !== "student") ||
      !expiresAt
    ) {
      return null;
    }

    return {
      userId,
      email,
      role,
      expiresAt: new Date(expiresAt * 1000).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAppSession();

  if (!session || session.role !== "admin") {
    redirect("/users/login");
  }

  return session;
}

export async function requireStudentSession() {
  const session = await getAppSession();

  if (!session) {
    redirect("/users/login");
  }

  if (session.role === "admin") {
    redirect("/dashboard");
  }

  return session;
}

export async function clearAppSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
