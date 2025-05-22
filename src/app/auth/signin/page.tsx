"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner"

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex dark:text-black bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]  items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded">
        <h1 className="text-4xl font-bold pb-8">Login</h1>
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
          <div className="items-center justify-center">
            <div>
              <input
                className="border dark:border-[#9d9fa9] rounded p-2 mb-4 w-sm"
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                className="border dark:border-[#9d9fa9] rounded p-2 mb-4 w-sm"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" className="bg-blue-500 text-white hover:cursor-pointer px-4 py-2 mt-6">
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
