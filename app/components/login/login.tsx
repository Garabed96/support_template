import React from "react";
import { useSupabase } from "../../supabase-context";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useUser } from "@supabase/auth-helpers-react";

export function Login() {
  const { supabase } = useSupabase();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = pathname + searchParams.toString();
  const redirectUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth?returnUrl=${returnUrl}`;
  const user = useUser();

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
