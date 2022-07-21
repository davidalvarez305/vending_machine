import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import LoginForm from "../forms/Login";
import { LOGIN_ROUTE } from "../constants";
import LoginOrRegister from "../components/LoginOrRegister";
import { Formik } from "formik";
import { useNavigate } from "react-router";

const LoginScreen = () => {
  const { isLoading, makeRequest } = useFetch();
  const [loginError, setLoginError] = useState({ message: "" });
  const navigate = useNavigate();

  return (
    <Flex minH={"100vh"} align={"top"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} minW={"80vh"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Vending Machine Project 🚀💻
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => {
              if (values.username === "" || values.password === "") {
                return;
              }
              makeRequest(
                {
                  url: LOGIN_ROUTE,
                  method: "POST",
                  data: values,
                },
                async (data) => {
                  if (data.data.error) {
                    setLoginError({ message: data.data.error });
                  } else {
                    navigate("/");
                  }
                }
              );
            }}
          >
            <LoginForm isLoading={isLoading} loginError={loginError} />
          </Formik>
          <LoginOrRegister text={"Create Account"} navigatePage={"register"} />
        </Box>
      </Stack>
    </Flex>
  );
};
export default LoginScreen;
