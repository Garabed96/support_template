import React, { useState } from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="90vh"
      py="10rem"
    >
      <Heading size="md">
        <Image
          src={"/logos/primary-logo.svg"}
          width={300}
          height={100}
          alt="logo"
        />
      </Heading>
      <Text fontSize="lg" color="gray.200" marginBottom="2rem">
        <Text as="span" color="green.400">
          Need
        </Text>{" "}
        further assistance?{" "}
        <Text as="span" color="green.400">
          Open
        </Text>{" "}
        a ticket to get personalized support.
      </Text>
      <Box w="50%" rounded="md" variant="outline" textAlign="center">
        {/*<Link href="/ticket">*/}
        {/*  <Button*/}
        {/*    w="50%"*/}
        {/*    _hover={{ bg: "green.400" }}*/}
        {/*    rounded="sm"*/}
        {/*    variant="outline"*/}
        {/*    rightIcon={<EditIcon />}*/}
        {/*  >*/}
        {/*    Create Ticket*/}
        {/*  </Button>*/}
        {/*</Link>        */}
        <Button
          w="50%"
          _hover={{ bg: "green.400" }}
          rounded="sm"
          variant="outline"
          rightIcon={<EditIcon />}
          onClick={onOpen}
        >
          Create Ticket
        </Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
};

export default LandingPage;
