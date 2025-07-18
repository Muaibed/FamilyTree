'use client';

import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { BlurBackground } from "@/components/ui/BlurBackground";

export default function SignupPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const output = {
        ...data,
    }
    const res = await fetch("/api/auth/email_signup", {
      method: "POST",
      body: JSON.stringify(output),
    });

    if (!res.ok) {
      toast(`Creating User Failed.`)
    } else {
        window.location.href = "/auth/signin";
        toast(`User Created Successfully.`)
    }
  };

  return (
    <BlurBackground>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-md mx-auto mt-8 p-10 bg-card rounded-lg shadow-md">
          <h1 className="text-4xl font-bold pb-8">Sign Up</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="items-center justify-center">
            <div className="mb-2">
              <input
                className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Name"
                {...register("name")}
              />
          </div>
          <div className="mb-2">
            <input
              className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className="mb-8">
            <input
              className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-full py-2 px-4 font-semibold rounded-md transition">
              Sign Up
            </Button>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 pt-2 text-card-foreground">
            <div>
              Already have an account? 
            </div>
            <a href="/auth/signin" className="text-blue-500 dark:text-primary">Signin</a>
            </div>
          </div>
        </form>
      </div>
      </div>
    </BlurBackground>
  );
}
