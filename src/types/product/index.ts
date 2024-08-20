import { Prisma } from '@prisma/client';

export type Product = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

// export type Product = {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   category_id: string | null;
//   category?: {
//     id: string;
//     name: string;
//     description: string | null;
//   } | null;
// };

export type ProductResult = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
};

export type GetProductResponse = {
  status: string;
  message: string;
  data?: Product;
};

export type GetProductsResponse = {
  status: string;
  message: string;
  data?: ProductResult;
};

export type GetProductsControllerQueryParams = {
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
};

export * from './controller';
export * from './service';
export * from './repository';