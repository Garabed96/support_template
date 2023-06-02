import supabase from "@/utils/supabase";

import React from "react";
import RealTimeTicket from "@/app/realtime/realtime-posts";
// https://youtu.be/YR-xP6PPXXA?list=PL5S4mPUpp4OuMkz8qqJpiTSaX9Fp0429T&t=293
export const revalidate = 0;

export default async function Posts() {
  const { data } = await supabase.from("support_ticket").select();

  return <RealTimeTicket Support_Ticket={data ?? []} />;
}
