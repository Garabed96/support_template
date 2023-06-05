import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(response) {
  const supabase = createRouteHandlerClient({ cookies });

  const data = {
    // Provide the data for the ticket_support table
    // Replace the properties below with your actual form data
    discordAccount: "JohnDoe#1234",
    refId: "ABC123",
    hashcode: "xyz987",
    ticketType: "Status Update",
    message: "This is a test message",
  };

  try {
    // Insert the data into the ticket_support table
    const { data: insertedData, error } = await supabase
      .from("support_ticket")
      .insert([data]);

    if (error) {
      console.error("Error inserting data:", error);
      return new Response("Error inserting data", { status: 500 });
    }

    console.log("Inserted data:", insertedData);

    return new Response("Data inserted successfully", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response("Error occurred", { status: 500 });
  }
}
