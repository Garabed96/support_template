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
      minHeight="90vh"
      py="10rem"
    >
      <Heading as="h1" size="xl" marginBottom="1rem">
        Frequently Asked Questions
      </Heading>
      <Text fontSize="lg" color="gray.600" marginBottom="2rem">
        Find answers to common questions about our refunding process.
      </Text>{" "}
      <Accordion
        allowMultiple
        border="transparent"
        boxShadow="dark-lg"
        maxW="600px"
        border="1px #808080"
      >
        {faq_data.map((faq, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton
                textAlign="left"
                _expanded={{ bg: "blue.900", color: "white" }}
              >
                {faq.question}
              </AccordionButton>
            </h2>
            <AccordionPanel whiteSpace="pre-line">
              {faq.answer.replace(/\d+/g, (match) =>
                convertToRoman(parseInt(match))
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  );
};

export default FaqSection;

const convertToRoman = (num) => {
  switch (num) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    case 5:
      return "V";
    default:
      return num;
  }
};
