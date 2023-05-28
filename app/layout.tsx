// import "./globals.css";
// import { Inter } from "next/font/google";
import Head from "./head";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import React from "react";
// const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "OrdKit - Support",
  description: "Ordkit support ticket app",
};
// Root layout is required
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*<body className={inter.className}>*/}

      <Head />
      <body>
        {children}
        {/*<Footer />*/}
      </body>
    </html>
  );
}
