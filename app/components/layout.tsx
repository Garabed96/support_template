import React from "react";
// import NavBar from "./header/NavBar";
// import Footer from "./Footer/Footer";
import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useColorModeValue } from "@chakra-ui/color-mode";
const NavBar = dynamic(() => import("./header/NavBar"));
const Footer = dynamic(() => import("./Footer/Footer"));

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <NavBar />
      <Box flex="1">{children}</Box>
      <Flex
        as="footer"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        justifyContent="right"
        alignItems="center"
        gap="6"
        py="4"
        px="12"
        bg={useColorModeValue("white", "gray.800")}
        zIndex="9999"
      >
        <Footer />
      </Flex>
    </Flex>
  );
}
