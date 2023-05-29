import React from "react";
// import NavBar from "./Header/NavBar";
// import Footer from "./Footer/Footer";
import { Box, Flex, Text, Spacer } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useColorModeValue } from "@chakra-ui/color-mode";
const NavBar = dynamic(() => import("./Header/NavBar"));
const Footer = dynamic(() => import("./Footer/Footer"));

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
