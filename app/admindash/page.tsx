"use client";
import Layout from "../../components/layout";
import React from "react";
import { useUser } from "@supabase/auth-helpers-react";
import CustomerTickets from "@/app/admindash/customerTickets";
const Page = () => {
  const user = useUser();

  return (
    <Layout>
      <div display="flex" flexDirection="column" alignItems="center" mt={4}>
        Welcome to your DASHBOARD, ADMIN NAME
        <CustomerTickets />
      </div>
    </Layout>
  );
  // return <Layout>Welcome to your DASHBOARD, user</Layout>;
};

export default Page;
