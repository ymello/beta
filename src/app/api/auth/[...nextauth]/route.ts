import axiosInstance from "@/utils/axiosConfig";
import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredencialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  providers: [
    CredencialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const response = await axiosInstance.post("/auth/login", credentials);

          if (!response.data.token) {
            throw new Error("Falha ao fazer login");
          }

          return response.data;
        } catch (error) {
          throw new Error("Falha ao fazer login");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
