import { Database } from "@/types/supabase";
import {
  createClientComponentClient,
  createPagesBrowserClient,
} from "@supabase/auth-helpers-nextjs";

// export const createClient = () => createPagesBrowserClient<Database>();

export const createClient = () =>
  createClientComponentClient({ isSingleton: false });

// creating additional export because I don't want to modify all the imports cause issues, etc
// TODO: Look over this file at a later time and maybe refactor to one createClient with params (supabaseURL, supabaseKey?)
// export const createDevClient = () =>
//   createPagesBrowserClient<Database>(
//     process.env.DEV_SUPABASE_URL,
//     process.env.DEV_SUPABASE_ANON_KEY
//   );
