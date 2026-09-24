import { cookies } from "next/headers";
import { connectDB } from "./mongodb";
import { User, type IUser, type UserRole } from "@/models/User";
import {
  COOKIE_NAME,
  decodeSession,
  encodeSession,
  type SessionPayload,
} from "./session-token";

export type { SessionPayload };

export async function setSession(user: IUser) {
  const jar = await cookies();
  const token = await encodeSession({
    userId: String(user._id),
    role: user.role,
    name: user.name,
    email: user.email,
  });
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  return decodeSession(jar.get(COOKIE_NAME)?.value);
}

export async function requireUser(role?: UserRole) {
  const session = await getSession();
  if (!session) return null;
  if (role && session.role !== role) return null;
  await connectDB();
  const user = await User.findById(session.userId);
  if (!user) return null;
  if (role && user.role !== role) return null;
  return user;
}

export async function requireSession(role?: UserRole) {
  const session = await getSession();
  if (!session) return null;
  if (role && session.role !== role) return null;
  return session;
}
