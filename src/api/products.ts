import express, { RequestHandler } from 'express';
import {
  deleteProductController,
  getProductController,
  getProductsController,
  patchProductController,
  postProductController,
  putProductController,
} from '../controllers/product.controller';
import {
  type GetProductResponse,
  type GetProductsControllerQueryParams,
  type GetProductsResponse,
  type Product,
  type ParamsWithId,
} from '../types';

const router = express.Router();

// params, res body, req body, query

router.get<{}, GetProductsResponse, {}, GetProductsControllerQueryParams>(
  '/',
  getProductsController as RequestHandler<{}, GetProductsResponse, {}, GetProductsControllerQueryParams>,
);

router.get<ParamsWithId, GetProductResponse, {}, {}>(
  '/:id',
  getProductController as RequestHandler<ParamsWithId, GetProductResponse, {}, {}>,
);

router.post<{}, GetProductResponse, Product, {}>(
  '/',
  postProductController as RequestHandler<{}, GetProductResponse, Product, {}>,
);

router.put<ParamsWithId, GetProductResponse, Product, {}>(
  '/:id',
  putProductController as RequestHandler<ParamsWithId, GetProductResponse, Product, {}>,
);

router.patch<ParamsWithId, GetProductResponse, Partial<Product>, {}>(
  '/:id',
  patchProductController as RequestHandler<ParamsWithId, GetProductResponse, Partial<Product>, {}>,
);

router.delete<ParamsWithId, GetProductResponse, {}, {}>(
  '/:id',
  deleteProductController as RequestHandler<ParamsWithId, GetProductResponse, {}, {}>,
);

export default router;
