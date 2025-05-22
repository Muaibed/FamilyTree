import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; 

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return NextResponse.json(
      { message: "Email already registered" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "USER",
    },
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
