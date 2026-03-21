import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name: string | null | undefined;
      id: string;
      email?: string;
      phone?: string;
      subscribtion?: string;
    };
  }

  interface User {
    id: string;
    email?: string;
    phone?: string;
    subscribtion?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email?: string;
    phone?: string;
    subscribtion?: string;
  }
}