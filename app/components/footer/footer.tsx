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
import { Tooltip } from "@chakra-ui/tooltip";

const appVersion = require("../../../package.json").version;

function Footer(props) {
  const textColor = useColorModeValue("gray.900", "white");
  return (
    <Flex alignItems="center" gap="6">
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
