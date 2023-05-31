import React from "react";
import { useSupabase } from "../../supabase-context";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function Login() {
  const { supabase } = useSupabase();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = pathname + searchParams.toString();
  const redirectUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth?returnUrl=${returnUrl}`;

  const signInWithDiscord = () =>
    supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: redirectUrl,
        scopes: "identify guilds email",
      },
    });

  const signOut = () => {
    supabase.auth.signOut();
  };
}
