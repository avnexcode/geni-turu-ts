import { Prisma } from '@prisma/client';

export type Category = Prisma.CategoryGetPayload<{
  include: { products: true }
}>;

export type CategoryList = {
  categories: Category[];
  total: number;
  page: number;
  limit: number;
};
  
export type GetCategoryResponse = {
  status: string;
  message: string;
  data?: Category;
};
  
export type GetCategoriesResponse = {
  status: string;
  message: string;
  data?: CategoryList;
};
  
export type GetCategoriesControllerQueryParams = {
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
};

export * from './controller';
export * from './service';
export * from './repository';