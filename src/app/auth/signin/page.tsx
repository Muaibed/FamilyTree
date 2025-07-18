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
          <h1 className="text-4xl text-card-foreground font-bold pb-8">Login</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
              });

              if (result?.ok) {
                toast("Login Successfully.");
                window.location.href = "/";
              } else {
                toast("Login Failed.");
              }
            }}
          >
            <div className="mb-2">
                <input
                  className="w-full px-6 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>
              <div className="mb-8">
                <input
                  className="w-full px-4 py-2 border rounded-md bg-card-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" className="w-full py-2 px-4 font-semibold rounded-md transition"
  >
                  Login
                </Button>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 pt-2 text-card-foreground">
                <div>
                  Doesn't have an account? 
                  </div>
                  <a href="/auth/signup" className="text-blue-500 dark:text-primary">Signup</a>
            </div>
          </form>
        </div>
      </div>
    </BlurBackground>
    </>
  );
}
