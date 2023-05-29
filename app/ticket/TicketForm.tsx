import React, { useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Select,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
  Textarea,
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
  const [input, setInput] = useState("");
  const isError = input === "";

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      pb="4rem"
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
          <FormControl id="email" my={4} isRequired>
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

          <FormControl id="name" my={4} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            {!isError ? (
              <FormHelperText>
                Enter the email you'd like to receive the newsletter on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl id="discordAccount" my={4} isRequired>
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

          <FormControl id="refId" my={4} isRequired>
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

          <FormControl id="hashcode" my={4} isRequired>
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
          <FormControl isRequired>
            <FormLabel>Ticket Type</FormLabel>
            <Select placeholder="Select an option">
              <option value="status-update">Status Update</option>
              <option value="status-update">Billing Inquiry</option>
              <option value="status-update">Technical Issue</option>
              <option value="status-update">Feedback</option>
              <option value="refund">Refund</option>
              <option value="status-update">Other</option>
            </Select>
          </FormControl>
          <Textarea
            placeholder="Write a personalized message to the support team here"
            size="lg"
            borderRadius="md"
            focusBorderColor="green.400"
            _placeholder={{ color: "gray.400" }}
            mt={4}
          />
          <Flex justify="flex-end">
            <Button
              type="submit"
              colorScheme="green"
              _hover={{ bg: "green.400" }}
              mt={8}
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default TicketForm;
