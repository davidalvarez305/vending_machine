export type User = {
  id: number | null;
  username: string;
  password: string;
  email: string;
};

export type Product = {
  id: number;
  productName: string;
  productDescription: string;
  productCost: number;
  quantity: number;
};
