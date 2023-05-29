import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
const TicketForm = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="90vh"
      py="10rem"
    >
      <Heading as="h2" size="lg" marginBottom="1rem">
        Create Support Ticket
      </Heading>
      <Text fontSize="md" color="gray.300" marginBottom="2rem">
        <Text as="span" color="green.400">
          Please
        </Text>{" "}
        fill out the form below to create a support ticket.{" "}
        <Text as="span" color="green.400">
          Our
        </Text>{" "}
        team will assist{" "}
        <Text as="span" color="green.400">
          you
        </Text>{" "}
        as soon as{" "}
        <Text as="span" color="green.400">
          possible.
        </Text>{" "}
      </Text>
    </Flex>
  );
};

export default TicketForm;
