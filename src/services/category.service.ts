import { findCategories } from '../repositories/category.repository';
import { GetAllCategoriesService } from '../types';

export const getAllCategories: GetAllCategoriesService = async (filters, page, limit) => {
  const categories = await findCategories(filters, page, limit);
  console.log({ service: categories });
  return categories;
};