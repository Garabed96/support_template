import React from "react";
import { supportClient } from "@/utils/supabase-browser";

export default async function Posts() {
  const supabase = supportClient();

  const { data } = await supabase.from("support_ticket").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
