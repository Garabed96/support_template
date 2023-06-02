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
  useDisclosure,
  Divider,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";
import { useUser } from "@supabase/auth-helpers-react";
import { isMobile } from "../../utils/screen/conditions";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "../providers/supabase-auth-provider";
import { SignOutButton } from "@/components/userActions/signout";
//https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks
const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Q: This is another way of importing SupaBase, is it better than just doing the standard createClient in utils/supabase.ts ?
  // const supabase = useSupabaseClient();
  const variant = useBreakpointValue({
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });
  // https://tanstack.com/query/latest/docs/react/overview
  // https://trpc.io/docs/nextjs/setup
  const [user, setUser] = useState<Object | null>(null);
  useEffect(() => {
    const sessionData = async () => {
      try {
        const response = await fetch("http://localhost:3000/discord", {
          method: "GET",
        });
        if (!response.ok) {
          console.log("RUNNING");
          throw new Error("Failed to fetch data from the endpoint");
        } else if (response) {
          const session = await response.json();
          // Handle the retrieved data here

          console.log("SESSION", session.session.user);
          setUser(session.session.user);
        }
      } catch (error) {
        // Handle the error here
        console.error(error);
      }
    };
    sessionData();
  }, []);
  // pull session data

  const [username, setUsername] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log("metadata", user?.user_metadata?.name);
    console.log("metadata", user?.user_metadata?.avatar_url);
    setUsername(user?.user_metadata?.name);
    setUserAvatar(user?.user_metadata?.avatar_url);

    console.log("user:", user);
  }, [user]);

  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" py="2">
      <Box px="4">
        <Heading>
          <Link href="/app/static">
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
              fontSize="sm"
              fontWeight="bold"
              variant="outline"
              rightIcon={<ChevronDownIcon />}
            >
              <Flex justify="center" align="center" gap="0.5rem">
                <Avatar size="xs" src={userAvatar} />
                {isMobile(variant) ? null : <Text>{username}</Text>}
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
          <button>Empty login placeholder</button>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default NavBar;
