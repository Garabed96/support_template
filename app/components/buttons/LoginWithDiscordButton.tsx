import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { memo } from "react";
import supabase from "@/app/components/utils/supabase";
const LoginWithDiscordButton: React.FC = memo(({}) => {
  const user = useUser();

  return user ? null : (
    <Button
      w="full"
      rounded="sm"
      variant="outline"
      rightIcon={<ArrowForwardIcon />}
      _hover={{ bg: "green.900" }}
      onClick={() =>
        supabase.auth.signInWithOAuth({
          provider: "discord",
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
            scopes: "identify guilds email",
          },
        })
      }
    >
      Login with Discord
    </Button>
  );
});

export default LoginWithDiscordButton;
