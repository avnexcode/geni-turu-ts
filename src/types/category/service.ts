import { Category, CategoryResult } from './index';

export type GetAllCategoriesService = (
  filters: Record<string, string>,
  page: number,
  limit: number,
) => Promise<CategoryResult>;

export type GetCategoryService = () => Promise<Category>;
export type CreateCategoryService = () => Promise<Category>;
export type EditCategoryService = () => Promise<Category>;
export type DeleteCategoryService = () => Promise<Category>;
