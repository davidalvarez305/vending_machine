import { Box } from "@chakra-ui/layout";
import React from "react";
import { centeredDiv } from "../utils/centeredDiv";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return <Box sx={{ ...centeredDiv }}>{children}</Box>;
};

export default Wrapper;
