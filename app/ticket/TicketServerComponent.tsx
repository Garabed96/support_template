// Server component by default
// https://supabase.com/docs/guides/auth/auth-helpers/nextjs
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

export default async function configComponent() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.from("support_ticket").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
// process.env.NEXT_PUBLIC_SUPABASE_URL!,
// process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// const supabase_pass = "Ra1FV9UlHXaSTlsa";
// const discord_application_id = "1112818740506140774";
// const discord_public_key =
//   "0fe44ec19e32f493113615edea21bd36b9b0e4e482ee6311cde5b59eb1603334";
