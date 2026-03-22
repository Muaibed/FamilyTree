"use client";

import { BlurBackground } from "@/components/ui/BlurBackground";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      toast(data.message);
      setSent(true);
    } catch {
      toast("حدث خطأ، حاول مجدداً");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlurBackground>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
          <h1 className="text-3xl text-card-foreground font-bold pb-2">نسيت كلمة المرور؟</h1>
          <p className="text-muted-foreground pb-6 text-sm">
            أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
          </p>

          {sent ? (
            <p className="text-green-600 text-center">
              تم الإرسال. تحقق من بريدك الإلكتروني.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "جاري الإرسال..." : "إرسال رابط الاستعادة"}
              </Button>
            </form>
          )}

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
