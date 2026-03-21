'use client';

import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUser, useUpdateUser } from '@/hooks/useAuth';

type UserForm = { name: string; email: string };

export default function AccountPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id ?? '';

  const { data: userInfo } = useUser(userId);
  const { mutateAsync: updateUser } = useUpdateUser();
  const { register, handleSubmit, reset } = useForm<UserForm>();

  useEffect(() => {
    if (userInfo) {
      reset({ name: userInfo.name, email: userInfo.email });
    }
  }, [userInfo, reset]);

  if (!session) {
    return (
      <div>
        <p>You are not logged in.</p>
        <a href="/api/auth/signin">Sign in</a>
      </div>
    );
  }

  const onSubmit = async (data: UserForm) => {
    try {
      await updateUser({ id: userId, data });
      toast('User Modified Successfully.');
    } catch {
      toast('Modifying User Failed.');
    }
  };

  return (
    <div className="flex dark:text-black bg-gradient-to-tr from-gray-100 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-[#212226] items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded">
        <p>Signed in as {session?.user.email} {session?.user.id}</p>
        <h1 className="text-4xl font-bold pb-8">Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="items-center justify-center">
            <div>
              <input
                className="border dark:border-[#9d9fa9] rounded p-2 mb-4 w-sm"
                placeholder="Name"
                {...register('name')}
              />
            </div>
            <div>
              <input
                className="border dark:border-[#9d9fa9] rounded p-2 mb-4 w-sm"
                placeholder="Email"
                {...register('email')}
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
