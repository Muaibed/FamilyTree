import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, phone, password } = await req.json();

  if (!phone || !password) {
    return NextResponse.json(
      { message: "Phone and password are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { phone } });

  if (existing) {
    return NextResponse.json(
      { message: "Phone already registered" },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      phone,
      password: hashed,
      role: "USER", 
    },
  });

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
