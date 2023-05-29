"use client";
// import "./globals.css";
import { Inter } from "next/font/google";
import Head from "./head";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Footer/Footer";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
