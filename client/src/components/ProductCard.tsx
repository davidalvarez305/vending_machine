import { Box, Flex, Circle } from "@chakra-ui/layout";
import { FiShoppingCart } from "react-icons/fi";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button, Img } from "@chakra-ui/react";

const data = {
  isNew: true,
};

interface QuantityProps {
  quantity: number;
}

function Quantity({ quantity }: QuantityProps) {
  return (
    <Box as="span" ml="2" color="gray.600" fontSize="md">
      {quantity} in Stock
    </Box>
  );
}

interface ProductCardProps {
  id: number;
  productName: string;
  productDescription: string;
  productCost: number;
  quantity: number;
  onClick?: () => void;
}

function ProductCard({
  id,
  productName,
  productDescription,
  productCost,
  quantity,
  onClick,
}: ProductCardProps) {
  const IMAGE_URL = ``;

  return (
    <Flex p={50} w="400px" alignItems="center" justifyContent="center">
      <Box
        bg={"white"}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {data.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Img src={IMAGE_URL} alt={"#"} roundedTop="lg" />

        <Box p="6">
          <Box display="flex" justifyContent="center" alignItems="baseline">
            {data.isNew && (
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
              >
                {productName}
              </Box>
            )}
          </Box>
          <Flex mt="1" justifyContent="center" alignContent="center">
            <Box fontSize="md" fontWeight="400" as="h4" lineHeight="tight">
              {productDescription}
            </Box>
          </Flex>
          <Flex justifyContent="center" alignContent="center">
            <Quantity quantity={quantity} />
          </Flex>
        </Box>
        <Tooltip>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Button
              leftIcon={<FiShoppingCart />}
              colorScheme="blue"
              variant="outline"
              onClick={onClick}
            >
              Purchase
            </Button>
            <Box fontSize="2xl" color={"gray.800"}>
              ${productCost}
            </Box>
          </Box>
        </Tooltip>
      </Box>
    </Flex>
  );
}

export default ProductCard;
