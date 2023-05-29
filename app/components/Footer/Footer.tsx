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
const MyTooltip = dynamic(() => import("../Tooltips/MyTooltip"));

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
      bgColor={bgColor}
      zIndex={999}
    >
      <Text color={textColor}>v{appVersion}</Text>
      <MyTooltip label="Join our Discord!" hasArrow>
        <IconButton
          aria-label="Discord Button"
          rounded="full"
          variant="ghost"
          icon={<RiDiscordFill />}
          onClick={() => window.open("", "_blank")}
        />
      </MyTooltip>
      <MyTooltip label="Follow us on Twitter!" hasArrow>
        <IconButton
          ml={2}
          aria-label="Twitter Button"
          rounded="full"
          variant="ghost"
          icon={<AiFillTwitterCircle />}
          onClick={() => window.open("", "_blank")}
        />
      </MyTooltip>
    </Flex>
  );
}

export default Footer;
