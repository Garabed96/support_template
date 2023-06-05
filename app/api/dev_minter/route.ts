import { createDevClient } from "@/utils/supabase-dev";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createDevClient;
  const { minter_discord_id } = request.json(); // Retrieve the minter_discord_id from the request query parameters
  let { data, error } = await supabase
    .from("minter")
    .select("minter_discord_id")
    .eq("minter_discord_id", minter_discord_id);
  if (data) {
  } else if (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
  return new NextResponse(
    JSON.stringify({
      message: "Successful MATCH in minter table",
    })
  );
}
