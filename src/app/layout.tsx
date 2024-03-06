"use client";
import NextAuthSessionProvider from "@/providers/sessionProvider";
import { QueryClientProviderWrapper } from "@/utils/reactQueryConfig";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
