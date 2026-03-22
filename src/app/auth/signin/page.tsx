"use client";

import { BlurBackground } from "@/components/ui/BlurBackground";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (<>
    <BlurBackground className="">
      <div className="flex items-center justify-center min-h-screen">
          <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
          <h1 className="text-4xl text-card-foreground font-bold pb-8">تسجيل الدخول</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
              });

              if (result?.ok) {
                toast("تم تسجيل الدخول بنجاح.");
                window.location.href = "/tree";
              } else {
                toast("فشل تسجيل الدخول.");
              }
            }}
          >
            <div className="mb-2">
                <input
                  className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  type="text"
                  placeholder="البريد الإلكتروني"
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                />
            </div>
              <div className="mb-8">
                <input
                  className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  type="password"
                  placeholder="كلمة المرور"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" className="w-full py-2 px-4 font-semibold rounded-md transition"
  >
                  تسجيل الدخول
                </Button>
              </div>
              <div className="flex justify-center pt-2">
                <a href="/auth/forgot-password" className="text-sm text-blue-500 dark:text-primary">
                  نسيت كلمة المرور؟
                </a>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 pt-2 text-card-foreground">
                <div>
                  ليس لديك حساب؟ 
                  </div>
                  <a href="/auth/signup" className="text-blue-500 dark:text-primary">إنشاء حساب</a>
            </div>
          </form>
        </div>
      </div>
    </BlurBackground>
    </>
  );
}
