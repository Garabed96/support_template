import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icon";
import { Flex, Text } from "@chakra-ui/layout";
import { RiDiscordFill } from "@react-icons/all-files/ri/RiDiscordFill";
import { AiFillTwitterCircle } from "@react-icons/all-files/ai/AiFillTwitterCircle";
import React from "react";
import { Tooltip } from "@chakra-ui/tooltip";

const appVersion = require("../../../package.json").version;

function Footer(props) {
  const textColor = useColorModeValue("gray.900", "white");
  const bgColor = useColorModeValue("white", "black");
  return (
    <Flex
      w="full"
      p={2}
      pos="fixed"
      bottom={0}
      borderTop="2px solid"
      borderColor="whiteAlpha.200"
      zIndex={999}
      align="center" // Align children vertically center
    >
      <Text color={textColor}>v{appVersion}</Text>
      <Tooltip label="Join our Discord!" hasArrow>
        <IconButton
          aria-label="Discord Button"
          rounded="full"
          variant="ghost"
          icon={<RiDiscordFill />}
          onClick={() => window.open("", "_blank")}
        />
      </Tooltip>
      <Tooltip label="Follow us on Twitter!" hasArrow>
        <IconButton
          ml={2}
          aria-label="Twitter Button"
          rounded="full"
          variant="ghost"
          icon={<AiFillTwitterCircle />}
          onClick={() => window.open("", "_blank")}
        />
      </Tooltip>
    </Flex>
  );
}

export default Footer;
