import express, { RequestHandler } from 'express';
import { getProductController, getProductsController, postProductController } from '../controllers/product.controller';
import { GetProductResponse, GetProductsControllerQueryParams, GetProductsResponse, type ParamsWithId } from '../types';

const router = express.Router();

router.get<{}, GetProductsResponse, {}, GetProductsControllerQueryParams>(
  '/',
  getProductsController as RequestHandler<{}, GetProductsResponse, {}, GetProductsControllerQueryParams>,
);

router.get<ParamsWithId, GetProductResponse>('/:id', getProductController);

router.post<{}, GetProductResponse>('/', postProductController);

router.post<{}, GetProductResponse>('/many', getProductController);

router.put<ParamsWithId, GetProductResponse>('/:id', getProductController);

router.patch<ParamsWithId, GetProductResponse>('/:id', getProductController);

router.delete<ParamsWithId, GetProductResponse>('/:id', getProductController);


export default router;
