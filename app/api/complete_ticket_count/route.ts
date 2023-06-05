import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPagination } from "@/utils/helper/pagination";
export async function handler(request: Request, response: Response) {
  const supabase = createRouteHandlerClient({ cookies });
  const { page, page_size } = request.query; // Assuming the formData object is passed in the request body
  console.log("PAGE AND PAGE SIZE", page, page_size);
  const { from, to } = getPagination(page, page_size);
  let { data, error, count } = await supabase
    .from("support_ticket")
    .select()
    .range(from, to);
  if (data) {
    console.log(data);
  } else if (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
  return new NextResponse(
    JSON.stringify({
      count: count,
      data: data,
      message: "Successful POST to support_ticket",
    })
  );
}
