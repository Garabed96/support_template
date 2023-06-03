import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase-browser";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

const PAGE_SIZE = 7; // Number of items per page

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
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="90vh"
      py="5rem"
    >
      <Accordion
        allowMultiple
        border="transparent"
        boxShadow="dark-lg"
        minW="750px"
        border="1px #808080"
      >
        {data.map((ticket) => (
          <AccordionItem key={ticket.id}>
            <h2>
              <AccordionButton
                textAlign="left"
                _expanded={{ bg: "blue.900", color: "white" }}
              >
                <Box flex="1" textAlign="left">
                  {ticket.id}
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box p={2}>
                <strong>ID:</strong> {ticket.id}
              </Box>
              <Box p={2}>
                <strong>Created At:</strong> {ticket.created_at}
              </Box>
              <Box p={2}>
                <strong>Ref ID:</strong> {ticket.ref_id}
              </Box>
              <Box p={2}>
                <strong>BTC Txn Hash:</strong> {ticket.btc_txn_hash}
              </Box>
              <Box p={2}>
                <strong>Ticket Type:</strong> {ticket.ticket_type}
              </Box>
              <Box p={2}>
                <strong>Message:</strong> {ticket.message}
              </Box>
              <Box p={2}>
                <strong>Discord ID:</strong> {ticket.discord_id}
              </Box>
              <Box p={2}>
                <strong>Is Complete:</strong> {ticket.is_complete.toString()}
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <ButtonGroup mt={8}>
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
    </Flex>
  );
}
