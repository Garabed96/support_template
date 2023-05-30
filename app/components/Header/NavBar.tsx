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
import LoginWithDiscordButton from "@/app/components/buttons/LoginWithDiscordButton";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { isMobile } from "../utils/screen/conditions";

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
  const [username, setUsername] = useState<string | null>(null);
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
  const user = useUser();

  useEffect(() => {
    setUsername(user?.user_metadata?.name);
    setUserAvatar(user?.user_metadata?.avatar_url);
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
              <MenuItem bgColor="black" onClick={() => console.log("SIGN OUT")}>
                Sign Out
                <Text ml={2}>Sign Out</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <LoginWithDiscordButton />
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default NavBar;
