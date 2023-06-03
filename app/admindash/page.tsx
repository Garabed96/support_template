"use client";
import Layout from "../../components/layout";
import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import CustomerTickets from "@/app/admindash/customerTickets";
import { Flex } from "@chakra-ui/react";

const Page = () => {
  return (
    <Layout>
      <Flex
        minHeight="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt={24}
        pb={8}
      >
        Welcome to your DASHBOARD, ADMIN NAME
        <CustomerTickets />
      </Flex>
    </Layout>
  );
  // return <Layout>Welcome to your DASHBOARD, user</Layout>;
};

export default Page;
