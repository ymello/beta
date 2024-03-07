"use client";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { QueryClientProviderWrapper } from "@/utils/reactQueryConfig";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    redirect("/");
  }

  return (
    <html lang="pt-BR">
      <body>
        <QueryClientProviderWrapper>
          <NextAuthSessionProvider>
            <Header loggedIn={true} />
            {children}
            <Footer />
          </NextAuthSessionProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
