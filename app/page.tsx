"use client";
import Layout from "../components/layout";
import React from "react";
import LandingPage from "./LandingPage";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./../theme";

export default function Home() {
  return (
    <main>
      <ChakraProvider theme={theme}>
        <Layout>
          <LandingPage />
        </Layout>
      </ChakraProvider>
    </main>
  );
}
