import React from "react";
// import NavBar from "./header/NavBar";
// import Footer from "./Footer/Footer";
import { Box, Flex } from "@chakra-ui/react";
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
    <Flex direction="column" minHeight="80vh">
      <NavBar />
      <Box flex="1">{children}</Box>
      <Box
        bg="black"
        py="4"
        as="footer"
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        justifyContent="center"
        alignItems="center"
        gap="6"
        py="4"
        bg={useColorModeValue("white", "gray.800")}
        zIndex="9999"
      >
        {" "}
        {/* Apply black background color around the footer */}
        <Footer />
      </Box>
    </Flex>
  );
}
