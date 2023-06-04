"use client";
import Layout from "../components/layout";
import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import { supportClient } from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

// TODO: Fix White flash
// https://stackoverflow.com/questions/70297964/next-js-how-to-prevent-flash-of-the-unauthorized-route-page-prior-to-redirect-w
export default function Home() {
  const [supabase] = useState(() => createPagesBrowserClient());
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      // refresh data

      console.log("DOES THIS EVEN RUNNN?", subscription);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);
  return (
    <main>
      <Layout>
        <LandingPage />
      </Layout>
    </main>
  );
}
