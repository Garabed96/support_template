"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/app/utils/supabase";

type Support_Ticket = {
  id: string;
  created_at: string;
  ref_id: string;
  discord_name: string;
  email: string;
  name: string;
  eth_txn_hash: string;
  btc_txn_hash: string;
  ticket_type: string;
  message: string;
  updated_at: string;
  discord_id: string;
  ticket_number: number;
  user_id: string;
  is_complete: boolean;
};
export default function RealTimePosts({
  Support_Ticket,
}: {
  Support_Ticket: Support_Ticket[];
}) {
  const [tickets, setTickets] = useState(Support_Ticket);
  useEffect(() => {
    const channel = supabase
      .channel("realtime tickets")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "support_ticket",
        },
        (payload) => {
          setTickets([...tickets, payload.new as Support_Ticket]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Unsubscribe from the channel when the component is unmounted
    };
  }, [supabase, tickets, setTickets]);

  return <div>{JSON.stringify(tickets, null, 2)}</div>;
}
