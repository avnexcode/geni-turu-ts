import express, { RequestHandler } from 'express';
import {
  type Category,
  type GetCategoriesControllerQueryParams,
  type GetCategoriesResponse,
  type GetCategoryResponse,
  type ParamsWithId,
} from '../types';
import {
  deleteCategoryController,
  getCategoriesController,
  getCategoryController,
  patchCategoryController,
  postCategoryController,
  putCategoryController,
} from '../controllers/category.controller';

const router = express.Router();

// params, res body, req body, query

router.get<{}, GetCategoriesResponse, {}, GetCategoriesControllerQueryParams>(
  '/',
  getCategoriesController as RequestHandler<{}, GetCategoriesResponse, {}, GetCategoriesControllerQueryParams>,
);

router.get<ParamsWithId, GetCategoryResponse, {}, {}>('/:id', getCategoryController as RequestHandler);

router.post<{}, GetCategoryResponse, Category, {}>(
  '/',
  postCategoryController as RequestHandler<{}, GetCategoryResponse, Category, {}>,
);

router.put<ParamsWithId, GetCategoryResponse, Category, {}>(
  '/:id',
  putCategoryController as RequestHandler<ParamsWithId, GetCategoryResponse, Category, {}>,
);

router.patch<ParamsWithId, GetCategoryResponse, Category, {}>(
  '/:id',
  patchCategoryController as RequestHandler<ParamsWithId, GetCategoryResponse, Category, {}>,
);

router.delete<ParamsWithId, GetCategoryResponse, {}, {}>(
  '/:id',
  deleteCategoryController as RequestHandler<ParamsWithId, GetCategoryResponse, {}, {}>,
);

export default router;
