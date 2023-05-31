import { Heading, Text, VStack } from "@chakra-ui/layout";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const AuthServerRedirect: React.FC = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnUrl = pathname + searchParams.toString();
  const user = useUser();

  useEffect(() => {
    if (user?.user_metadata) {
      supabase
        .from("user")
        .upsert(
          {
            discord_username: user.user_metadata.name,
            discord_id: user.user_metadata.provider_id,
            email: user.email,
          },
          { onConflict: "discord_id" }
        )
        .select("user_id")
        .single()
        .then(({ data, error }) => {
          if (error || !data) {
            if (returnUrl) {
              router.replace(returnUrl);
            }
            return null;
          }

          return data;
        });
    }
  }, [user, returnUrl]);

  return (
    <div title="Login Redirect" variant="small">
      {user ? (
        <VStack>
          <Heading>Redirecting</Heading>
          <Text color="whiteAlpha.700">
            You will be redirected in a moment ...
          </Text>
        </VStack>
      ) : (
        <VStack mt="4rem" spacing={8}>
          <Heading>You are not logged in.</Heading>
          <LoginWithDiscordButton />
        </VStack>
      )}
    </div>
  );
};

export default AuthServerRedirect;
