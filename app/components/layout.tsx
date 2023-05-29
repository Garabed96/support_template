import React from "react";
// import NavBar from "./header/NavBar";
// import Footer from "./Footer/Footer";
import { Box, Flex } from "@chakra-ui/react";
import dynamic from "next/dynamic";
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
      <Footer />
    </Flex>
  );
}
