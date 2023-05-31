"use client";
import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { memo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const LoginWithDiscordButton: React.FC = memo(({}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = pathname + searchParams.toString();
  const supabase = createClientComponentClient();
  const user = useUser();
  console.log("DISCORD USER", user);

  const signInWithDiscord = () =>
    supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: redirectUrl,
        scopes: "identify guilds email",
      },
    });

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
            redirectTo: redirectUrl,
            scopes: "identify guilds",
          },
        })
      }
    >
      Login with Discord
    </Button>
  );
});

export default LoginWithDiscordButton;

//https://ordkit.xyz/auth?returnUrl=/#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg1NDc3NzI4LCJzdWIiOiJlYjAxNzIzNC04YTE2LTQwMDItYjg4OC1jYTYyY2NjNTlmMmEiLCJlbWFpbCI6Imdhcm81NjdAaG90bWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImRpc2NvcmQiLCJwcm92aWRlcnMiOlsiZGlzY29yZCJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXZhdGFycy8xOTg1MDg3NDgwOTA3Njk0MDkvM2RjZmZhMDIyNDg5YjEyN2M3NDNkZTk4MTg5MDJmYTEucG5nIiwiZW1haWwiOiJnYXJvNTY3QGhvdG1haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IkRvb21Hb2JsaW4iLCJpc3MiOiJodHRwczovL2Rpc2NvcmQuY29tL2FwaSIsIm5hbWUiOiJEb29tR29ibGluIzMyODAiLCJwaWN0dXJlIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXZhdGFycy8xOTg1MDg3NDgwOTA3Njk0MDkvM2RjZmZhMDIyNDg5YjEyN2M3NDNkZTk4MTg5MDJmYTEucG5nIiwicHJvdmlkZXJfaWQiOiIxOTg1MDg3NDgwOTA3Njk0MDkiLCJzdWIiOiIxOTg1MDg3NDgwOTA3Njk0MDkifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTY4NTQ3NDEyOH1dLCJzZXNzaW9uX2lkIjoiYmRiZWQ2YTQtNWY5My00NDIyLTk2ZjQtOTA4YTAwMjAyZWUxIn0.qJni_lOvN3kdcjX7B7vAF7AxGe37vsMJ2lzpNLemZZE&expires_in=3600&provider_refresh_token=4bPEXGRMCqLYYfXWOYNApwsWfCFG02&provider_token=nvATH26tw1ElGiPklTZ1CNsxYZoT85&refresh_token=0Rz2C-97yWGzbezTivV_Wg&token_type=bearer
