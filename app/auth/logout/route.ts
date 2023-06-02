import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();

  // Return a response indicating successful sign-out
  return NextResponse.json({ message: "Sign-out successful" });
}
