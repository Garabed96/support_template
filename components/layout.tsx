import React from "react";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";
import NavBar from "./Header/NavBar";
import Footer from "./Footer/Footer";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NavBar />
        {children}
        <Footer />
      </ChakraProvider>
    </div>
  );
}
