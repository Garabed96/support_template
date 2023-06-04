import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import "server-only";

import { Database } from "@/types/supabase";

export const createClient = () => {
  createServerComponentClient<Database>({
    cookies,
  });
};

export const createDevClient = () =>
  createServerComponentClient<Database>(
    process.env.DEV_SUPABASE_URL,
    process.env.DEV_SUPABASE_ANON_KEY
  );
