import express, { RequestHandler } from 'express';
import { GetCategoriesControllerQueryParams, GetCategoriesResponse, GetCategoryResponse, ParamsWithId } from '../types';
import { getCategoriesController, getCategoryController } from '../controllers/category.controller';

const router = express.Router();

// router.get<{}, {}, {}, GetCategoriesResponse>('/', getCategoriesController);

router.get<{}, GetCategoriesResponse, {}, GetCategoriesControllerQueryParams>(
  '/',
  getCategoriesController as RequestHandler<{}, GetCategoriesResponse, {}, GetCategoriesControllerQueryParams>,
);

router.get<ParamsWithId, GetCategoryResponse>('/:id', getCategoryController);

router.post<{}, GetCategoryResponse>('/', getCategoryController);

router.post<{}, GetCategoryResponse>('/many', getCategoryController);

router.put<ParamsWithId, GetCategoryResponse>('/:id', getCategoryController);

router.patch<ParamsWithId, GetCategoryResponse>('/:id', getCategoryController);

router.delete<ParamsWithId, GetCategoryResponse>('/:id', getCategoryController);

export default router;
