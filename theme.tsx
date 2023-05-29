import { extendTheme } from "@chakra-ui/react";
import { theme as base } from "@chakra-ui/react";
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  fonts: {
    heading: `'Oswald', ${base.fonts?.heading}`,
    body: `'Oswald', ${base.fonts?.body}`,
  },
  config: {
    ...config,
    colors: {
      black: "#000000", // "#131416",
      white: "#FFFFFF",
    },
  },
});

export default theme;
