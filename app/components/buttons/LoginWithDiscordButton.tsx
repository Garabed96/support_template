import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const LoginWithDiscordButton: React.FC = memo(({}) => {
  const pathname = usePathname();
  const supabase = createClientComponentClient();
  const user = useUser();

  const returnUrl = pathname;

  return user ? null : (
    <Button
      w="100%"
      rounded="sm"
      variant="outline"
      rightIcon={<ArrowForwardIcon />}
      _hover={{ bg: "green.900" }}
      onClick={() =>
        supabase.auth.signInWithOAuth({
          provider: "discord",
          options: {
            redirectTo: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth?returnUrl=${returnUrl}`,
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
