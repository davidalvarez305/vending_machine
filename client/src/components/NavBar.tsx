import { Box, Button } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavButton } from "./NavButton";

export const NavBar: React.FC = () => {
  const ctx = useContext(UserContext);
  const pages = [
    {
      buttonText: "Home",
      destination: "",
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
      {ctx?.user.id && (
        <Button
          colorScheme={"pink"}
          variant={"outline"}
          onClick={() => ctx?.Logout()}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};
