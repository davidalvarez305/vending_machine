import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import SimpleInputField from "../components/SimpleInputField";
import { PRODUCTS_ROUTE } from "../constants";
import useFetch from "../hooks/useFetch";
import Layout from "../layout/Layout";
import { centeredDiv } from "../utils/centeredDiv";

const AddProducts: React.FC = () => {
  const { makeRequest, isLoading } = useFetch();

  function handleSubmit(values: {
    productName: string;
    productDescription: string;
    productCost: number;
    quantity: number;
  }) {
    makeRequest(
      {
        url: PRODUCTS_ROUTE,
        method: "POST",
        data: values,
      },
      (res) => {
        console.log(res.data.data);
      }
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          productName: "",
          productDescription: "",
          productCost: 0,
          quantity: 0,
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box sx={{ ...centeredDiv }}>
            <SimpleInputField label={"Product Name"} name={"productName"} />
            <SimpleInputField
              label={"Product Description"}
              name={"productDescription"}
            />
            <SimpleInputField
              label={"Product Cost"}
              name={"productCost"}
              type={"number"}
            />
            <SimpleInputField
              label={"Quantity"}
              name={"quantity"}
              type={"number"}
            />
            <Button
              sx={{ my: 5 }}
              variant={"outline"}
              colorScheme={"blue"}
              isLoading={isLoading}
              loadingText={"Submitting"}
              type={"submit"}
            >
              Add
            </Button>
          </Box>
        </Form>
      </Formik>
    </Layout>
  );
};
export default AddProducts;
