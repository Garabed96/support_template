import React from "react";
import supabase from "@/app/utils/supabase";
import { notFound } from "next/navigation";
import RealTimeTicket from "@/app/realtime/realtime-posts";
export const revalidate = 60;

export async function generateStaticParams() {
  const { data: posts } = await supabase.from("support_ticket").select("id");
  return posts ?? [];
}

// Return support Tickets based on support_ticket ID -> // d762fb34-cb59-4fc6-b17f-f7d79d9c1462
export default async function Post({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: ticket } = await supabase
    .from("support_ticket")
    .select()
    .match({ id })
    .single();
  if (!ticket) {
    console.log("NOT FOUND");
    notFound();
  }
  return <RealTimeTicket Support_Ticket={ticket} />;
}
