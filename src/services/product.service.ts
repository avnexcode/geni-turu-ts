import {
  destroyProduct,
  findProduct,
  findProducts,
  insertProduct,
  updateProduct,
} from '../repositories/product.repository';
import {
  DeleteProductService,
  EditProductService,
  type CreateProductService,
  type GetAllProductsService,
  type GetProductService,
} from '../types';

export const getAllProducts: GetAllProductsService = async (filters = {}, page = 1, limit = 10) => {
  const products = await findProducts(filters, page, limit);
  return products;
};

export const getProduct: GetProductService = async id => {
  const product = await findProduct(id);

  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }

  return product;
};

export const createProduct: CreateProductService = async newProductData => {
  const product = await insertProduct(newProductData);
  return product;
};

export const editProduct: EditProductService = async (id, productData) => {
  getProduct(id);
  const product = await updateProduct(id, productData);
  return product;
};

export const deleteProduct: DeleteProductService = async id => {
  getProduct(id);
  const product = await destroyProduct(id);
  return product;
};
