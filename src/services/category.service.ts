import {
  destroyCategory,
  findCategories,
  findCategory,
  insertCategory,
  updateCategory,
} from '../repositories/category.repository';
import {
  type CreateCategoryService,
  type DeleteCategoryService,
  type EditCategoryService,
  type GetAllCategoriesService,
  type GetCategoryService,
} from '../types';

export const getAllCategories: GetAllCategoriesService = async (filters, page, limit) => {
  const categories = await findCategories(filters, page, limit);
  return categories;
};

export const getCategory: GetCategoryService = async id => {
  const category = await findCategory(id);
  if (!category) {
    throw new Error(`Category with id ${id} not found`);
  }
  return category;
};

export const createCategory: CreateCategoryService = async newCategorydata => {
  const category = await insertCategory(newCategorydata);
  return category;
};

export const editCategory: EditCategoryService = async (id, categoryData) => {
  await getCategory(id);
  const category = await updateCategory(id, categoryData);
  return category;
};

export const deleteCategory: DeleteCategoryService = async id => {
  await getCategory(id);
  const category = await destroyCategory(id);
  return category;
};
