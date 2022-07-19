import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Box, Flex, Circle, Badge } from "@chakra-ui/layout";
import { FiShoppingCart } from "react-icons/fi";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button, Img } from "@chakra-ui/react";

const data = {
  isNew: true,
};

interface RatingProps {
  rating: number;
  numReviews: string;
}

function Rating({ rating, numReviews }: RatingProps) {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: "1" }}
                color={i < rating ? "teal.500" : "gray.300"}
              />
            );
          }
          if (roundedRating - i > 0.3 && roundedRating - i < 0.7) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review
        {parseFloat(numReviews.split(",").join("")) > 1 && "s"}
      </Box>
    </Box>
  );
}

interface ProductCardProps {
  id: number;
  productName: string;
  productDescription: string;
  productCost: number;
  quantity: number;
}

function ProductCard({
  id,
  productName,
  productDescription,
  productCost,
  quantity,
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
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                {"Product Label"}
              </Badge>
            )}
          </Box>
          <Flex mt="1" justifyContent="center" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
            >
              {productName}
            </Box>
          </Flex>
          <Flex justifyContent="center" alignContent="center">
            <Rating rating={5} numReviews={"1000"} />
          </Flex>
        </Box>
        <Tooltip
          label="Add to cart"
          bg="white"
          placement={"top"}
          color={"gray.800"}
          fontSize={"1.2em"}
        >
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
            >
              Purchase
            </Button>
            <Box fontSize="2xl" color={"gray.800"}>
              {productCost}
            </Box>
          </Box>
        </Tooltip>
      </Box>
    </Flex>
  );
}

export default ProductCard;
