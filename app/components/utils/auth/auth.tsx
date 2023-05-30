import { Heading, Text, VStack } from "@chakra-ui/layout";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useGetStringId } from "../router/useGetStringId";

const LoginWithDiscordButton = dynamic(
  () => import("../../buttons/LoginWithDiscordButton"),
  {
    ssr: false,
  }
);

const Redirect: React.FC = ({}) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const returnUrl = useGetStringId(router.query.returnUrl);
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
    <Layout title="Login Redirect" variant="small">
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
    </Layout>
  );
};

export default Redirect;
