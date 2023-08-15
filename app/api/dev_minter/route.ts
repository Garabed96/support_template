import { createDevClient } from "@/utils/supabase-dev";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  // console.log("DOES THIS RUN");
  const supabase = createDevClient;
  const { minter_discord_id } = await request.json(); // Retrieve the minter_discord_id from the request query parameters
  // console.log("minters DC ID!", minter_discord_id);
  // console.log("WTF IS THIS?");
  let { data, error } = await supabase
    .from("minter")
    .select("minter_discord_id")
    .eq("minter_discord_id", minter_discord_id);

  // TODO: This shouldn't let DoomGoblin account post since the minter doesnt match
  if (data) {
    let bool_value = data.length > 0; // Set bool_value to true if data array has any matching records, false otherwise
    let message = bool_value
      ? "Successful MATCH in minter table"
      : "No match found in minter table";
    return new NextResponse(
      JSON.stringify({
        message: message,
        data: bool_value,
      })
    );
  } else if (error) {
    return new NextResponse(
      JSON.stringify({ success: false, error: error.message })
    );
  }
}
