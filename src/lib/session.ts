import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function getUserId() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user.id ?? null;
  } catch {
    return null;
  }
}

export async function isPro() {
  try {
    const session = await getServerSession(authOptions);
    return session?.user.subscribtion === "PRO";
  } catch {
    return false;
  }
}

export async function isAdmin() {
  return false;
}