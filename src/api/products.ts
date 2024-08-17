import express, { RequestHandler } from 'express';
import { getProductController, getProductsController, postProductController } from '../controllers/product.controller';
import { QueryParams, type ParamsWithId, type ProductResponse } from '../types';

const router = express.Router();

router.get<{}, ProductResponse, {}, QueryParams>(
  '/',
  getProductsController as RequestHandler<{}, ProductResponse, {}, QueryParams>,
);
router.get<ParamsWithId, ProductResponse>('/:id', getProductController);
router.post<{}, ProductResponse>('/', postProductController);
router.post<{}, ProductResponse>('/many', getProductController);
router.put<ParamsWithId, ProductResponse>('/:id', getProductController);
router.patch<ParamsWithId, ProductResponse>('/:id', getProductController);
router.delete<ParamsWithId, ProductResponse>('/:id', getProductController);

export default router;
