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
      minHeight="80vh"
      padding="2rem"
    >
      <Heading as="h1" size="xl" marginBottom="1rem">
        Frequently Asked Questions
      </Heading>
      <Text fontSize="lg" color="gray.600" marginBottom="2rem">
        Find answers to common questions about our refunding process.
      </Text>{" "}
      <Accordion allowToggle>
        <Accordion allowToggle>
          {faq_data.map((item, index) => (
            <AccordionItem key={index} w="full">
              <h2>
                <AccordionButton>
                  {index + 1}. {item.question}
                </AccordionButton>
              </h2>
              <AccordionPanel>{item.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Accordion>
    </Flex>
  );
};

export default FaqSection;
