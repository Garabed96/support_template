"use client";
import Layout from "../../components/layout";
import React, { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import AdminDashboard from "@/app/admindash/admin-dashboard";
import { Flex } from "@chakra-ui/react";
import { supportClient } from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

const Page = () => {
  const supabase = supportClient();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .single();
      if (profile) {
        setUser(profile);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!loading && user?.role !== "admin") {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) {
    return null; // Render nothing while loading
  }

  if (user?.role !== "admin") {
    return router.push("/");
  }
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
