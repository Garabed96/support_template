import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import faq_data from "./FAQ.json";
const FaqSection = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      padding="2rem"
    >
      <Heading as="h1" size="xl" marginBottom="1rem">
        Frequently Asked Questions
      </Heading>
      <Text fontSize="lg" color="gray.600" marginBottom="2rem">
        Find answers to common questions about our refunding process.
      </Text>{" "}
      <Accordion allowMultiple maxW="600px">
        {faq_data.map((item, index) => (
          <AccordionItem key={index} w="full">
            <h2>
              <AccordionButton
                _expanded={{ bg: "blue.900", color: "white" }}
                textAlign="left"
              >
                {index + 1}. {item.question}
              </AccordionButton>
            </h2>
            <AccordionPanel>{item.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export default FaqSection;
