import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { getPagination } from "@/utils/helper/pagination";
export async function GET(request: Request, response: Response) {
  const supabase = createRouteHandlerClient({ cookies });
  const { from, to } = getPagination(1);
  const { data, error, count } = await supabase
    .from("support_ticket")
    .select("*", { count: "exact" })
    .order("id", { ascending: true })
    .range(from, to);
  if (error) {
    return NextResponse.json({ error: error.message });
  }
  if (data) {
    return NextResponse.json({ success: true, count });
  }
}
