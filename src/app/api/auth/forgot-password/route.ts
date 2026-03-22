import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomBytes } from 'crypto';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'البريد الإلكتروني مطلوب' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

  // Always return success to avoid user enumeration
  if (!user || !user.email) {
    return NextResponse.json({ message: 'إذا كان البريد مسجلاً، ستصلك رسالة قريباً' });
  }

  // Invalidate any existing tokens for this user
  await prisma.passwordResetToken.updateMany({
    where: { userId: user.id, used: false },
    data: { used: true },
  });

  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: 'إعادة تعيين كلمة المرور - غصن',
    text: `لإعادة تعيين كلمة المرور، انقر على الرابط التالي (صالح لمدة ساعة):\n\n${resetUrl}\n\nإذا لم تطلب ذلك، تجاهل هذه الرسالة.`,
  });

  return NextResponse.json({ message: 'إذا كان البريد مسجلاً، ستصلك رسالة قريباً' });
}
