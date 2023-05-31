"use client";
import Layout from "../components/layout";
import React from "react";
import AuthServerComponent from "@/app/auth/AuthServerComponent";
const Page = () => {
  return (
    <Layout>
      <AuthServerComponent />
    </Layout>
  );
};

export default Page;
