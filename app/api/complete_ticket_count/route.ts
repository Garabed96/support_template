import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const formData = await request.json(); // Assuming the formData object is passed in the request body
  const supabase = createRouteHandlerClient({ cookies });
  let query = supabase.from("support_ticket").select().range(from, to);
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
