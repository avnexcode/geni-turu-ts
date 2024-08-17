export type Product = {
  id?: string;
  name: string;
  price: number;
  categoryid: string;
  description: string;
  image: string;
  category: {
    id?: string;
    name: string;
    description?: string;
  };
};

export type ProductResult = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
};

export type ProductResponse = {
  status: string;
  message: string;
  data?: ProductResult | Product;
};

export type ParamsWithId = {
  id: string;
};

export type QueryParams = {
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
};

export * from './controller';
export * from './service';
export * from './repository';
