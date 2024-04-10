// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
export const theme = extendTheme({
  colors: {
    brand: {
      50: "#5db075",
      100: "#5db075",
      200: "#5db075",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
