import { type Product, type ProductResult } from './index';

export type FindProductsRepository = (
  filters: Record<string, string>,
  page: number,
  limit: number
) => Promise<ProductResult>;

// export type FindProductRepository = (id: string) => Promise<Product | null>;

// export type InsertProductRepository = (newProductData: Product) => Promise<Product>;

// export type UpdateProductRepository = (id: string, productData: Product) => Promise<Product>;

// export type DestroyProductRepository = (id: string) => Promise<Product>;

export type FindProductRepository = (id: string) => Promise<Product | null>;

export type InsertProductRepository = (newProductData: Omit<Product, 'id' | 'category'>) => Promise<Product>;

export type UpdateProductRepository = (id: string, productData: Omit<Product, 'id' | 'category'>) => Promise<Product>;

export type DestroyProductRepository = (id: string) => Promise<Product>;