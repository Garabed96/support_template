"use client";
import Layout from "../../components/layout";
import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import AdminDashboard from "@/app/admindash/admin-dashboard";
import { Flex } from "@chakra-ui/react";
import { supportClient } from "@/utils/supabase-browser";

const Page = () => {
  const supabase = supportClient();
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .single();
      if (profile) {
        setUser(profile);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Layout>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Flex
        minHeight="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        pt={24}
        pb={8}
      >
        Welcome to your DASHBOARD, ADMIN NAME
        <AdminDashboard />
      </Flex>
    </Layout>
  );
};

export default Page;
