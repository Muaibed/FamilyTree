'use client';

import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";

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
    <div className="flex dark:text-black bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]  items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded">
        <h1 className="text-4xl font-bold pb-8">Sign Up</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div className="items-center justify-center">
          <div>
            <input
              className="border dark:border-[#9d9fa9] rounded p-2 mb-4 w-sm"
              placeholder="Name"
              {...register("name")}
            />
        </div>
        <div>
          <input
            className="border dark:border-[#9d9fa9] rounded p-2 mb-4 w-sm"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <input
            className="border dark:border-[#9d9fa9] rounded p-2 mb-4 w-sm"
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit" className="bg-blue-500 text-white hover:cursor-pointer px-4 py-2 mt-6">
            Sign Up
          </Button>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
}
