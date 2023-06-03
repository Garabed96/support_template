import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase-browser";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

const PAGE_SIZE = 5; // Number of items per page

export const getPagination = (page, size) => {
  const limit = size ? +size : PAGE_SIZE;
  const from = page ? (page - 1) * limit : 0;
  const to = page ? from + limit : limit;

  return { from, to };
};

export default function CustomerTickets() {
  const supabase = createClient();
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  const fetchData = async (page) => {
    const { from, to } = getPagination(page);
    const { data: tickets } = await supabase
      .from("support_ticket")
      .select()
      .range(from, to);

    setData(tickets);
  };

  const fetchTotalCount = async () => {
    const { from, to } = getPagination(1);
    const { data, count } = await supabase
      .from("support_ticket")
      .select("*", { count: "exact" })
      .order("id", { ascending: true })
      .range(from, to);

    setTotalPages(Math.ceil(count / PAGE_SIZE));
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  useEffect(() => {
    fetchData(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    fetchTotalCount();
  }, []);

  return (
    <>
      <TableContainer>
        <Table
          variant="simple"
          p="5"
          size="lg"
          variant="striped"
          colorScheme="gray"
        >
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Created At</Th>
              <Th>Ref ID</Th>
              <Th>BTC Txn Hash</Th>
              <Th>Ticket Type</Th>
              <Th>Message</Th>
              <Th>Discord ID</Th>
              <Th>Is Complete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((ticket) => (
              <Tr key={ticket.id}>
                <Td>{ticket.id}</Td>
                <Td>{ticket.created_at}</Td>
                <Td>{ticket.ref_id}</Td>
                <Td>{ticket.btc_txn_hash}</Td>
                <Td>{ticket.ticket_type}</Td>
                <Td>{ticket.message}</Td>
                <Td>{ticket.discord_id}</Td>
                <Td>{ticket.is_complete.toString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={4}>
        <ButtonGroup>
          <Button
            fontSize="sm"
            fontWeight="normal"
            rounded="sm"
            leftIcon={<ArrowBackIcon />}
            variant="outline"
            onClick={() => handlePageChange(selectedPage - 1)}
            disabled={selectedPage === 1}
          >
            Previous
          </Button>
          <Button
            fontSize="sm"
            rounded="sm"
            fontWeight="normal"
            rightIcon={<ArrowForwardIcon />}
            variant="outline"
            onClick={() => handlePageChange(selectedPage + 1)}
            disabled={selectedPage === totalPages}
          >
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
