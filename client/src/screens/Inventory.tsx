import { Box, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ProductCard from "../components/ProductCard";
import { ProductsGrid } from "../components/ProductsGrid";
import { PRODUCTS_ROUTE } from "../constants";
import { UserContext } from "../context/UserContext";
import useFetch from "../hooks/useFetch";
import Layout from "../layout/Layout";
import { Product } from "../types/general";
import AddProducts from "./AddProducts";

const Inventory = () => {
  const ctx = useContext(UserContext);
  const navigate = useNavigate();
  const { makeRequest } = useFetch();
  const [products, setProducts] = useState<Product[]>([]);
  const [addProducts, setAddProducts] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>();
  useEffect(() => {
    if (!ctx?.user.isAdmin) {
      navigate("/");
    }
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

  function handleDelete(id: number) {
    makeRequest(
      {
        url: PRODUCTS_ROUTE + `/?product=${id}`,
        method: "DELETE",
      },
      (res) => {
        setProducts(res.data.data);
      }
    );
  }

  if (addProducts) {
    return (
      <AddProducts
        setToggle={() => setAddProducts((prev) => !prev)}
        setProducts={setProducts}
      />
    );
  }

  if (editProduct) {
    return (
      <AddProducts
        setToggle={() => setEditProduct(undefined)}
        setProducts={setProducts}
        values={editProduct}
        method={"PUT"}
      />
    );
  }

  return (
    <Layout>
      <ProductsGrid>
        {products.map((p) => (
          <Box key={p.id}>
            <ProductCard
              {...p}
              onClick={() => handlePurchase(p)}
              onDelete={() => handleDelete(p.id)}
              onEdit={() => setEditProduct(p)}
            />
          </Box>
        ))}
      </ProductsGrid>
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
