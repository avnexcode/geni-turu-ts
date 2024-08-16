import express from 'express';
import { getProductController, getProductsController } from '../controllers/product.controller';
import { type ParamsWithId, type ProductResponse } from '../types';

const router = express.Router();

router.get<{}, ProductResponse>('/', getProductsController);
router.get<ParamsWithId, ProductResponse>('/:id', getProductController);
router.post<{}, ProductResponse>('/', getProductController);
router.post<{}, ProductResponse>('/many', getProductController);
router.put<ParamsWithId, ProductResponse>('/:id', getProductController);
router.patch<ParamsWithId, ProductResponse>('/:id', getProductController);
router.delete<ParamsWithId, ProductResponse>('/:id', getProductController);

export default router;
