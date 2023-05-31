import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function signout() {
  const supabase = createClientComponentClient();
  const { error } = await supabase.auth.signOut();
}
