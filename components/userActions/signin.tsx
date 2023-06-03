import { redirect, useRouter } from "next/navigation";
import { Button } from "@chakra-ui/button";
import react, { useState } from "react";

// Sign Out
export function SignInButton() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      if (response) {
        const data = await response.json();
        // Handle the retrieved data here
        console.log(data);
        router.push(data.url);
      }
    } catch (error) {
      // Handle the error here
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={handleSignIn}>Login</Button>
    </div>
  );
}
