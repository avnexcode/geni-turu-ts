import prisma from '../db';
import { FindCategoriesRepository } from '../types';

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
