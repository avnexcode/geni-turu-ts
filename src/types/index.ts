export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export type ProductResponse = {
  status: string;
  message: string;
  data?: Product[] | Product;
};

export type ParamsWithId = {
  id: string;
};