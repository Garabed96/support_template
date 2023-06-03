import React from "react";
import { createClient } from "@/utils/supabase-browser";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export default async function CustomerTickets() {
  const supabase = createClient();

  const { data } = await supabase.from("support_ticket").select();

  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Created At</Th>
          <Th>Ref ID</Th>
          <Th>BTC Txn Hash</Th>
          <Th>Ticket Type</Th>
          <Th>Message</Th>
          <Th>Updated At</Th>
          <Th>Discord ID</Th>
          <Th>Is Complete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((ticket) => (
          <Tr key={ticket.id}>
            <Td>{ticket.id}</Td>
            <Td>{ticket.created_at}</Td>
            <Td>{ticket.ref_id}</Td>
            <Td>{ticket.btc_txn_hash}</Td>
            <Td>{ticket.ticket_type}</Td>
            <Td>{ticket.message}</Td>
            <Td>{ticket.updated_at}</Td>
            <Td>{ticket.discord_id}</Td>
            <Td>{ticket.is_complete.toString()}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
