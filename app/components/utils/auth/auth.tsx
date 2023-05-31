// DOCS: https://supabase.com/docs/guides/auth/auth-helpers/nextjs?utm_source=youtube&utm_medium=referral&utm_campaign=nextjs-supabase
"use client";
import { Heading, Text, VStack } from "@chakra-ui/layout";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useGetStringId } from "../router/useGetStringId";

const Redirect: React.FC = ({}) => {
  const pathname = usePathname();
  const supabase = useSupabaseClient();
  const returnUrl = useGetStringId(pathname);
  const user = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log("DOES AUTH RUN?");
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

export default Redirect;
