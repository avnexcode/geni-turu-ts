import prisma from '../db';
import { DestroyCategoryRepository, FindCategoriesRepository, FindCategoryRepository, InsertCategoryRepository, UpdateCategoryRepository } from '../types';

export const findCategories: FindCategoriesRepository = async (filters, page, limit) => {
  const skip = (page - 1) * limit;

  const prismaFilter = Object.keys(filters).reduce<Record<string, any>>((acc, key) => {
    if (key === 'category') {
      acc.category = { name: { contains: filters[key], mode: 'insensitive' } };
    } else {
      acc[key] = { contains: filters[key], mode: 'insensitive' };
    }
    return acc;
  }, {});

  const categories = await prisma.category.findMany({
    where: prismaFilter,
    include: { products: true },
    skip,
    take: limit,
  });

  const total = await prisma.category.count({
    where: prismaFilter,
  });

  return { categories, total, page, limit };
};

export const findCategory: FindCategoryRepository = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });
  return category;
};

export const insertCategory: InsertCategoryRepository = async (newCategoryData) => {
  const category = await prisma.category.create({
    data: {
      name: newCategoryData.name,
      description: newCategoryData.description,
    },
    include: { products: true },
  });
  return category;
};

export const updateCategory: UpdateCategoryRepository = async (id, categoryData) => {
  const category = await prisma.category.update({
    where: { id },
    data: {
      name: categoryData.name,
      description: categoryData.description,
    },
    include: { products: true },
  });
  return category;
};

export const destroyCategory: DestroyCategoryRepository = async (id) => {
  const category = await prisma.category.delete({
    where: { id },
    include: { products: true },
  });
  return category;
};