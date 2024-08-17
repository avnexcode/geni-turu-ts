import prisma from '../db';
import {
  DestroyProductRepository,
  FindProductRepository,
  FindProductsRepository,
  InsertProductRepository,
  Product,
  ProductResult,
  UpdateProductRepository,
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

  const transformedProducts: Product[] = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
    categoryid: product.categoryid,
    category: {
      id: product.category.id,
      name: product.category.name,
      description: product.category.description ?? undefined,
    },
  }));

  const result: ProductResult = {
    products: transformedProducts,
    total,
    page,
    limit,
  };

  return result;
};

export const findProduct: FindProductRepository = async id => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) return null;

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    categoryid: product.categoryid,
    description: product.description,
    image: product.image,
    category: {
      id: product.category.id,
      name: product.category.name,
      description: product.category.description ?? undefined,
    },
  };
};

export const insertProduct: InsertProductRepository = async newProductData => {
  const product = await prisma.product.create({
    data: {
      name: newProductData.name,
      price: newProductData.price,
      categoryid: newProductData.categoryid,
      description: newProductData.description,
      image: newProductData.image,
    },
    include: { category: true },
  });

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    categoryid: product.categoryid,
    description: product.description,
    image: product.image,
    category: {
      id: product.category.id,
      name: product.category.name,
      description: product.category.description ?? undefined,
    },
  };
};

export const updateProduct: UpdateProductRepository = async (id, productData) => {
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: productData.name,
      price: productData.price,
      categoryid: productData.categoryid,
      description: productData.description,
      image: productData.image,
    },
    include: { category: true },
  });

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    categoryid: product.categoryid,
    description: product.description,
    image: product.image,
    category: {
      id: product.category.id,
      name: product.category.name,
      description: product.category.description ?? undefined,
    },
  };
};

export const destroyProduct: DestroyProductRepository = async id => {
  const product = await prisma.product.delete({
    where: { id },
    include: { category: true },
  });

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    categoryid: product.categoryid,
    description: product.description,
    image: product.image,
    category: {
      id: product.category.id,
      name: product.category.name,
      description: product.category.description ?? undefined,
    },
  };
};
