import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// export const createClient = () => createPagesBrowserClient<Database>();

export const createClient = () =>
  createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    isSingleton: false,
  });

export const createDevClient = () =>
  createClientComponentClient({
    supabaseUrl: process.env.DEV_SUPABASE_URL,
    supabaseKey: process.env.DEV_SUPABASE_ANON_KEY,
    isSingleton: false,
  });
