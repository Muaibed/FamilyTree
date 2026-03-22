"use client";

import { BlurBackground } from "@/components/ui/BlurBackground";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      toast("كلمتا المرور غير متطابقتين");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast(data.message);
        router.push("/auth/signin");
      } else {
        toast(data.message);
      }
    } catch {
      toast("حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <p className="text-destructive text-center">رابط غير صالح.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          type="password"
          placeholder="كلمة المرور الجديدة"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <div className="mb-6">
        <input
          className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "جاري الحفظ..." : "تغيير كلمة المرور"}
      </Button>
    </form>
  );
}

export default function ResetPassword() {
  return (
    <BlurBackground>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
          <h1 className="text-3xl text-card-foreground font-bold pb-2">إعادة تعيين كلمة المرور</h1>
          <p className="text-muted-foreground pb-6 text-sm">أدخل كلمة المرور الجديدة.</p>
          <Suspense>
            <ResetPasswordForm />
          </Suspense>
          <div className="flex justify-center pt-4">
            <a href="/auth/signin" className="text-blue-500 dark:text-primary text-sm">
              العودة لتسجيل الدخول
            </a>
          </div>
        </div>
      </div>
    </BlurBackground>
  );
}
