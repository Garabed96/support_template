import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request, response: Response) {
  const supabase = createRouteHandlerClient({ cookies });
  const complete_ticket = await request.json();
  console.log("complete_ticket:", complete_ticket);
  const { admin_comments, id } = complete_ticket;
  try {
    const { data, error } = await supabase
      .from("support_ticket")
      .update({ is_complete: true, admin_comments: admin_comments })
      .match({ id: id });

    if (error) {
      return NextResponse.json({
        error: "An error occurred while updating the ticket.",
      });
    }

    return NextResponse.json({
      message: "Successfully POST, completed ticket",
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      error: "An error occurred while processing the request.",
    });
  }
}
