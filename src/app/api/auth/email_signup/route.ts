import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma"; 
import { randomBytes } from "crypto";
import { sendEmail } from "@/lib/email";

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
      },
    });
  
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 60);
  
    await prisma.verificationToken.create({
      data: { identifier: email, token, expires }
    });
  
    const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`;
  
    await sendEmail({to: email, subject: "تحقق من بريدك الالكتروني في غصن", text: verificationUrl})
  
    return NextResponse.json({ message: "Registration successful! Check your email to confirm your account." }, { status: 201 });
}
