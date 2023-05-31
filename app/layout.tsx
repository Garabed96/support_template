"use client";
import { Inter } from "next/font/google";
import Head from "./head";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./../theme";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import React from "react";
import SupabaseProvider from "@/app/supabase-context";

// Root layout is required
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <SupabaseProvider>
          <ChakraProvider theme={theme}>{children} </ChakraProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
