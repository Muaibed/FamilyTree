'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { BlurBackground } from '@/components/ui/BlurBackground';
import { useSignup } from '@/hooks/useAuth';
import Link from 'next/link';

type SignupForm = { name: string; email: string; password: string };

export default function SignupPage() {
  const { register, handleSubmit } = useForm<SignupForm>();
  const { mutateAsync: signup } = useSignup();

  const onSubmit = async (data: SignupForm) => {
    try {
      await signup(data);
      toast('تم إنشاء الحساب بنجاح.');
      window.location.href = '/auth/signin';
    } catch {
      toast('فشل إنشاء الحساب.');
    }
  };

  return (
    <BlurBackground>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
          <h1 className="text-4xl font-bold pb-8">إنشاء حساب</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="items-center justify-center">
              <div className="mb-2">
                <input
                  className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="الاسم"
                  {...register('name')}
                />
              </div>
              <div className="mb-2">
                <input
                  className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="البريد الإلكتروني"
                  {...register('email', { required: true })}
                />
              </div>
              <div className="mb-8">
                <input
                  className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  placeholder="كلمة المرور"
                  type="password"
                  {...register('password', { required: true })}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" className="w-full py-2 px-4 font-semibold rounded-md transition">
                  إنشاء حساب
                </Button>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 pt-2 text-card-foreground">
                <div>لديك حساب بالفعل؟</div>
                <Link href="/auth/signin" className="text-blue-500 dark:text-primary">تسجيل الدخول</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BlurBackground>
  );
}
