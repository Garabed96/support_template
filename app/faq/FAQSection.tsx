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

const FaqSection = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="50vh"
      padding="2rem"
    >
      <Heading as="h1" size="xl" marginBottom="1rem">
        Frequently Asked Questions
      </Heading>
      <Text fontSize="lg" color="gray.600" marginBottom="2rem">
        Find answers to common questions about our refunding process.
      </Text>{" "}
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>Question 1</AccordionButton>
          </h2>
          <AccordionPanel>Answer 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>Question 2</AccordionButton>
          </h2>
          <AccordionPanel>Answer 2</AccordionPanel>
        </AccordionItem>
        {/* Add more AccordionItems for additional questions and answers */}
      </Accordion>
    </Flex>
  );
};

export default FaqSection;
