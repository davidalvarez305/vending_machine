import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const ProductsGrid: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "30vh",
        height: "75vh",
        width: "50%",
        overflow: "scroll",
      }}
    >
      {children}
    </Box>
  );
};
