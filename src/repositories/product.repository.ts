import prisma from '../db';
import {
  type DestroyProductRepository,
  type FindProductRepository,
  type FindProductsRepository,
  type InsertProductRepository,
  type UpdateProductRepository,
} from '../types';

export const findProducts: FindProductsRepository = async (filters, page, limit) => {
  const skip = (page - 1) * limit;

  const prismaFilter = Object.keys(filters).reduce<Record<string, any>>((acc, key) => {
    if (key === 'category') {
      acc.category = { name: { contains: filters[key], mode: 'insensitive' } };
    } else {
      acc[key] = { contains: filters[key], mode: 'insensitive' };
    }
    return acc;
  }, {});

  const products = await prisma.product.findMany({
    where: prismaFilter,
    include: {
      category: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.product.count({ where: prismaFilter });

  return { products, total, page, limit };
};

export const findProduct: FindProductRepository = async id => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  return product;
};

export const insertProduct: InsertProductRepository = async newProductData => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      category_id: newProductData.category_id,
      description: newProductData.description,
      image: newProductData.image,
    },
    include: { category: true },
  });

  return product;
};

export const updateProduct: UpdateProductRepository = async (id, productData) => {
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: productData.name,
      price: productData.price,
      category_id: productData.category_id,
      description: productData.description,
      image: productData.image,
    },
    include: { category: true },
  });

  return product;
};

export const destroyProduct: DestroyProductRepository = async id => {
  const product = await prisma.product.delete({
    where: { id },
    include: { category: true },
  });

  return product;
};
