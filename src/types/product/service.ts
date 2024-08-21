import { type Product, type ProductList } from './index';

export type GetAllProductsService = (
  filters: Record<string, string>,
  page: number,
  limit: number,
) => Promise<ProductList>;

export type GetProductService = (
  id: string
) => Promise<Product>;

export type CreateProductService = (
  newProductData: Product
) => Promise<Product>;

export type EditProductService = (
  id: string,
  productData: Partial<Product>
) => Promise<Product>;

export type DeleteProductService = (
  id: string 
) => Promise<Product>;