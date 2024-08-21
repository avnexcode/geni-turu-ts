import { type Product, type ProductList } from './index';

export type FindProductsRepository = (
  filters: Record<string, string>,
  page: number,
  limit: number
) => Promise<ProductList>;

export type FindProductRepository = (id: string) => Promise<Product | null>;

export type InsertProductRepository = (
  newProductData: Product
) => Promise<Product>;

export type UpdateProductRepository = (
  id: string, 
  productData: Partial<Product>
) => Promise<Product>;

export type DestroyProductRepository = (id: string) => Promise<Product>;
