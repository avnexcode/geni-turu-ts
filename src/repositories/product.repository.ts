import prisma from '../db';
import { type Product } from '../types';

export const findProducts = async (): Promise<Product[]> => {
  const products = await prisma.products.findMany();
  
  return products;
};

export const findProduct = async (id: string): Promise<Product | null> => {
  const product = await prisma.products.findUnique({
    where: { id },
  });

  return product;
};
