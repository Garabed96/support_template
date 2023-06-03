import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies });

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "discord",
  });

  // URL to redirect to after sign in process completes
  return NextResponse.json(data);
}
