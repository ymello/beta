"use client";
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
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
