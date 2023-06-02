"use client";

import { useAuth } from "@/components/providers/supabase-auth-provider";
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
import { Github, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const { signInWithDiscord, user } = useAuth();
  const router = useRouter();

  // Check if there is a user
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center w-full h-full px-8">
      {/* Main Container */}
      <div className="w-full max-w-lg">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="mt-2 text-neutral-600">
            Welcome to the{" "}
            <span className="font-semibold text-neutral-800">
              Ordkit Support Page.
            </span>{" "}
            Please login your account by Discord account.
          </p>
        </div>
        <Button
          onClick={signInWithDiscord}
          className="flex items-center w-full gap-2 mt-6"
        >
          Login with Discord <Github size="16" />
        </Button>
        {/* Form Container */}
      </div>
    </div>
  );
};

export default LoginForm;
