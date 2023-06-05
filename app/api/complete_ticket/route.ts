import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export async function POST(request: Request, response: Response) {
  const supabase = createRouteHandlerClient({ cookies });
  const complete_ticket = await request.json();
  console.log("complete_ticket:", complete_ticket);
  const { admin_comments, id } = complete_ticket;
  console.log("admin_comments:", admin_comments);
  console.log("id:", id);

  let { data, error } = await supabase
    .from("support_ticket")
    .update({ is_complete: true, admin_comments: admin_comments }) // Update both columns
    .match({ id: id });
  if (error) {
    return NextResponse.json({ error: "WTF?" });
  }
  if (data) {
    return NextResponse.json({
      message: "Successfully POST, completed ticket",
    });
  }
}
