import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import useLoginRequired from "./hooks/useLoginRequired";

export const App = () => {
  useLoginRequired();
  return (
    <ChakraProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        Hey there!
      </Box>
    </ChakraProvider>
  );
};
