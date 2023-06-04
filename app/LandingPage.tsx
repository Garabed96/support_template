import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon, EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react";
import { useAuth } from "@/components/providers/supabase-auth-provider";
import { checkSession } from "@/components/userActions/checkSession";
import { SignInWithDiscord } from "@/components/userActions/signin";

const LandingPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<Object | null>(null);
  useEffect(() => {
    const getSession = async () => {
      try {
        const session = await checkSession();
        if (!session) {
          console.log("NO SESSION, NULL");
        } else if (session) {
          console.log("SESSION: ", session);
          setUser(session);
        }
      } catch (e) {
        console.log("ERRORLOG");
      }
    };
    getSession();
  }, []);

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
        {user ? (
          <Link href="/ticket">
            <Button
              w="50%"
              _hover={{ bg: "green.400" }}
              rounded="sm"
              variant="outline"
              rightIcon={<EditIcon />}
            >
              Create Ticket
            </Button>
          </Link>
        ) : (
          <>
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
            <Modal
              isCentered
              onClose={onClose}
              isOpen={isOpen}
              motionPreset="slideInBottom"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader mt="8">
                  <div align="center">
                    <Text as="span" color="green.400">
                      Authenticate
                    </Text>{" "}
                    through{" "}
                    <Text as="span" color="green.400">
                      Discord
                    </Text>{" "}
                    to create a{" "}
                    <Text as="span" color="green.400">
                      Ticket
                    </Text>
                  </div>
                  <Flex justifyContent="center" m={6}>
                    <SignInWithDiscord />
                  </Flex>
                </ModalHeader>
              </ModalContent>
            </Modal>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default LandingPage;
