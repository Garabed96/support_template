import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const supabase = createRouteHandlerClient({ cookies });
  const refund_ticket = await request.json();
  const { admin_name, minter_ref_id } = refund_ticket;
  try {
    const { error, data } = await supabase.from("refund").upsert({
      admin_name: admin_name,
      minter_ref_id: minter_ref_id,
    }); // Update both columns

    if (error) {
      return NextResponse.json({
        error: "An error occurred while updating the ticket.",
      });
    }

    return NextResponse.json({
      message: "Successfully POST, refunded Ticket",
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      error: "An error occurred while processing the request.",
    });
  }
}
