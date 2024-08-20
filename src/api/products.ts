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
  GetProductResponse,
  GetProductsControllerQueryParams,
  GetProductsResponse,
  Product,
  type ParamsWithId,
} from '../types';

const router = express.Router();

// params, res body, req body, query

// router.get('/', getProductsController);
// router.get('/:id', getProductController);
// router.post('/', postProductController);
// router.put('/:id', putProductController);
// router.patch('/:id', patchProductController);
// router.delete('/:id', deleteProductController);

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

router.put<ParamsWithId, GetProductResponse, Omit<Product, 'id' | 'category'>, {}>(
  '/:id',
  putProductController as RequestHandler<ParamsWithId, GetProductResponse, Omit<Product, 'id' | 'category'>, {}>,
);

router.patch<ParamsWithId, GetProductResponse, Omit<Product, 'id' | 'category'>, {}>(
  '/:id',
  patchProductController as RequestHandler<ParamsWithId, GetProductResponse, Omit<Product, 'id' | 'category'>, {}>,
);

router.delete<ParamsWithId, GetProductResponse, {}, {}>(
  '/:id',
  deleteProductController as RequestHandler<ParamsWithId, GetProductResponse, {}, {}>,
);

export default router;
