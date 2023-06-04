import "server-only";
import Head from "./head";
import theme from "./../theme";
import React from "react";
import SupabaseProvider from "@/components/providers/supabase-provider";
import SupabaseAuthProvider from "@/components/providers/supabase-auth-provider";
import { supportClient } from "@/utils/supabase-browser";
import { Inter } from "next/font/google";

// Root layout is required
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supportClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <html lang="en">
      <Head />
      <body>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            {children}
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
