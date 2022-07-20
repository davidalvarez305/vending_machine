import { ChakraProvider, Box, theme, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS_ROUTE } from "../constants";
import useFetch from "../hooks/useFetch";
import Layout from "../layout/Layout";
import { Product } from "../types/general";
import { centeredDiv } from "../utils/centeredDiv";
import AddProducts from "./AddProducts";

const Inventory = () => {
  const { makeRequest } = useFetch();
  const [products, setProducts] = useState<Product[]>([]);
  const [addProducts, setAddProducts] = useState(false);
  useEffect(() => {
    makeRequest(
      {
        url: PRODUCTS_ROUTE,
      },
      (res) => {
        setProducts(res.data.data);
      }
    );
  }, []);

  function handlePurchase(values: Product) {
    makeRequest(
      {
        url: PRODUCTS_ROUTE,
        method: "PUT",
        data: {
          ...values,
          quantity: values.quantity - 1,
        },
      },
      (res) => {
        setProducts(res.data.data);
      }
    );
  }

  if (addProducts) {
    return <AddProducts setAddProducts={setAddProducts} />;
  }

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {products.map((p) => (
          <Box sx={{ ...centeredDiv, height: "75vh" }}>
            <ProductCard {...p} onClick={() => handlePurchase(p)} />
          </Box>
        ))}
      </Box>
      <Box>
        <Button
          variant={"outline"}
          colorScheme={"teal"}
          onClick={() => setAddProducts((prev) => !prev)}
        >
          Add Products
        </Button>
      </Box>
    </Layout>
  );
};

export default Inventory;
