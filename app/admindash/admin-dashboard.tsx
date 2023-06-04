import React, { useState, useEffect } from "react";
import { supportClient } from "@/utils/supabase-browser";
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

const PAGE_SIZE = 5; // Number of items per page

export const getPagination = (page, size) => {
  const limit = size ? +size : PAGE_SIZE;
  const from = page ? (page - 1) * limit : 0;
  const to = page ? from + limit : limit;

  return { from, to };
};

export default function AdminDashboard() {
  const supabase = supportClient();
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "complete", "incomplete"
  // TODO: Show remainder tickets counter at the bottom instead of total
  const fetchData = async (page) => {
    const { from, to } = getPagination(page);
    let query = supabase.from("support_ticket").select().range(from, to);

    if (filter === "complete") {
      query = query.filter("is_complete", "eq", "true");
    } else if (filter === "incomplete") {
      query = query.filter("is_complete", "eq", "false");
    }

    const { data: tickets } = await query;

    setData(tickets);
  };

  const [total, setTotal] = useState(0);

  const fetchTotalCount = async () => {
    const { from, to } = getPagination(1);
    const { data, count } = await supabase
      .from("support_ticket")
      .select("*", { count: "exact" })
      .order("id", { ascending: true })
      .range(from, to);

    setTotal(count);
    setTotalPages(Math.ceil(count / PAGE_SIZE));
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSelectedPage(1); // Reset to first page when changing filters
  };
  const completeTicket = async (ticketId) => {
    try {
      await supabase
        .from("support_ticket")
        .update({ is_complete: true })
        .match({ id: ticketId });
      fetchData(selectedPage); // Refresh the data after updating the completion status
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(selectedPage);
  }, [selectedPage, filter]);

  useEffect(() => {
    fetchTotalCount();
  }, [filter]);

  return (
    <Flex direction="column" align="center" justify="center" pt={8}>
      <ButtonGroup mb={4}>
        <Button
          onClick={() => handleFilterChange("all")}
          variant={filter === "all" ? "solid" : "outline"}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilterChange("complete")}
          variant={filter === "complete" ? "solid" : "outline"}
        >
          Complete
        </Button>
        <Button
          onClick={() => handleFilterChange("incomplete")}
          variant={filter === "incomplete" ? "solid" : "outline"}
        >
          Incomplete
        </Button>
      </ButtonGroup>

      <Accordion
        allowMultiple
        boxShadow="dark-lg"
        minW="650px"
        maxW="650px"
        border="1px #808080"
      >
        {data?.map((ticket) => (
          <AccordionItem key={ticket.id}>
            <h2>
              <AccordionButton
                textAlign="left"
                _expanded={{ bg: "blue.900", color: "white" }}
              >
                <Box flex="1" textAlign="center">
                  <strong>Ticket ID:</strong> {ticket.id}
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
              <Button
                p={4}
                bg="green.800"
                m={4}
                color="white"
                fontSize="sm"
                variant="outline"
                rounded="sm"
                onClick={() => completeTicket(ticket.id)}
              >
                Complete Ticket
              </Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <ButtonGroup pt={16}>
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
      <Box p={4} bg="blue.900" m={4} color="white" fontSize="sm">
        {total} Total Tickets
      </Box>
    </Flex>
  );
}
