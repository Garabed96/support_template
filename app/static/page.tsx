import React from "react";
import { createClient } from "@/utils/supabase-browser";

export const revalidate = 60;

export default async function Posts() {
  const supabase = createClient();
  const { data } = await supabase.from("support_ticket").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
