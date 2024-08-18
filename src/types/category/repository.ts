import { CategoryResult } from '../index';

export type FindCategoriesRepository = (
  filters: Record<string, string>,
  page: number,
  limit: number
) => Promise<CategoryResult>;

export type FindCategoryRepository = () => {};

export type InsertCategoryRepository = () => {};

export type UpdateCategoryRepository = () => {};

export type DestroyCategoryRepository = () => {};
