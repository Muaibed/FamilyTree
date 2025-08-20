import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) return new Response("Invalid token", { status: 400 });

  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record || record.expires < new Date()) {
    return new Response("Token expired or invalid", { status: 400 });
  }

  await prisma.user.update({
    where: { email: record.identifier },
    data: { verified: true }
  });

  await prisma.verificationToken.delete({ where: { token } });

  return new Response("Email verified! You can now log in.");
}
