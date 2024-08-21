import { type Category, type CategoryList } from '../index';

export type FindCategoriesRepository = (
  filters: Record<string, string>,
  page: number,
  limit: number
) => Promise<CategoryList>;

export type FindCategoryRepository = (id: string) => Promise<Category | null>;

export type InsertCategoryRepository = (newCategoryData: Category) => Promise<Category>;

export type UpdateCategoryRepository = (id: string, categoryData: Category) => Promise<Category>;

export type DestroyCategoryRepository = (id: string) => Promise<Category>;
