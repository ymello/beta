import axiosInstance from "@/utils/axiosConfig";
import NextAuth from "next-auth";
import CredencialsProvider from "next-auth/providers/credentials";

const nextAuthOptions = {
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
    async jwt({ token, user }: any) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }: any) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
