import { ChakraProvider, theme } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { ProductsGrid } from "./components/ProductsGrid";
import { PRODUCTS_ROUTE } from "./constants";
import { UserContext } from "./context/UserContext";
import useFetch from "./hooks/useFetch";
import Layout from "./layout/Layout";
import { Product } from "./types/general";

export const App = () => {
  const ctx = useContext(UserContext);

  const { makeRequest } = useFetch();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    ctx?.isLoggedIn();
    makeRequest(
      {
        url: PRODUCTS_ROUTE,
      },
      (res) => {
        setProducts(res.data.data);
      }
    );
    // eslint-disable-line react-hooks/exhaustive-deps
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

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ProductsGrid>
          {products.map((p) => (
            <div key={p.id}>
              <ProductCard {...p} onClick={() => handlePurchase(p)} />
            </div>
          ))}
        </ProductsGrid>
      </Layout>
    </ChakraProvider>
  );
};
