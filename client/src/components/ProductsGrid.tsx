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
        gridTemplateColumns: "400px 400px",
        height: "75vh",
        width: "100%",
      }}
    >
      {children}
    </Box>
  );
};
