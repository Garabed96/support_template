"use client";
import Layout from "./components/layout";
import React from "react";
import LandingPage from "./LandingPage";
import { Login } from "./components/login/login";
export default function Home() {
  return (
    <main>
      <Layout>
        <LandingPage />
        <Login />
      </Layout>
    </main>
  );
}
