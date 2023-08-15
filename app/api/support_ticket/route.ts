import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  let { data, error } = await supabase.from("support_ticket").upsert(formData);
  if (data) {
  } else if (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
  return new NextResponse(
    JSON.stringify({
      message: "Successful POST to support_ticket",
    })
  );
}
