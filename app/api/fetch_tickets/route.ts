import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { getPagination } from "@/utils/helper/pagination";
export async function GET(request: Request, response: Response) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const page_size = searchParams.get("page_size");
  const { from, to } = getPagination(page, page_size);
  let { data, error } = await supabase
    .from("support_ticket")
    .select()
    .range(from, to);
  if (error) {
    return NextResponse.json({ error: error.message });
  }
  if (data) {
    return NextResponse.json({ success: true, data });
  }
}
