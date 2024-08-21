import { Category, CategoryList } from './index';

export type GetAllCategoriesService = (
  filters: Record<string, string>,
  page: number,
  limit: number
) => Promise<CategoryList>;

export type GetCategoryService = (id: string) => Promise<Category>;
export type CreateCategoryService = (newCategoryData: Category) => Promise<Category>;
export type EditCategoryService = (id: string, categoryData: Category) => Promise<Category>;
export type DeleteCategoryService = (id: string) => Promise<Category>;
