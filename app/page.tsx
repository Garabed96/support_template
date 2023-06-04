"use client";
import Layout from "../components/layout";
import React from "react";
import LandingPage from "./LandingPage";

// TODO: Fix White flash
// https://stackoverflow.com/questions/70297964/next-js-how-to-prevent-flash-of-the-unauthorized-route-page-prior-to-redirect-w
export default function Home() {
  return (
    <main>
      <Layout>
        <LandingPage />
      </Layout>
    </main>
  );
}
