'use client';

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UserInfo = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>()
  const { register, handleSubmit, reset } = useForm<UserInfo>();

  const hasInitialized = useRef(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) return;
      
      try {
        const res = await fetch(`/api/auth/user/${session.user.id}`, {
          method: "GET",
        });
        
        if (!res.ok) throw new Error("Failed to fetch user");
        
        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    if (userInfo && !hasInitialized.current) {
      reset({
        name: userInfo.name,
        email: userInfo.email,
      });
      hasInitialized.current = true;
    }
    
    if (!userInfo)
      fetchUser();
    
  }, [session, userInfo, reset]);
  
  if (!session) {
    return (
      <div>
        <p>You are not logged in.</p>
        <a href="/api/auth/signin">Sign in</a>
      </div>
    )
  }

  
  const onSubmit = async (data: any) => {
        const output = {
            ...data,
        }
        if (session) {
          const id = session.user.id;
          const res = await fetch(`/api/auth/user/${id}`, {
            method: "PUT",
            body: JSON.stringify(output),
          });
    
          if (!res.ok) {
            const errorData = await res.json();
            console.error(errorData)
            toast(`Modifying User Failed.`)
          } else {
              toast(`User Modified Successfully.`)
          }
        };
        }

 return (
        <div className="flex dark:text-black bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226]  items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded">
            <p>Signed in as {session?.user.email} {session?.user.role} {session?.user.id} {}</p>
            <h1 className="text-4xl font-bold pb-8">Account</h1>
    
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
                {...register("email")}
              />
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" className="bg-blue-500 text-white hover:cursor-pointer px-4 py-2 mt-6">
                Save
              </Button>
            </div>
            </div>
          </form>
        </div>
        </div>
      );
}
