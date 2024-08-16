import { findProduct, findProducts } from '../repositories/product.repository';
import { type Product } from '../types';

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await findProducts();
  return products;
};

export const getProduct = async (id: string): Promise<Product> => {
  const product = await findProduct(id);

  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }

  return product;
};