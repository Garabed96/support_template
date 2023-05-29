import React from "react";
import { Image } from "@chakra-ui/image";
import ordLogo from "../../../public/logos/primary-logo.svg";
import { Center } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function NavBar() {
  return (
    <React.Fragment>
      <nav>
        <Center>
          <Image src={"/logos/primary-logo.svg"} maxW={110} alt="logo" />
        </Center>{" "}
        <Button
          w="full"
          rounded="sm"
          variant="outline"
          rightIcon={<ArrowForwardIcon />}
          onClick={() => console.log("CLICKED ON DISCORD LOGIN")}
        >
          Login with Discord
        </Button>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;
