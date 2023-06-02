"use client";

import React, { useEffect, useState } from "react";
import supabase from "@/utils/supabase";

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

// Filter settings for updating on INSERT
// {
//   event: "INSERT",
//       schema: "public",
//     table: "support_ticket",
// },
//          setTicket([...ticket, payload.new as Support_Ticket]);

// example url http://localhost:3000/realtime/cb9cfc36-4441-4ab4-be60-ff176d5bb26b
export default function RealTimeTicket({
  Support_Ticket,
}: {
  Support_Ticket: Support_Ticket[];
}) {
  const [ticket, setTicket] = useState(Support_Ticket);
  useEffect(() => {
    const channel = supabase
      .channel("realtime tickets")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "support_ticket",
          filter: `id=eq.${ticket.id}`,
        },
        (payload) => {
          setTicket(payload.new as Support_Ticket);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Unsubscribe from the channel when the component is unmounted
    };
  }, [supabase, ticket, setTicket]);

  return <div>{JSON.stringify(ticket, null, 2)}</div>;
}
