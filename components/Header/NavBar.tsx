"use client";
import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { ChevronDownIcon, Icon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import {
  Flex,
  Spacer,
  Box,
  Heading,
  ButtonGroup,
  Divider,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";
import { isMobile } from "../../utils/screen/conditions";
import { SignOutButton } from "@/components/userActions/signout";
import { useRouter } from "next/navigation";
import { SignInWithDiscord } from "@/components/userActions/signin";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

const NavBar = () => {
  // Q: This is another way of importing SupaBase, is it better than just doing the standard createClient in utils/supabase.ts ?
  // const supabase = useSupabaseClient();
  // const variant = useBreakpointValue({
  //   sm: "sm",
  //   md: "md",
  //   lg: "lg",
  //   xl: "xl",
  // });
  // https://tanstack.com/query/latest/docs/react/overview
  // https://trpc.io/docs/nextjs/setup
  const [user, setUser] = useState<Object | null>(null);

  const [supabase] = useState(() => createPagesBrowserClient());
  const router = useRouter();
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // refresh data
      // console.log(session);
      setUser(session?.user);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);
  // pull session data

  const [username, setUsername] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
    setUsername(user?.user_metadata?.name);
    setUserAvatar(user?.user_metadata?.avatar_url);
    if (user == null) {
    }
  }, [user]);

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" py="2">
      <Box px="4">
        <Heading>
          <Link href="/">
            <Image src={"/logos/primary-logo.svg"} maxW={110} alt="logo" />
          </Link>
        </Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="4" px="4">
        <Box w="50%" rounded="md" variant="outline">
          <Link href="/faq">
            <Button
              w="full"
              rounded="sm"
              variant="outline"
              _hover={{ bg: "blue.900" }}
              rightIcon={<QuestionIcon />}
            >
              FAQ
            </Button>
          </Link>
        </Box>
        {username ? (
          <Menu>
            <MenuButton
              as={Button}
              w="full"
              fontSize="sm"
              rounded="sm"
              fontWeight="bold"
              variant="outline"
              rightIcon={<ChevronDownIcon />}
            >
              <Flex justify="center" align="center" gap="0.5rem">
                <Avatar size="xs" src={userAvatar} />
                <Text>{username}</Text>
                {/*{isMobile(variant) ? null : <Text>{username}</Text>}*/}
              </Flex>
            </MenuButton>
            <MenuList bgColor="black" fontSize="sm" zIndex={2}>
              <Text
                mt={-2}
                px={2}
                py={1}
                fontSize="xs"
                color="whiteAlpha.700"
                bgColor="whiteAlpha.100"
              >
                <i>signed in as: {username}</i>
              </Text>
              <Divider mb={2} />
              <MenuItem bgColor="black">
                <SignOutButton />
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          // <Login />
          <SignInWithDiscord />
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default NavBar;
