import React, { useEffect, useState } from "react";
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
import { createClient, createDevClient } from "@/utils/supabase-browser";
import { checkSession } from "@/components/userActions/checkSession";
const TicketForm = () => {
  const [formData, setFormData] = useState({
    discord_id: "",
    ref_id: "",
    btc_txn_hash: "",
    ticket_type: "",
    message: "",
    minter_discord_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const supabase = createClient();
  const dev_supabase = createDevClient();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false); // Track submission status
  const [user, setUser] = useState<Object | null>(null);
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
          setFormData((prevData) => ({
            ...prevData,
            discord_id: session.user_metadata.name,
            minter_discord_id: session.user_metadata.provider_id,
          }));
        }
      } catch (e) {
        console.log("ERRORLOG");
      }
    };
    getSession();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(true); // Set submission status to true

    // console.log("formData", formData);
    setFormData({
      discord_id: "",
      ref_id: "",
      btc_txn_hash: "",
      ticket_type: "",
      message: "",
      minter_discord_id: "",
    });
    const {
      discord_id,
      ref_id,
      btc_txn_hash,
      ticket_type,
      message,
      minter_discord_id,
    } = formData;

    // Before passing data to `support_ticket`, check if minter_discord_id of current user
    // matches the minter_discord_id of

    // Added minter to minter table with dummy data -> now match,

    /*
     * 1114544104907493408
     * gerrard#1535
     * */

    let { data, devError } = await dev_supabase
      .from("minter")
      .select("minter_discord_id")
      .contains(minter_discord_id);
    if (devError) {
      alert(devError.message);
    } else {
      const exists = data && data.length > 0;
      if (exists) {
        // Value exists in the database
        console.log("Value exists");
        // You can also return true or perform any other actions here
      } else {
        // Value does not exist in the database
        console.log("Value does not exist");
        // You can return false or perform any other actions here
      }
    }
    let { error } = await supabase.from("support_ticket").upsert({
      discord_id,
      ref_id,
      btc_txn_hash,
      ticket_type,
      message,
      minter_discord_id,
    });

    if (error) {
      alert(error.message);
    }

    setLoading(false);
  };
  const [input, setInput] = useState("");
  const isError = input === "";

  return (
    <div>
      {user ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minHeight="100vh"
          pb="4rem"
        >
          {submitted ? ( // Display thank you message if submitted
            <Box textAlign="center">
              <Heading as="h2" size="lg" marginBottom="1rem">
                <Text as="span" color="green.400">
                  Thank You!
                </Text>{" "}
              </Heading>
              <Text fontSize="md" color="gray.300" marginBottom="2rem">
                We have received your support ticket. Our team will get back to
                you soon.
              </Text>
            </Box>
          ) : (
            <>
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
                  <FormControl id="discord_id" my={4} isRequired>
                    <FormLabel>Discord Account</FormLabel>
                    <Input
                      type="text"
                      name="discord_id"
                      value={formData.discord_id}
                      readOnly // Set the readOnly attribute to prevent user input
                      placeholder="Enter your Discord account"
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

                  <FormControl id="ref_id" my={4} isRequired>
                    <FormLabel>Ref ID</FormLabel>
                    <Input
                      type="text"
                      name="ref_id"
                      value={formData.ref_id}
                      onChange={handleChange}
                      placeholder="Enter your Ref ID"
                      required
                    />
                  </FormControl>

                  <FormControl id="btc_txn_hash" my={4} isRequired>
                    <FormLabel>Eth or BTC Hash Code</FormLabel>
                    <Input
                      type="text"
                      name="btc_txn_hash"
                      value={formData.btc_txn_hash}
                      onChange={handleChange}
                      placeholder="Enter your Eth or BTC Hash Code"
                      required
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Ticket Type</FormLabel>
                    <Select
                      name="ticket_type"
                      value={formData.ticket_type}
                      onChange={handleChange}
                      placeholder="Select an option"
                    >
                      <option value="status-update">Status Update</option>
                      <option value="billing-inquiry">Billing Inquiry</option>
                      <option value="technical-issue">Technical Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="refund">Refund</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormControl>

                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
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
                      disabled={loading}
                    >
                      Submit
                    </Button>
                  </Flex>
                </form>
              </Box>
            </>
          )}
        </Flex>
      ) : (
        <>please log in</>
      )}
    </div>
  );
};

export default TicketForm;
