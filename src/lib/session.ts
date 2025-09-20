import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function isAdmin() {
  try {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  return !!session && isAdmin
} catch (error) {
  return false;
}
}

export async function getUserId() {
  try {
    const session = await getServerSession(authOptions);
    const id = session?.user.id;

    return id;
  } catch (error) {
    return null
  }
}
