import { createClient } from "@supabase/supabase-js";

// export const createDevClient = createClient(
//   "https://uqjaafwixxfkxglitsbn.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxamFhZndpeHhma3hnbGl0c2JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYzMzczNTQsImV4cCI6MTk5MTkxMzM1NH0.CrHInVm6qh6BSFFSW3hRl-ElFnZ-3MfbOoC8Bzd_mgA"
// );
export const createDevClient = createClient(
  process.env.NEXT_PUBLIC_DEV_URL,
  process.env.NEXT_PUBLIC_DEV_KEY
);
