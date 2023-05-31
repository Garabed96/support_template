"use client";
import React from "react";
import { useSupabase } from "../../supabase-context";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useUser } from "@supabase/auth-helpers-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export function Login() {
  const { supabase } = useSupabase();
  const router = useRouter();

  // const redirectUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth?returnUrl=${returnUrl}`;
  const redirectUrl = `${location.origin}/auth/callback`;
  const user = useUser();

  const signInWithDiscord = () => {
    supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: redirectUrl,
        scopes: "identify guilds email",
      },
    });
    router.refresh();
  };

  const signOut = () => {
    supabase.auth.signOut();
  };

  return user ? null : (
    <Button
      w="100%"
      rounded="sm"
      variant="outline"
      rightIcon={<ArrowForwardIcon />}
      _hover={{ bg: "green.900" }}
      onClick={() => signInWithDiscord()}
    >
      Login with Discord
    </Button>
  );
}
