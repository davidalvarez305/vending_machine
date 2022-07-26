import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import SimpleInputField from "../components/SimpleInputField";
import { PRODUCTS_ROUTE } from "../constants";
import useFetch from "../hooks/useFetch";
import Layout from "../layout/Layout";
import { Product } from "../types/general";
import { centeredDiv } from "../utils/centeredDiv";

interface Props {
  setToggle: () => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  values?: Product;
  method?: "PUT";
}

const AddProducts: React.FC<Props> = ({
  setToggle,
  setProducts,
  values,
  method,
}) => {
  const { makeRequest, isLoading } = useFetch();

  function handleSubmit(values: {
    id: number | undefined;
    productName: string;
    productDescription: string;
    productCost: number;
    quantity: number;
  }) {
    makeRequest(
      {
        url: PRODUCTS_ROUTE,
        method: method ? method : "POST",
        data: values,
      },
      (res) => {
        setProducts(res.data.data);
        setToggle();
      }
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={{
          id: values?.id ? values?.id : undefined,
          productName: values?.productName ? values?.productName : "",
          productDescription: values?.productDescription
            ? values?.productDescription
            : "",
          productCost: values?.productCost ? values?.productCost : 0,
          quantity: values?.quantity ? values?.quantity : 0,
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Box sx={{ ...centeredDiv, height: "75vh" }}>
            {method && (
              <SimpleInputField
                label={"Product Id"}
                name={"id"}
                type={"number"}
                readOnly={true}
              />
            )}
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
              {method ? "Update" : "Add"}
            </Button>
          </Box>
        </Form>
      </Formik>
      <Box>
        <Button variant={"outline"} colorScheme={"teal"} onClick={setToggle}>
          Inventory
        </Button>
      </Box>
    </Layout>
  );
};
export default AddProducts;
