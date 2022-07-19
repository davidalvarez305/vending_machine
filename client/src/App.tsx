import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { PRODUCTS_ROUTE } from "./constants";
import useFetch from "./hooks/useFetch";
import Layout from "./layout/Layout";
import { Product } from "./types/general";

export const App = () => {
  const { makeRequest } = useFetch();
  const [products, setProducts] = useState<Product[]>([]);
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
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          {products.map((p) => (
            <ProductCard {...p} />
          ))}
        </Box>
      </Layout>
    </ChakraProvider>
  );
};
