import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; 
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
        });

        if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
            return null;
        }

        return {
            id: user.id,
            role: user.role,
            name: user.name,
        }

        },
    }),
    /////////////////////////////////// The below code for phone auth //////////////////////////////////////
    // CredentialsProvider({
    //     id: "phone",
    //     name: "Phone",
    //     credentials: {
    //         phone: { label: "Phone", type: "text" },
    //         code: { label: "Code", type: "text" },
    //     },
    //     async authorize(credentials) {
    //         if (!credentials?.phone || !credentials?.code) {
    //         throw new Error("Missing phone or code");
    //         }

    //         // 1. Find user by phone number
    //         const user = await prisma.user.findUnique({
    //         where: { phone: credentials.phone },
    //         });

    //         if (!user) throw new Error("No user found");

    //         // 2. Check if the code matches (you should store + expire this securely)
    //         const valid = await checkOtpCode(credentials.phone, credentials.code);
    //         if (!valid) throw new Error("Invalid code");

    //         // return user;

    //         return {
    //             id: user.id,
    //             role: user.role,
    //         };
    //     }
    //     }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/verify"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
  },
}