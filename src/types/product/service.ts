import { type Product, type ProductResult } from './index';

export type GetAllProductsService = (
  filters: Record<string, string>,
  page: number,
  limit: number,
) => Promise<ProductResult>;

export type GetProductService = (
  id: string
) => Promise<Product>;

export type CreateProductService = (
  newProductData: Product
) => Promise<Product>;

export type EditProductService = (
  id: string,
  productData: Omit<Product, 'id' | 'category'>
) => Promise<Product>;

export type DeleteProductService = (
  id: string 
) => Promise<Product>;