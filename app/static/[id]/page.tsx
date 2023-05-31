import React from "react";
import supabase from "@/app/utils/supabase";
import { notFound } from "next/navigation";

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
  const { data: post } = await supabase
    .from("support_ticket")
    .select()
    .match({ id })
    .single();
  if (!post) {
    console.log("NOT FOUND");
    notFound();
  }
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
}
//
// const { data, error } = await supabase
//     .from("Blog")
//     .select(`*, Images(image_url, image_id)`)
//     .eq("slug", slug);
// this was the fix, I had this in another file but I was being braindead:
//     const { data, error } = await supabase
//         .from("Blog")
//         .select(`*, Images(image_url, image_id)`);
