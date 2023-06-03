import { useSupabase } from "@/components/providers/supabase-provider";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@chakra-ui/button";
import react, { useState } from "react";

// Sign Out
export function SignOutButton() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSignOut = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data from the endpoint");
      }
      const data = await response.json();
      // Handle the retrieved data here
      console.log(data);
      // router.refresh();
      window.location.href = "/";
    } catch (error) {
      // Handle the error here
      setError(error);
      console.error(error);
    }
  };

  return (
    <div>
      {error && <p>Error: {error.message}</p>}
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
}
