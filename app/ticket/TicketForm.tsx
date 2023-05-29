import React, { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
const TicketForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    discordAccount: "",
    refId: "",
    hashcode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data here
    console.log(formData);
    // Reset the form
    setFormData({
      email: "",
      name: "",
      discordAccount: "",
      refId: "",
      hashcode: "",
    });
  };

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
      <Box width="400px" boxShadow="dark-lg" p={4} rounded="md">
        <form onSubmit={handleSubmit}>
          <FormControl id="email" my={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </FormControl>

          <FormControl id="name" my={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </FormControl>

          <FormControl id="discordAccount" my={4}>
            <FormLabel>Discord Account</FormLabel>
            <Input
              type="text"
              name="discordAccount"
              value={formData.discordAccount}
              onChange={handleChange}
              placeholder="Enter your Discord account"
              required
            />
          </FormControl>

          <FormControl id="refId" my={4}>
            <FormLabel>Ref ID</FormLabel>
            <Input
              type="text"
              name="refId"
              value={formData.refId}
              onChange={handleChange}
              placeholder="Enter your Ref ID"
              required
            />
          </FormControl>

          <FormControl id="hashcode" my={4}>
            <FormLabel>Eth or BTC Hash Code</FormLabel>
            <Input
              type="text"
              name="hashcode"
              value={formData.hashcode}
              onChange={handleChange}
              placeholder="Enter your Eth or BTC Hash Code"
              required
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            _hover={{ bg: "green.400" }}
            mt={8}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default TicketForm;
