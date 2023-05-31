import React from "react";
import supabase from "@/app/utils/supabase";

export default async function Posts() {
  const { data } = await supabase.from("support_ticket").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
