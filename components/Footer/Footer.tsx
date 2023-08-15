import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { RiDiscordFill } from "@react-icons/all-files/ri/RiDiscordFill";
import { AiFillTwitterCircle } from "@react-icons/all-files/ai/AiFillTwitterCircle";
import React from "react";
import { Tooltip } from "@chakra-ui/tooltip";

const appVersion = require("../../package.json").version;

function Footer(props) {
  const textColor = useColorModeValue("gray.900", "white");
  const bgColor = useColorModeValue("white", "black");
  return (
    <Flex
      w="full"
      p={4}
      pos="fixed"
      bottom={0}
      borderTop="1px solid"
      borderColor="whiteAlpha.200"
      zIndex={999}
      align="center"
      justifyContent="right"
    >
      <Text color={textColor}>v{appVersion}</Text>
      <Tooltip label="Join our Discord!" hasArrow>
        <IconButton
          ml={2}
          aria-label="Discord Button"
          rounded="full"
          variant="ghost"
          icon={<RiDiscordFill />}
          onClick={() =>
            window.open(process.env.NEXT_PUBLIC_SUPPORT_DISCORD_URL, "_blank")
          }
        />
      </Tooltip>
      <Tooltip label="Follow us on Twitter!" hasArrow>
        <IconButton
          mr={2}
          aria-label="Twitter Button"
          rounded="full"
          variant="ghost"
          icon={<AiFillTwitterCircle />}
          onClick={() =>
            window.open(process.env.NEXT_PUBLIC_SUPPORT_TWITTER_URL, "_blank")
          }
        />
      </Tooltip>
    </Flex>
  );
}

export default Footer;
