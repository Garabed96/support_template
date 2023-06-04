"use client";
import Head from "./head";
import theme from "./../theme";
import React, { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// Root layout is required
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createPagesBrowserClient());
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // refresh data

      console.log("DOES THIS EVEN RUNNN?", subscription);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);
  return (
    <html lang="en">
      <Head />
      <body>{children}</body>
    </html>
  );
}
