import React from "react";
import { Image } from "@chakra-ui/image";
import ordLogo from "../../../public/logos/primary-logo.svg";
import { Button } from "@chakra-ui/button";
import { Flex, Spacer, Box, Heading, ButtonGroup } from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";

function NavBar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" py="2">
      <Box px="4">
        <Heading size="md">
          <Image src={"/logos/primary-logo.svg"} maxW={110} alt="logo" />
        </Heading>
      </Box>
      <Spacer />
      <ButtonGroup gap="4" px="4">
        <Button
          w="50%"
          rounded="md"
          variant="outline"
          rightIcon={<QuestionIcon />}
        >
          FAQ
        </Button>
        <Button
          w="full"
          rounded="md"
          variant="outline"
          rightIcon={<ArrowForwardIcon />}
        >
          Login with Discord
        </Button>
      </ButtonGroup>
    </Flex>
  );
}

export default NavBar;
