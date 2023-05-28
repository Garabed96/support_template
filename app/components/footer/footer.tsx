import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Icon } from "@chakra-ui/icon";
import { Center, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { AiFillTwitterCircle } from "@react-icons/all-files/ai/AiFillTwitterCircle";
import { FaBitcoin } from "@react-icons/all-files/fa/FaBitcoin";
import { RiDiscordFill } from "@react-icons/all-files/ri/RiDiscordFill";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { memo, useEffect, useState } from "react";
import MyTooltip from "@/app/components/Tooltips/MyTooltip";
import { Tooltip } from "@chakra-ui/tooltip";

const appVersion = require("../../../package.json").version;

function Footer(props) {
  return (
    <Flex
      w="full"
      p={2}
      pos="fixed"
      bottom={0}
      borderTop="2px solid"
      borderColor="whiteAlpha.200"
      bgColor={useColorModeValue("white", "black")}
      zIndex={999}
    >
      <Spacer />

      <Text m="auto" mr={2} color="whiteAlpha.500" fontSize="xs">
        v{appVersion}
      </Text>
      <Tooltip label="discord button" message="Join our Discord!">
        <IconButton
          aria-label="Discord Button"
          rounded="full"
          variant="ghost"
          icon={<RiDiscordFill />}
          onClick={() => window.open("", "_blank")}
        />
      </Tooltip>
      <Tooltip label="twitter button" message="Follow us on Twitter!">
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
