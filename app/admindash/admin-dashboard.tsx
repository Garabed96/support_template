import React, { useState, useEffect } from "react";
import { supportClient } from "@/utils/supabase-browser";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Textarea,
  Button,
  Flex,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { getPagination } from "@/utils/helper/pagination";
import { checkSession } from "@/components/userActions/checkSession";
import axios from "axios";
// https://dev.to/sruhleder/creating-user-profiles-on-sign-up-in-supabase-5037
export default function AdminDashboard() {
  const supabase = supportClient();
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "complete", "incomplete"
  const [comment, setComment] = useState("");
  // TODO: Show remainder tickets counter at the bottom instead of total
  const fetchData = async (page) => {
    const page_size = 5; // Number of items per page
    const ticket_count = await axios.get(
      `/api/complete_ticket_count?page=${page}&page_size=${page_size}`,
      { headers: { "Content-Type": "application/json" } }
    );
    let total_ticket_count = 0;
    if (ticket_count) {
      const { count, data } = await ticket_count;
      if (filter === "complete") {
        total_ticket_count = data.filter("is_complete", "eq", "true");
      } else if (filter === "incomplete") {
        total_ticket_count = data.filter("is_complete", "eq", "false");
      }
      // setData(total_ticket_count);
    }
  };
  // const fetchData = async (page) => {
  //   let query = supabase.from("support_ticket").select().range(from, to);
  //
  //   if (filter === "complete") {
  //     query = query.filter("is_complete", "eq", "true");
  //   } else if (filter === "incomplete") {
  //     query = query.filter("is_complete", "eq", "false");
  //   }
  //
  //   const { data: tickets } = await query;
  //
  //   setData(tickets);
  // };
  const [user, setUser] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await checkSession();
        if (!session) {
          console.log("NO SESSION, NULL");
        } else if (session) {
          console.log("SESSION: ", session.user_metadata.name);
          console.log("SESSION: ", session.user_metadata.provider_id);
          session.user_metadata.provider_id;
          setUser(session);
        }
      } catch (e) {
        console.log("ERRORLOG");
      }
    };
    getSession();
  }, []);

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

  const handleTextareaChange = (event) => {
    const { value } = event.target;
    console.log(comment);
    setComment(value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSelectedPage(1); // Reset to first page when changing filters
  };
  const completeTicket = async (ticketId) => {
    try {
      await supabase
        .from("support_ticket")
        .update({ is_complete: true, admin_comments: comment }) // Update both columns
        .match({ id: ticketId });
      fetchData(selectedPage); // Refresh the data after updating the completion status
    } catch (error) {
      console.error(error);
    }
  };

  const refundTicket = async (ticketId) => {
    console.log("RUN");
    await completeTicket(ticketId); // Call completeTicket first
    let { error, data } = await supabase.from("refund").upsert({
      admin_name: user.user_metadata.name,
      minter_ref_id: user.id,
    }); // Update both columns
    if (error) {
      console.error(error);
    } else {
      console.log("Value passed?", data);
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
              <Flex
                justifyContent="center"
                m={6}
                flexDirection="column"
                alignItems="center"
              >
                <Textarea
                  // value={value}
                  onChange={handleTextareaChange}
                  placeholder="Share your thoughts about this ticket request"
                  size="sm"
                />
                <ButtonGroup>
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
                  <Button
                    p={4}
                    bg="orange.700"
                    m={4}
                    color="white"
                    fontSize="sm"
                    variant="outline"
                    rounded="sm"
                    onClick={() => refundTicket(ticket.id)}
                  >
                    Refund Ticket
                  </Button>
                </ButtonGroup>
              </Flex>
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
