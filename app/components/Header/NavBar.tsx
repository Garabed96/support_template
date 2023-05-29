import React from "react";
import { Image } from "@chakra-ui/image";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { Flex, Spacer, Box, Heading, ButtonGroup } from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";

function NavBar() {
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
        <Button
          w="full"
          rounded="sm"
          variant="outline"
          _hover={{ bg: "green.900" }}
          rightIcon={<ArrowForwardIcon />}
        >
          Login with Discord
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default NavBar;
