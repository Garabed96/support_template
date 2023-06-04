"use client";
import { Profile } from "../../../supabase-nextjs-server-auth/types/collections";
import { Session } from "@supabase/supabase-js";
import { redirect, useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import useSWR from "swr";
import { useSupabase } from "./supabase-provider";
// import { NextApiRequest, NextApiResponse } from "next";
import { GET } from "@/app/auth/login/route";
// import { SignIn } from "@/components/userActions/signin";
interface ContextI {
  user: Profile | null | undefined;
  error: any;
  isLoading: boolean;
  mutate: any;
  signOut: () => Promise<void>;
  signInWithDiscord: () => Promise<void>;
}
const Context = createContext<ContextI>({
  user: null,
  error: null,
  isLoading: true,
  mutate: null,
  signOut: async () => {},
  signInWithDiscord: async () => {},
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const getSession = async () => {
    console.log("DOES THIS EVEN RUN");
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log("wtf is this shit session??", error);
    } else {
      console.log("DISCORD DATA:", data);
    }
  };

  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(serverSession ? "profile-context" : null, getSession);

  // Sign Out
  const signOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the endpoint");
      }

      const data = await response.json();
      // Handle the retrieved data here
      console.log(data);
      router.push("/");
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  // const signInWithDiscord = async () => {
  //   await SignIn();
  // };
  // Sign-In with Discord
  const signInWithDiscord = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the endpoint");
      }
      if (response) {
        const data = await response.json();
        // Handle the retrieved data here
        console.log(data);
        router.push(data.url);
      }
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverSession?.access_token) {
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase, serverSession?.access_token]);

  const exposed: {
    isLoading: boolean;
    mutate: (
      data?: Promise<void | undefined> | MutatorCallback<void> | void,
      opts?: boolean | MutatorOptions<void>
    ) => Promise<void | undefined>;
    signInWithDiscord: () => Promise<void>;
    signOut: () => Promise<void>;
    error: any;
    user: void | undefined;
  } = {
    user,
    error,
    isLoading,
    mutate,
    signOut,
    signInWithDiscord,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};

//
// export async function handler() {
