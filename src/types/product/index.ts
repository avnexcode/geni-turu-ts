import { Prisma } from '@prisma/client';

export type Product = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type ProductList = {
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
  data?: ProductList;
};

export type GetProductsControllerQueryParams = {
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
};

export * from './controller';
export * from './service';
export * from './repository';