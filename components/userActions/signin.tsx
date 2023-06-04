"use client";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/navigation";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

export function SignInWithDiscord() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the endpoint");
      }
      if (response) {
        const data = await response.json();
        // Handle the retrieved data here
        // console.log("URL", data.url);
        router.push(data.url);
      }
    } catch (error) {
      // Handle the error here
      setError(error);
      console.error(error);
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        fontSize="sm"
        fontWeight="normal"
        rounded="sm"
        rightIcon={<ArrowForwardIcon />}
        variant="outline"
        onClick={handleSignIn}
      >
        Login with Discord
      </Button>
    </div>
  );
}
