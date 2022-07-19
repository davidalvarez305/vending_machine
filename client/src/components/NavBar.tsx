import { Box } from "@chakra-ui/react";
import React from "react";
import { NavButton } from "./NavButton";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const pages = [
    {
      buttonText: "Home",
      destination: "",
    },
    {
      buttonText: "Register",
      destination: "register",
    },
    {
      buttonText: "Inventory",
      destination: "inventory",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          <NavButton {...page} />
        </React.Fragment>
      ))}
    </Box>
  );
};
